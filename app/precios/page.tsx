import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function PreciosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Nuestros Precios</h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Ofrecemos planes competitivos para todas las plataformas de streaming. Elige el que mejor se adapte a tus
            necesidades.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Netflix"
              color="bg-red-600"
              plans={[
                { name: "Básico", price: 7.99, features: ["Calidad HD", "1 dispositivo", "Sin anuncios"] },
                {
                  name: "Estándar",
                  price: 9.99,
                  features: ["Calidad Full HD", "2 dispositivos", "Sin anuncios", "Descargas"],
                },
                {
                  name: "Premium",
                  price: 11.99,
                  features: ["Calidad 4K Ultra HD", "4 dispositivos", "Sin anuncios", "Descargas", "Audio espacial"],
                },
              ]}
            />

            <PricingCard
              title="Disney+"
              color="bg-blue-600"
              plans={[
                {
                  name: "Mensual",
                  price: 7.99,
                  features: ["Calidad 4K", "4 dispositivos", "Sin anuncios", "Descargas"],
                },
                {
                  name: "Anual",
                  price: 79.9,
                  features: ["Calidad 4K", "4 dispositivos", "Sin anuncios", "Descargas", "Ahorro del 16%"],
                },
              ]}
            />

            <PricingCard
              title="Crunchyroll"
              color="bg-orange-500"
              plans={[
                { name: "Fan", price: 4.99, features: ["Calidad HD", "1 dispositivo", "Sin anuncios"] },
                {
                  name: "Mega Fan",
                  price: 5.99,
                  features: ["Calidad HD", "4 dispositivos", "Sin anuncios", "Descargas", "Acceso anticipado"],
                },
                {
                  name: "Ultimate Fan",
                  price: 7.99,
                  features: [
                    "Calidad HD",
                    "6 dispositivos",
                    "Sin anuncios",
                    "Descargas",
                    "Acceso anticipado",
                    "Merchandising exclusivo",
                  ],
                },
              ]}
            />
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">¿Buscas un paquete combinado?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ofrecemos paquetes especiales con múltiples servicios a precios reducidos. Contacta con nosotros para
              obtener más información.
            </p>
            <Link href="/soporte">
              <Button className="bg-purple-600 hover:bg-purple-700">Contactar</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function PricingCard({ title, color, plans }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className={`${color} text-white`}>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-white/80">Planes disponibles</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <div className="space-y-6">
          {plans.map((plan, index) => (
            <div key={index} className={index > 0 ? "pt-6 border-t" : ""}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <div>
                  <span className="text-2xl font-bold">${plan.price.toFixed(2)}</span>
                  {plan.name === "Anual" ? (
                    <span className="text-gray-500">/año</span>
                  ) : (
                    <span className="text-gray-500">/mes</span>
                  )}
                </div>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link href="/#servicios">
                  <Button className="w-full">Seleccionar</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
