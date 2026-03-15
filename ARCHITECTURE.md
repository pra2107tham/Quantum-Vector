# Microservices E-Commerce Architecture

A cloud-native e-commerce platform with 13 microservices written in multiple languages, deployed on Kubernetes via GitOps (ArgoCD + Kustomize).

## Services at a Glance

| Service | Language | Container Port | K8s Service Port | Protocol | Role |
|---|---|---|---|---|---|
| frontend | Go | 8080 | 80 (ClusterIP) / 80 (LoadBalancer) | HTTP | Web UI & API Gateway |
| authservice | Python | 8081 | 8081 | HTTP REST | Login, Register, JWT |
| productcatalogservice | Go | 3550 | 3550 | gRPC | Product listings |
| cartservice | C# | 7070 | 7070 | gRPC | Shopping cart (Redis) |
| redis-cart | Redis | 6379 | 6379 | Redis | Cart storage |
| checkoutservice | Go | 5050 | 5050 | gRPC | Order orchestration |
| paymentservice | Node.js | 50051 | 50051 | gRPC | Card payments |
| currencyservice | Node.js | 7000 | 7000 | gRPC | Currency conversion |
| shippingservice | Go | 50051 | 50051 | gRPC | Shipping quotes & tracking |
| emailservice | Python | 8080 | 5000 | gRPC | Order confirmation emails |
| recommendationservice | Python | 8080 | 8080 | gRPC | Product recommendations |
| adservice | Java | 9555 | 9555 | gRPC | Contextual ads |
| shoppingassistantservice | Python | 8080 | 80 | HTTP REST | AI-powered assistant |
| loadgenerator | Python | — | — | HTTP | Load testing (Locust) |
| postgres | PostgreSQL | 5432 | 5432 | SQL | User account storage |

## Service Descriptions

### Frontend
The single entry point for users. Built in Go using Gorilla Mux. Renders HTML templates and holds gRPC clients to all backend services. Manages user sessions via cookies and delegates auth to AuthService over HTTP.

### Auth Service
Flask-based service that handles user registration, login, and JWT token verification. Stores users in PostgreSQL with bcrypt-hashed passwords. Tokens expire after 48 hours.

### Product Catalog Service
Loads and serves ~9 products from a `products.json` file. Supports dynamic catalog reload via SIGUSR1 and artificial latency injection for testing. Exposes `ListProducts` and `GetProduct` via gRPC.

### Cart Service
Manages per-user shopping carts backed by Redis (`redis-cart`). Exposes `AddItem`, `GetCart`, and `EmptyCart` over gRPC.

### Checkout Service
The core orchestrator of the purchase flow. On `PlaceOrder`, it calls 6 downstream services in sequence — fetches the cart, converts prices, charges payment, ships the order, sends a confirmation email, then clears the cart.

### Payment Service
Validates credit card details using `simple-card-validator` and returns a transaction ID. Currently a stub — no real payment gateway is wired in.

### Currency Service
Converts money between currencies using ECB (European Central Bank) exchange rates stored in a JSON file. Exposes `GetSupportedCurrencies` and `Convert` over gRPC.

### Shipping Service
Calculates shipping cost in USD based on cart items and generates a hash-based tracking ID for shipments. Exposes `GetQuote` and `ShipOrder` over gRPC.

### Email Service
Sends order confirmation emails using a Jinja2 HTML template. Currently runs in dummy mode — no actual emails are sent.
> Port note: container listens on 8080, Kubernetes Service exposes port 5000. CheckoutService connects to `emailservice:5000`.

### Recommendation Service
Returns up to 5 randomly selected products that the user hasn't already viewed. Calls ProductCatalogService internally to fetch the full product list.

### Ad Service
Java-based service that returns contextual advertisements based on product categories shown on the current page.

### Shopping Assistant Service
AI-powered assistant backed by Google Gemini + LangChain. Accepts room images and natural language prompts, performs vector similarity search on AlloyDB, and returns matching product IDs.
> Disabled by default (`replicas: 0`) — requires GCP credentials to enable.

