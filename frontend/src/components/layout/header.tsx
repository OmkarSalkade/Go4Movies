"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export function Header() {
  const { user, isReady, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Get initials from full_name
  const initials = user?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? ""

  return (
    <header className="flex items-center justify-between border-b border-neutral-800 px-6 md:px-10 py-4 bg-neutral-900">
      <Link href="/movies" className="flex items-center gap-3 text-white">
        <span className="material-symbols-outlined text-primary text-3xl">
          movie
        </span>
        <h1 className="text-xl font-bold tracking-tight">Go4Movies</h1>
      </Link>
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        {/* <nav className="flex items-center gap-6">
          <Link
            className="text-neutral-200 text-sm font-medium hover:text-white transition-colors"
            href="/movies"
          >
            Movies
          </Link>
          <Link
            className="text-neutral-200 text-sm font-medium hover:text-white transition-colors"
            href="#"
          >
            Cinemas
          </Link>
          <Link
            className="text-neutral-200 text-sm font-medium hover:text-white transition-colors"
            href="#"
          >
            Offers
          </Link>
        </nav> */}
        <div className="flex gap-3 items-center">
          {!isReady ? (
            /* Skeleton placeholder while hydrating to prevent layout shift */
            <div className="w-20 h-9 rounded-lg bg-neutral-800 animate-pulse" />
          ) : user ? (
            /* Logged-in state */
            <div className="flex items-center gap-3">
              {/* <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors group"
              > */}
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold shrink-0">
                  {initials}
                </div>
                <span className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors max-w-[120px] truncate">
                  {user.full_name}
                </span>
                {/* </Link> */}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-700 hover:text-white transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            /* Guest state */
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:brightness-110 transition-all flex items-center"
              >
                Sign In
              </Link>
            </>
          )}
          <button className="p-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </header>
  )
}
