"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

export type Purchase = {
  id: string
  userId: string
  items: {
    service: string
    plan: string
    price: number
  }[]
  total: number
  date: string
  status: "completed" | "pending" | "cancelled"
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  purchases: Purchase[]
  addPurchase: (purchase: Omit<Purchase, "id" | "userId" | "date">) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [purchases, setPurchases] = useState<Purchase[]>([])

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedPurchases = localStorage.getItem("purchases")

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Error parsing user from localStorage", e)
      }
    }

    if (savedPurchases) {
      try {
        setPurchases(JSON.parse(savedPurchases))
      } catch (e) {
        console.error("Error parsing purchases from localStorage", e)
      }
    }

    setIsLoading(false)
  }, [])

  // Guardar usuario en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  // Guardar compras en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("purchases", JSON.stringify(purchases))
  }, [purchases])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulación de login - en una app real, esto sería una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Credenciales de prueba
      if (email === "demo@example.com" && password === "password") {
        const userData: User = {
          id: "user_1",
          name: "Usuario Demo",
          email: "demo@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        }

        setUser(userData)
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulación de login con Google
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        id: "user_google",
        name: "Usuario Google",
        email: "google@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(userData)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Google login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulación de registro
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(userData)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Register error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  const addPurchase = (purchase: Omit<Purchase, "id" | "userId" | "date">) => {
    if (!user) return

    const newPurchase: Purchase = {
      ...purchase,
      id: `purchase_${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
    }

    setPurchases((prev) => [...prev, newPurchase])
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        purchases,
        addPurchase,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
