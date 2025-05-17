"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, TicketIcon, MessageSquare, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SupportPage() {
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketCategory, setTicketCategory] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [ticketSubmitted, setTicketSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmitTicket = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de envío de ticket
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setTicketSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Centro de Soporte</h1>

            <Tabs defaultValue="ticket" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="ticket" className="flex items-center">
                  <TicketIcon className="h-4 w-4 mr-2" />
                  Crear Ticket
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Preguntas Frecuentes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ticket">
                {ticketSubmitted ? (
                  <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h2 className="text-2xl font-bold mb-2">¡Ticket Enviado!</h2>
                      <p className="text-gray-600 mb-6">
                        Hemos recibido tu ticket. Te responderemos lo antes posible a través de tu correo electrónico.
                      </p>
                      <div className="bg-gray-100 p-4 rounded-md w-full mb-6">
                        <p className="font-medium">
                          Número de ticket:{" "}
                          <span className="text-purple-600">
                            TKT-
                            {Math.floor(Math.random() * 10000)
                              .toString()
                              .padStart(4, "0")}
                          </span>
                        </p>
                      </div>
                      <Button onClick={() => setTicketSubmitted(false)} className="bg-purple-600 hover:bg-purple-700">
                        Crear otro ticket
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Crear un nuevo ticket de soporte</CardTitle>
                      <CardDescription>
                        Completa el formulario a continuación para recibir ayuda de nuestro equipo de soporte.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitTicket} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Asunto</Label>
                          <Input
                            id="subject"
                            placeholder="Escribe el asunto de tu consulta"
                            value={ticketSubject}
                            onChange={(e) => setTicketSubject(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Categoría</Label>
                          <Select value={ticketCategory} onValueChange={setTicketCategory} required>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="account">Problemas con la cuenta</SelectItem>
                              <SelectItem value="payment">Pagos y facturación</SelectItem>
                              <SelectItem value="technical">Problemas técnicos</SelectItem>
                              <SelectItem value="access">Problemas de acceso</SelectItem>
                              <SelectItem value="other">Otros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Mensaje</Label>
                          <Textarea
                            id="message"
                            placeholder="Describe tu problema en detalle"
                            rows={6}
                            value={ticketMessage}
                            onChange={(e) => setTicketMessage(e.target.value)}
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                          {loading ? "Enviando..." : "Enviar ticket"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>Preguntas Frecuentes</CardTitle>
                    <CardDescription>
                      Encuentra respuestas a las preguntas más comunes sobre nuestros servicios.
                    </CardDescription>
                    <div className="relative mt-4">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Buscar en las preguntas frecuentes" className="pl-10" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <FaqItem
                        question="¿Cómo funcionan las cuentas compartidas?"
                        answer="Nuestras cuentas de VortexShop son compartidas, lo que significa que varios usuarios pueden acceder al mismo tiempo. Cada usuario tiene su propio perfil para guardar su historial y preferencias. Es importante no cambiar la contraseña ni los datos de la cuenta para no afectar a otros usuarios."
                      />
                      <FaqItem
                        question="¿Qué hago si no puedo acceder a mi cuenta?"
                        answer="Si no puedes acceder a tu cuenta, primero verifica que estás usando las credenciales correctas. Si el problema persiste, crea un ticket de soporte y te ayudaremos a resolver el problema lo antes posible."
                      />
                      <FaqItem
                        question="¿Cuánto tiempo tardan en activarse las cuentas?"
                        answer="Las cuentas se activan automáticamente después de confirmar el pago. Recibirás un correo electrónico con los datos de acceso en un plazo máximo de 15 minutos. Si no recibes el correo, revisa tu carpeta de spam o contacta con soporte."
                      />
                      <FaqItem
                        question="¿Puedo cambiar de plan después de la compra?"
                        answer="Sí, puedes cambiar de plan en cualquier momento. Si deseas actualizar a un plan superior, solo pagarás la diferencia. Si deseas cambiar a un plan inferior, el cambio se aplicará en tu próxima renovación."
                      />
                      <FaqItem
                        question="¿Cómo funciona la renovación de las cuentas?"
                        answer="Las cuentas se renuevan automáticamente al finalizar el período contratado. Recibirás un correo electrónico de recordatorio 3 días antes de la renovación. Si no deseas renovar, puedes cancelar la suscripción desde tu panel de usuario."
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">
                      ¿No encuentras lo que buscas?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-purple-600"
                        onClick={() => document.querySelector('[data-value="ticket"]').click()}
                      >
                        Crea un ticket de soporte
                      </Button>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className="text-purple-600 text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}
