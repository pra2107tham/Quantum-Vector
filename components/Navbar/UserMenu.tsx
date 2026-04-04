"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export default function UserMenu() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!isMounted) return;
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from("user_profiles")
          .select("id, email, full_name, avatar_url")
          .eq("id", user.id)
          .single();
        if (!isMounted) return;
        setProfile(data as UserProfile);
      } else {
        setUserId(null);
        setProfile(null);
      }
      setLoading(false);
    }
    load();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load();
    });
    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return null;
  }

  if (!userId) {
    return null;
  }

  const avatarSrc = profile?.avatar_url || "/dc_logo.svg";
  const displayName = profile?.full_name || profile?.email || "User";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-blue-50 transition-colors"
      >
        <Image
          src={avatarSrc}
          alt={displayName}
          width={28}
          height={28}
          className="rounded-full object-cover"
        />
        <span className="hidden md:inline text-sm font-medium text-blue-900">
          {displayName.split(" ")[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden z-[100]">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/academy/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <form action="/auth/logout" method="post">
              <button
                type="submit"
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
