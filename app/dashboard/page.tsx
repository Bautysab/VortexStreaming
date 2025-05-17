"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Settings,
  LogOut,
  CreditCard,
  TicketIcon,
  Play,
  Clock,
  AlertCircle,
  CheckCircle,
  ShoppingCart,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Evita renderizado en el servidor
  }

  // Simulación de datos del usuario
  const user = {
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Enero 2023",
  }

  // Simulación de cuentas activas
  const activeAccounts = [
    {
      id: 1,
      service: "Netflix",
      plan: "Premium",
      expiresAt: "2023-12-15",
      status: "active",
      color: "bg-red-600",
    },
    {
      id: 2,
      service: "Disney+",
      plan: "Standard",
      expiresAt: "2023-11-30",
      status: "active",
      color: "bg-blue-600",
    },
  ]

  // Simulación de tickets recientes
  const recentTickets = [
    {
      id: "TKT-1234",
      subject: "Problema de acceso a Netflix",
      status: "open",
      createdAt: "2023-10-25",
      lastUpdate: "2023-10-26",
    },
    {
      id: "TKT-1122",
      subject: "Facturación incorrecta",
      status: "closed",
      createdAt: "2023-10-15",
      lastUpdate: "2023-10-18",
    },
  ]

  // Simulación de historial de compras
  const purchaseHistory = [
    {
      id: "ORD-5678",
      service: "Netflix",
      plan: "Premium",
      amount: 9.99,
      date: "2023-10-15",
      status: "completed",
    },
    {
      id: "ORD-5566",
      service: "Disney+",
      plan: "Standard",
      amount: 7.99,
      date: "2023-09-30",
      status: "completed",
    },
    {
      id: "ORD-5432",
      service: "Crunchyroll",
      plan: "Premium",
      amount: 5.99,
      date: "2023-08-15",
      status: "refunded",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-500 mb-2">{user.email}</p>
                    <p className="text-sm text-gray-500">Miembro desde {user.memberSince}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <nav className="space-y-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center p-2 rounded-md bg-purple-100 text-purple-700 font-medium"
                    >
                      <User className="h-5 w-5 mr-3" />
                      Mi cuenta
                    </Link>
                    <Link
                      href="/dashboard/subscriptions"
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <Play className="h-5 w-5 mr-3" />
                      Mis suscripciones
                    </Link>
                    <Link
                      href="/dashboard/tickets"
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <TicketIcon className="h-5 w-5 mr-3" />
                      Mis tickets
                    </Link>
                    <Link
                      href="/dashboard/billing"
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <CreditCard className="h-5 w-5 mr-3" />
                      Facturación
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      Configuración
                    </Link>
                    <Link href="/logout" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                      <LogOut className="h-5 w-5 mr-3" />
                      Cerrar sesión
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>

              <Tabs defaultValue="accounts" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="accounts">Mis Cuentas</TabsTrigger>
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                  <TabsTrigger value="purchases">Historial de Compras</TabsTrigger>
                </TabsList>

                <TabsContent value="accounts">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {activeAccounts.map((account) => (
                      <Card key={account.id}>
                        <CardHeader className={`${account.color} text-white rounded-t-lg`}>
                          <CardTitle className="flex items-center">
                            <Play className="h-5 w-5 mr-2" />
                            {account.service}
                          </CardTitle>
                          <CardDescription className="text-white/80">Plan {account.plan}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Estado:</span>
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                Activa
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Expira:</span>
                              <span className="font-medium">{new Date(account.expiresAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Renovación automática:</span>
                              <span className="font-medium">Activada</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Ver detalles</Button>
                          <Button className="bg-purple-600 hover:bg-purple-700">Renovar</Button>
                        </CardFooter>
                      </Card>
                    ))}

                    <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
                      <CardContent className="flex flex-col items-center justify-center h-full py-12">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Añadir nueva cuenta</h3>
                        <p className="text-gray-500 text-center mb-4">
                          Explora nuestro catálogo de servicios de streaming
                        </p>
                        <Button className="bg-purple-600 hover:bg-purple-700">Ver catálogo</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tickets">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Tickets recientes</CardTitle>
                        <Button className="bg-purple-600 hover:bg-purple-700">Nuevo ticket</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {recentTickets.length > 0 ? (
                        <div className="space-y-4">
                          {recentTickets.map((ticket) => (
                            <div key={ticket.id} className="flex items-start p-4 border rounded-lg">
                              <div
                                className={`p-2 rounded-full mr-4 ${
                                  ticket.status === "open"
                                    ? "bg-orange-100 text-orange-600"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                {ticket.status === "open" ? (
                                  <AlertCircle className="h-5 w-5" />
                                ) : (
                                  <CheckCircle className="h-5 w-5" />
                                )}
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{ticket.subject}</h3>
                                  <Badge
                                    variant="outline"
                                    className={
                                      ticket.status === "open"
                                        ? "bg-orange-50 text-orange-600 border-orange-200"
                                        : "bg-green-50 text-green-600 border-green-200"
                                    }
                                  >
                                    {ticket.status === "open" ? "Abierto" : "Cerrado"}
                                  </Badge>
                                </div>
                                <div className="flex justify-between mt-2 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <span className="mr-2">ID: {ticket.id}</span>
                                    <span>Creado: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>
                                      Última actualización: {new Date(ticket.lastUpdate).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <TicketIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-700 mb-2">No tienes tickets</h3>
                          <p className="text-gray-500 mb-4">¿Necesitas ayuda con alguno de nuestros servicios?</p>
                          <Button className="bg-purple-600 hover:bg-purple-700">Crear ticket</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="purchases">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historial de compras</CardTitle>
                      <CardDescription>Historial de todas tus compras y renovaciones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">ID</th>
                              <th className="text-left py-3 px-4 font-medium">Servicio</th>
                              <th className="text-left py-3 px-4 font-medium">Plan</th>
                              <th className="text-left py-3 px-4 font-medium">Importe</th>
                              <th className="text-left py-3 px-4 font-medium">Fecha</th>
                              <th className="text-left py-3 px-4 font-medium">Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchaseHistory.map((purchase) => (
                              <tr key={purchase.id} className="border-b">
                                <td className="py-3 px-4">{purchase.id}</td>
                                <td className="py-3 px-4">{purchase.service}</td>
                                <td className="py-3 px-4">{purchase.plan}</td>
                                <td className="py-3 px-4">${purchase.amount.toFixed(2)}</td>
                                <td className="py-3 px-4">{new Date(purchase.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">
                                  <Badge
                                    variant="outline"
                                    className={
                                      purchase.status === "completed"
                                        ? "bg-green-50 text-green-600 border-green-200"
                                        : "bg-red-50 text-red-600 border-red-200"
                                    }
                                  >
                                    {purchase.status === "completed" ? "Completado" : "Reembolsado"}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">Ver todas las transacciones</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
