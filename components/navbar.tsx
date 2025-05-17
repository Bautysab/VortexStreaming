"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Play, ShoppingCart, User, LogOut } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getItemCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Play className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold">VortexShop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Inicio
            </Link>
            <Link href="/servicios" className="text-gray-700 hover:text-purple-600 font-medium">
              Servicios
            </Link>
            <Link href="/precios" className="text-gray-700 hover:text-purple-600 font-medium">
              Precios
            </Link>
            <Link href="/soporte" className="text-gray-700 hover:text-purple-600 font-medium">
              Soporte
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && getItemCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                    {getItemCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt={user?.name || ""} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Mi cuenta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/purchases">Mis compras</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link href="/cart" className="mr-2">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && getItemCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                    {getItemCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="mr-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt={user?.name || ""} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            )}

            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className="text-gray-700 hover:text-purple-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/precios"
              className="text-gray-700 hover:text-purple-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Precios
            </Link>
            <Link
              href="/soporte"
              className="text-gray-700 hover:text-purple-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Soporte
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-purple-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mi cuenta
                </Link>
                <Link
                  href="/dashboard/purchases"
                  className="text-gray-700 hover:text-purple-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mis compras
                </Link>
                <Button
                  variant="outline"
                  className="flex items-center justify-center w-full text-red-500 border-red-200"
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="flex items-center w-full">
                    <User className="h-4 w-4 mr-2" />
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Registrarse</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
