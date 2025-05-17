"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Download, Calendar, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PurchasesPage() {
  const { isAuthenticated, purchases } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Redirigir si no está autenticado
    if (!isAuthenticated && mounted) {
      router.push("/login?redirectTo=/dashboard/purchases")
    }
  }, [isAuthenticated, router, mounted])

  if (!mounted || !isAuthenticated) {
    return null
  }

  // Ordenar compras por fecha (más recientes primero)
  const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Historial de Compras</h1>
                <p className="text-gray-500 mt-1">Gestiona y revisa todas tus compras</p>
              </div>
              <Link href="/#servicios">
                <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Comprar más servicios
                </Button>
              </Link>
            </div>

            {sortedPurchases.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">No tienes compras aún</h2>
                  <p className="text-gray-500 mb-6 text-center">
                    Cuando realices una compra, aparecerá en esta sección.
                  </p>
                  <Link href="/#servicios">
                    <Button className="bg-purple-600 hover:bg-purple-700">Ver servicios disponibles</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {sortedPurchases.map((purchase) => (
                  <Card key={purchase.id}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            Pedido #{purchase.id.split("_")[1].substring(0, 8)}
                            <Badge
                              variant="outline"
                              className={`ml-3 ${
                                purchase.status === "completed"
                                  ? "bg-green-50 text-green-600 border-green-200"
                                  : "bg-yellow-50 text-yellow-600 border-yellow-200"
                              }`}
                            >
                              {purchase.status === "completed" ? "Completado" : "Pendiente"}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-1 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(purchase.date).toLocaleDateString()}
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            {new Date(purchase.date).toLocaleTimeString()}
                          </CardDescription>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Factura
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded-md overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Servicio</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Plan</th>
                                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Precio</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {purchase.items.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-3">{item.service}</td>
                                  <td className="px-4 py-3">{item.plan}</td>
                                  <td className="px-4 py-3 text-right">${item.price.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                              <tr>
                                <td colSpan={2} className="px-4 py-3 text-right font-medium">
                                  Total:
                                </td>
                                <td className="px-4 py-3 text-right font-bold">${purchase.total.toFixed(2)}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md">
                          <h3 className="font-medium text-blue-700 mb-2">Información de acceso</h3>
                          <p className="text-blue-600 text-sm">
                            Los datos de acceso a tus servicios han sido enviados a tu correo electrónico.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
