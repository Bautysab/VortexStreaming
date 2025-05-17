"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/context/auth-context"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, loginWithGoogle, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir
    if (isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, router, redirectTo])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        router.push(redirectTo)
      } else {
        setError("Credenciales incorrectas. Inténtalo de nuevo.")
      }
    } catch (err) {
      setError("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      const success = await loginWithGoogle()

      if (success) {
        router.push(redirectTo)
      } else {
        setError("Error al iniciar sesión con Google. Inténtalo de nuevo.")
      }
    } catch (err) {
      setError("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Bienvenido de nuevo</CardTitle>
              <CardDescription className="text-center">
                Inicia sesión en tu cuenta para continuar
                {searchParams.get("redirectTo") === "/cart" && (
                  <p className="mt-2 text-sm font-medium text-purple-600">
                    Necesitas iniciar sesión para completar tu compra
                  </p>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 p-3 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="google">Google</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Contraseña</Label>
                        <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                      {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>

                    <div className="text-sm text-center text-gray-500">
                      <p>Para probar, usa: demo@example.com / password</p>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="google">
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-gray-500 text-center">
                      Inicia sesión rápidamente con tu cuenta de Google
                    </p>
                    <Button
                      onClick={handleGoogleLogin}
                      className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                      disabled={loading}
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      {loading ? "Iniciando sesión..." : "Continuar con Google"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link
                  href={`/register${searchParams.get("redirectTo") ? `?redirectTo=${searchParams.get("redirectTo")}` : ""}`}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Regístrate
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