### Load Generator
Locust-based traffic simulator that mimics real user behavior — browsing, adding to cart, checking out. Uses an init container to wait for the frontend before sending traffic.

### Postgres
PostgreSQL 16 deployed inside the cluster to store user accounts for AuthService. Uses `authdb` as the database name.

## How Services Connect

Services discover each other via Kubernetes DNS — each service gets a stable cluster-internal hostname (e.g., `cartservice`, `checkoutservice`). These are injected as environment variables into each pod.

```
[ External User ]
        |
  LoadBalancer :80
        |
  ┌─────▼──────┐
  │  Frontend  │ :8080
  └─────┬───── ┘
        │
        ├─ gRPC ──> productcatalogservice:3550
        ├─ gRPC ──> currencyservice:7000
        ├─ gRPC ──> cartservice:7070 ──> redis-cart:6379
        ├─ gRPC ──> recommendationservice:8080 ──> productcatalogservice:3550
        ├─ gRPC ──> shippingservice:50051
        ├─ gRPC ──> adservice:9555
        ├─ HTTP ──> authservice:8081 ──> postgres:5432
        ├─ HTTP ──> shoppingassistantservice:80 ──> Gemini API + AlloyDB (GCP)
        │
        └─ gRPC ──> checkoutservice:5050
                        ├─ gRPC ──> cartservice:7070
                        ├─ gRPC ──> productcatalogservice:3550
                        ├─ gRPC ──> currencyservice:7000
                        ├─ gRPC ──> shippingservice:50051
                        ├─ gRPC ──> paymentservice:50051
                        └─ gRPC ──> emailservice:5000 (container: 8080)

loadgenerator ──> frontend:80  (init container waits, then load tests)
```

## Environment Variable Wiring

### Frontend
```
PRODUCT_CATALOG_SERVICE_ADDR    = productcatalogservice:3550
CURRENCY_SERVICE_ADDR           = currencyservice:7000
CART_SERVICE_ADDR               = cartservice:7070
RECOMMENDATION_SERVICE_ADDR     = recommendationservice:8080
SHIPPING_SERVICE_ADDR           = shippingservice:50051
CHECKOUT_SERVICE_ADDR           = checkoutservice:5050
AD_SERVICE_ADDR                 = adservice:9555
SHOPPING_ASSISTANT_SERVICE_ADDR = shoppingassistantservice:80
AUTH_SERVICE_ADDR               = authservice:8081
```

### CheckoutService
```
PRODUCT_CATALOG_SERVICE_ADDR = productcatalogservice:3550
SHIPPING_SERVICE_ADDR        = shippingservice:50051
PAYMENT_SERVICE_ADDR         = paymentservice:50051
EMAIL_SERVICE_ADDR           = emailservice:5000
CURRENCY_SERVICE_ADDR        = currencyservice:7000
CART_SERVICE_ADDR            = cartservice:7070
```

### RecommendationService
```
PRODUCT_CATALOG_SERVICE_ADDR = productcatalogservice:3550
```

### CartService
```
REDIS_ADDR = redis-cart:6379
```

## Checkout Flow (Step by Step)

```
1.  User clicks "Place Order" on Frontend
2.  Frontend calls CheckoutService.PlaceOrder()
3.  CheckoutService fetches cart items       -> cartservice:7070
4.  CheckoutService fetches product info     -> productcatalogservice:3550
5.  CheckoutService converts prices          -> currencyservice:7000
6.  CheckoutService gets shipping quote      -> shippingservice:50051
7.  CheckoutService charges the card         -> paymentservice:50051
8.  CheckoutService ships the order          -> shippingservice:50051
9.  CheckoutService sends confirmation email -> emailservice:5000
10. CheckoutService clears the cart          -> cartservice:7070
11. Frontend displays order confirmation to user
```

## Data Stores

