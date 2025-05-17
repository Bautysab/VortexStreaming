"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { useRef } from "react"
import Link from "next/link"

export default function Home() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const howItWorksRef = useRef<HTMLDivElement>(null)

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleAddToCart = (service, plan, price, color) => {
    const item = {
      id: `${service}-${plan}-${Math.random().toString(36).substring(2, 9)}`,
      service,
      plan,
      price,
      color,
    }

    addItem(item)

    toast({
      title: "¡Añadido al carrito!",
      description: `${service} ${plan} ha sido añadido a tu carrito.`,
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Disfruta del mejor entretenimiento a precios increíbles
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Accede a las mejores plataformas de streaming con nuestras cuentas premium
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#servicios">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Ver planes <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 bg-transparent"
                  onClick={scrollToHowItWorks}
                >
                  Cómo funciona
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestros Servicios de Streaming</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                title="Netflix"
                description="Accede a miles de películas, series y documentales en la plataforma líder de streaming."
                price={9.99}
                color="bg-red-600"
                features={["4K Ultra HD", "Múltiples perfiles", "Sin publicidad", "Contenido original"]}
                onAddToCart={() => handleAddToCart("Netflix", "Premium", 9.99, "bg-red-600")}
              />
              <ServiceCard
                title="Disney+"
                description="Disfruta del universo Disney, Marvel, Star Wars, Pixar y National Geographic."
                price={7.99}
                color="bg-blue-600"
                features={["4K Ultra HD", "Hasta 4 dispositivos", "Sin publicidad", "Contenido exclusivo"]}
                onAddToCart={() => handleAddToCart("Disney+", "Standard", 7.99, "bg-blue-600")}
              />
              <ServiceCard
                title="Crunchyroll"
                description="La mejor plataforma para los amantes del anime con miles de series y películas."
                price={5.99}
                color="bg-orange-500"
                features={["HD", "Sin anuncios", "Simulcast", "Manga digital"]}
                onAddToCart={() => handleAddToCart("Crunchyroll", "Premium", 5.99, "bg-orange-500")}
              />
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section ref={howItWorksRef} className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">¿Cómo Funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <StepCard
                number="1"
                title="Elige tu plan"
                description="Selecciona la plataforma de streaming que deseas y el plan que mejor se adapte a tus necesidades."
              />
              <StepCard
                number="2"
                title="Realiza el pago"
                description="Utiliza nuestro sistema seguro de pago para completar tu compra de forma rápida y segura."
              />
              <StepCard
                number="3"
                title="Recibe tus accesos"
                description="Recibirás los datos de acceso a tu cuenta en tu correo electrónico de forma inmediata."
              />
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <TestimonialCard
                name="Carlos Rodríguez"
                text="Excelente servicio, llevo más de 6 meses con mi cuenta de Netflix y nunca he tenido problemas. El soporte es muy rápido."
              />
              <TestimonialCard
                name="María González"
                text="Increíble relación calidad-precio. Gracias a VortexShop ahora puedo disfrutar de Disney+ a un precio mucho más accesible."
              />
              <TestimonialCard
                name="Juan Pérez"
                text="El sistema de tickets funciona perfectamente. Tuve un pequeño problema y me lo solucionaron en menos de una hora."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-purple-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para disfrutar del mejor entretenimiento?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Únete a miles de usuarios satisfechos y comienza a disfrutar de tus plataformas favoritas a precios
              increíbles.
            </p>
            <Link href="#servicios">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Comenzar ahora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ServiceCard({ title, description, price, color, features, onAddToCart }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className={`${color} text-white`}>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-white/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <div className="mb-6">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500">/mes</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onAddToCart}>
          Comprar ahora
        </Button>
      </CardFooter>
    </Card>
  )
}

function StepCard({ number, title, description }) {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md">
      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ name, text }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
            <span className="font-bold">{name.charAt(0)}</span>
          </div>
          <h3 className="font-bold">{name}</h3>
        </div>
        <p className="text-gray-600 italic">"{text}"</p>
      </CardContent>
    </Card>
  )
}
