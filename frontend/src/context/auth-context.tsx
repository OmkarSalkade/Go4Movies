"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { User } from "@/lib/types"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface LocationInfo {
  city: string
  zipcode: string
}

interface AuthContextValue {
  /** The currently logged-in user, or null */
  user: User | null
  /** The user's selected location, or null */
  location: LocationInfo | null
  /** Whether we've finished reading localStorage (prevents flash) */
  isReady: boolean
  /** Persist user after a successful login / register API call */
  login: (user: User) => void
  /** Clear user state and redirect */
  logout: () => void
  /** Persist the selected city + zip */
  setLocation: (loc: LocationInfo) => void
  /** Clear location */
  clearLocation: () => void
}

const STORAGE_KEY_USER = "go4movies_user"
const STORAGE_KEY_LOCATION = "go4movies_location"

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [location, setLocationState] = useState<LocationInfo | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER)
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }

      const storedLoc = localStorage.getItem(STORAGE_KEY_LOCATION)
      if (storedLoc) {
        setLocationState(JSON.parse(storedLoc))
      }

      // Also migrate the legacy "selectedZipCode" key if present
      const legacyZip = localStorage.getItem("selectedZipCode")
      if (legacyZip && !storedLoc) {
        const migrated: LocationInfo = { city: "", zipcode: legacyZip }
        setLocationState(migrated)
        localStorage.setItem(STORAGE_KEY_LOCATION, JSON.stringify(migrated))
      }
    } catch {
      // localStorage may be unavailable (SSR, private mode, etc.)
    } finally {
      setIsReady(true)
    }
  }, [])

  /* ---------- actions ---------- */

  const login = useCallback((u: User) => {
    setUser(u)
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u))
    } catch {
      // silently ignore
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY_USER)
    } catch {
      // silently ignore
    }
  }, [])

  const setLocation = useCallback((loc: LocationInfo) => {
    setLocationState(loc)
    try {
      localStorage.setItem(STORAGE_KEY_LOCATION, JSON.stringify(loc))
      // Keep the legacy key in sync so existing useZipCode hook still works
      localStorage.setItem("selectedZipCode", loc.zipcode)
    } catch {
      // silently ignore
    }
  }, [])

  const clearLocation = useCallback(() => {
    setLocationState(null)
    try {
      localStorage.removeItem(STORAGE_KEY_LOCATION)
      localStorage.removeItem("selectedZipCode")
    } catch {
      // silently ignore
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, location, isReady, login, logout, setLocation, clearLocation }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>")
  }
  return ctx
}
