"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ShoppingCart, ArrowLeft, CreditCard, Lock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, clearCart, getTotal } = useCart()
  const { isAuthenticated, addPurchase } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  // Estados para el formulario de pago
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  // Redirigir a login si no está autenticado y quiere proceder al pago
  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      router.push("/login?redirectTo=/cart")
      return
    }

    setShowPaymentForm(true)
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Validación básica
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast({
        title: "Error en el formulario",
        description: "Por favor, completa todos los campos de la tarjeta.",
        variant: "destructive",
        duration: 3000,
      })
      setIsProcessing(false)
      return
    }

    // Simulación de procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Guardar la compra en el historial del usuario
    addPurchase({
      items: items.map((item) => ({
        service: item.service,
        plan: item.plan,
        price: item.price,
      })),
      total: getTotal() * 1.21, // Incluir IVA
      status: "completed",
    })

    toast({
      title: "¡Compra realizada con éxito!",
      description: "Recibirás un correo de VortexShop con los detalles de tu compra.",
      duration: 5000,
    })

    clearCart()
    setIsProcessing(false)
    setShowPaymentForm(false)

    // Redirigir al historial de compras
    router.push("/dashboard/purchases")
  }

  const formatCardNumber = (value) => {
    // Eliminar espacios y caracteres no numéricos
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    // Formatear con espacios cada 4 dígitos
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiryDate = (value) => {
    // Eliminar caracteres no numéricos
    const v = value.replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

            {items.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
                  <p className="text-gray-500 mb-6 text-center">
                    Parece que aún no has añadido ningún servicio a tu carrito.
                  </p>
                  <Link href="/#servicios">
                    <Button className="bg-purple-600 hover:bg-purple-700">Ver servicios disponibles</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : showPaymentForm ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lock className="h-5 w-5 mr-2 text-green-600" />
                        Información de pago
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCheckout} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                          <Input
                            id="cardName"
                            placeholder="Nombre completo"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número de tarjeta</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Fecha de expiración</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>

                        <div className="pt-4 flex justify-between">
                          <Button type="button" variant="outline" onClick={() => setShowPaymentForm(false)}>
                            Volver al carrito
                          </Button>
                          <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isProcessing}>
                            {isProcessing ? "Procesando..." : "Completar compra"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${getTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IVA (21%)</span>
                        <span>${(getTotal() * 0.21).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(getTotal() * 1.21).toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full text-center text-sm text-gray-500">
                        <p className="flex items-center justify-center mb-2">
                          <Lock className="h-4 w-4 mr-1 text-green-600" />
                          Pago seguro garantizado
                        </p>
                        <div className="flex justify-center space-x-2">
                          <img src="/placeholder.svg?height=30&width=40" alt="Visa" className="h-6" />
                          <img src="/placeholder.svg?height=30&width=40" alt="Mastercard" className="h-6" />
                          <img src="/placeholder.svg?height=30&width=40" alt="American Express" className="h-6" />
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Productos ({items.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="divide-y">
                      {items.map((item) => (
                        <div key={item.id} className="py-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 ${item.color} rounded-md flex items-center justify-center text-white mr-4`}
                            >
                              {item.service.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-medium">{item.service}</h3>
                              <p className="text-sm text-gray-500">Plan {item.plan}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-4">${item.price.toFixed(2)}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href="/#servicios" className="flex items-center">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Seguir comprando
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => clearCart()}
                      >
                        Vaciar carrito
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${getTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IVA (21%)</span>
                        <span>${(getTotal() * 0.21).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(getTotal() * 1.21).toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
                        onClick={handleProceedToPayment}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceder al pago
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
