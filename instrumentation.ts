export async function register() {
  if (typeof globalThis.localStorage === 'object' && typeof globalThis.localStorage.getItem !== 'function') {
    const store: Record<string, string> = {}
    globalThis.localStorage = {
      getItem(key: string) {
        return store[key] ?? null
      },
      setItem(key: string, value: string) {
        store[key] = String(value)
      },
      removeItem(key: string) {
        delete store[key]
      },
      clear() {
        Object.keys(store).forEach((k) => delete store[k])
      },
      get length() {
        return Object.keys(store).length
      },
      key(index: number) {
        return Object.keys(store)[index] ?? null
      },
    } as Storage
  }
}