| Store | Used By | Deployed | Notes |
|---|---|---|---|
| PostgreSQL (postgres:16-alpine) | authservice | In-cluster | authdb database, ephemeral (emptyDir) |
| Redis (redis:alpine) | cartservice | In-cluster (redis-cart) | Ephemeral (emptyDir) |
| AlloyDB (GCP) | shoppingassistantservice | External (GCP) | Vector embeddings for product search |
| JSON file | productcatalogservice | Baked into image | ~9 products |
| JSON file | currencyservice | Baked into image | ECB exchange rates |

> **Warning:** Both Postgres and Redis use `emptyDir` volumes — all data is lost when pods restart. Not suitable for production as-is.

## GitOps Deployment

### Tooling
- **ArgoCD** — watches the Git repo and syncs changes to the cluster automatically
- **Kustomize** — manages environment-specific overlays on top of base manifests

### GitOps Flow
```
Developer pushes YAML changes to GitHub (main branch)
        |
        v
ArgoCD detects change (polls Git)
        |
        v
ArgoCD applies changes to Kubernetes cluster
        |
        v
Cluster state matches Git state (self-healed if drifted)
```

### Environments

| Overlay | Target | Replicas | Notes |
|---|---|---|---|
| `overlays/microk8s/` | Local single-node MicroK8s | 1 per service | Active, image tag `:1` (frontend `:2`) |
| `overlays/eks/` | AWS EKS production | 2 for key services | Patches commented out, ready to activate |

### ArgoCD Settings
- Repo: `https://github.com/ITkannadigaru/GitOps.git`
- Branch: `main`
- Namespace: `default`
- Auto-sync: enabled
- Prune: `true` — deletes resources removed from Git
- Self-heal: `true` — reverts manual cluster edits

## Tech Stack

| Category | Technology |
|---|---|
| Languages | Go, Python, Node.js, C# (.NET), Java |
| Communication | gRPC (protobuf), HTTP REST |
| Databases | PostgreSQL, Redis, AlloyDB (GCP) |
| AI / ML | Google Gemini, LangChain, Vector Search |
| Tracing | OpenTelemetry (OTLP exporter) |
| Profiling | Google Cloud Profiler |
| Containers | Docker (multi-stage builds) |
| Image Registry | Docker Hub (`manojkrishnappa/`) |
| Orchestration | Kubernetes |
| GitOps | ArgoCD |
| Config Management | Kustomize |
| Cloud | GCP (AlloyDB, Gemini) |

## Security Configuration

All pods run with hardened security contexts:

```yaml
Pod:
  runAsNonRoot: true
  runAsUser:    1000
  runAsGroup:   1000
  fsGroup:      1000

Container:
  allowPrivilegeEscalation: false
  privileged:               false
  readOnlyRootFilesystem:   true   # false for shoppingassistantservice
  capabilities.drop:        [ALL]
```

## Manual Setup Required

Before deploying, create these secrets in the cluster:

```bash
# Required for postgres deployment and authservice
kubectl create secret generic postgres-secret \
  --from-literal=password=<your-password> -n default

# Required for authservice JWT signing
kubectl create secret generic authservice-secret \
  --from-literal=jwt-secret=<your-jwt-secret> -n default
```

## Key Design Decisions

1. **gRPC-first** — all internal service communication uses protobuf over gRPC for strong typing and performance.
2. **Kubernetes DNS discovery** — services find each other by name via env vars, no hardcoded IPs.
3. **GitOps with ArgoCD** — the cluster state is always derived from Git; manual changes are auto-reverted.
4. **Orchestration over choreography** — CheckoutService drives the full order flow sequentially.
5. **Polyglot** — each service uses the best-fit language (Go for throughput, Python for ML/AI, C# for .NET, Java for enterprise patterns).
6. **Kustomize overlays** — base manifests are shared; environment differences (replicas, annotations, resource limits) live in overlays.
7. **Observability built-in** — OpenTelemetry tracing across all services, controlled via `ENABLE_TRACING`.
