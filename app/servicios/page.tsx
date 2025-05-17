import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, X } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ServiciosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Nuestros Servicios</h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Ofrecemos las mejores plataformas de streaming a precios increíbles. Elige el servicio que mejor se adapte a
            tus necesidades.
          </p>

          <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="movies">Películas</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
              <TabsTrigger value="anime">Anime</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceDetailCard
                  name="Netflix"
                  description="La plataforma líder de streaming con miles de películas, series y documentales."
                  color="bg-red-600"
                  features={[
                    { name: "Contenido 4K Ultra HD", included: true },
                    { name: "Múltiples perfiles", included: true },
                    { name: "Descargas offline", included: true },
                    { name: "Contenido original exclusivo", included: true },
                    { name: "Películas y series", included: true },
                    { name: "Documentales", included: true },
                    { name: "Contenido infantil", included: true },
                  ]}
                  plans={[
                    { name: "Básico", price: 7.99 },
                    { name: "Estándar", price: 9.99 },
                    { name: "Premium", price: 11.99 },
                  ]}
                />

                <ServiceDetailCard
                  name="Disney+"
                  description="Disfruta del universo Disney, Marvel, Star Wars, Pixar y National Geographic."
                  color="bg-blue-600"
                  features={[
                    { name: "Contenido 4K Ultra HD", included: true },
                    { name: "Hasta 4 dispositivos", included: true },
                    { name: "Descargas offline", included: true },
                    { name: "Contenido Disney exclusivo", included: true },
                    { name: "Marvel y Star Wars", included: true },
                    { name: "National Geographic", included: true },
                    { name: "Contenido infantil", included: true },
                  ]}
                  plans={[
                    { name: "Mensual", price: 7.99 },
                    { name: "Anual", price: 79.9 },
                  ]}
                />

                <ServiceDetailCard
                  name="Crunchyroll"
                  description="La mejor plataforma para los amantes del anime con miles de series y películas."
                  color="bg-orange-500"
                  features={[
                    { name: "Contenido HD", included: true },
                    { name: "Sin anuncios", included: true },
                    { name: "Simulcast (estreno simultáneo)", included: true },
                    { name: "Manga digital", included: true },
                    { name: "Anime subtitulado", included: true },
                    { name: "Anime doblado", included: true },
                    { name: "Descargas offline", included: false },
                  ]}
                  plans={[
                    { name: "Fan", price: 4.99 },
                    { name: "Mega Fan", price: 5.99 },
                    { name: "Ultimate Fan", price: 7.99 },
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="movies">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceDetailCard
                  name="Netflix"
                  description="La plataforma líder de streaming con miles de películas, series y documentales."
                  color="bg-red-600"
                  features={[
                    { name: "Contenido 4K Ultra HD", included: true },
                    { name: "Múltiples perfiles", included: true },
                    { name: "Descargas offline", included: true },
                    { name: "Contenido original exclusivo", included: true },
                    { name: "Películas y series", included: true },
                    { name: "Documentales", included: true },
                    { name: "Contenido infantil", included: true },
                  ]}
                  plans={[
                    { name: "Básico", price: 7.99 },
                    { name: "Estándar", price: 9.99 },
                    { name: "Premium", price: 11.99 },
                  ]}
                />

                <ServiceDetailCard
                  name="Disney+"
                  description="Disfruta del universo Disney, Marvel, Star Wars, Pixar y National Geographic."
                  color="bg-blue-600"
                  features={[
                    { name: "Contenido 4K Ultra HD", included: true },
                    { name: "Hasta 4 dispositivos", included: true },
                    { name: "Descargas offline", included: true },
                    { name: "Contenido Disney exclusivo", included: true },
                    { name: "Marvel y Star Wars", included: true },
                    { name: "National Geographic", included: true },
                    { name: "Contenido infantil", included: true },
                  ]}
                  plans={[
                    { name: "Mensual", price: 7.99 },
                    { name: "Anual", price: 79.9 },
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="series">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceDetailCard
                  name="Netflix"
                  description="La plataforma líder de streaming con miles de películas, series y documentales."
                  color="bg-red-600"
                  features={[
                    { name: "Contenido 4K Ultra HD", included: true },
                    { name: "Múltiples perfiles", included: true },
                    { name: "Descargas offline", included: true },
                    { name: "Contenido original exclusivo", included: true },
                    { name: "Películas y series", included: true },
                    { name: "Documentales", included: true },
                    { name: "Contenido infantil", included: true },
                  ]}
                  plans={[
                    { name: "Básico", price: 7.99 },
                    { name: "Estándar", price: 9.99 },
                    { name: "Premium", price: 11.99 },
                  ]}
                />

                <ServiceDetailCard
                  name="Disney+"
                  description="Disfruta del universo Disney, Marvel, Star Wars, Pixar y National Geographic."
                  color="bg-blue-600"
                  features={[
                    { name: "Contenido 4K Ultra HD", included: true },
                    { name: "Hasta 4 dispositivos", included: true },
                    { name: "Descargas offline", included: true },
                    { name: "Contenido Disney exclusivo", included: true },
                    { name: "Marvel y Star Wars", included: true },
                    { name: "National Geographic", included: true },
                    { name: "Contenido infantil", included: true },
                  ]}
                  plans={[
                    { name: "Mensual", price: 7.99 },
                    { name: "Anual", price: 79.9 },
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="anime">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceDetailCard
                  name="Crunchyroll"
                  description="La mejor plataforma para los amantes del anime con miles de series y películas."
                  color="bg-orange-500"
                  features={[
                    { name: "Contenido HD", included: true },
                    { name: "Sin anuncios", included: true },
                    { name: "Simulcast (estreno simultáneo)", included: true },
                    { name: "Manga digital", included: true },
                    { name: "Anime subtitulado", included: true },
                    { name: "Anime doblado", included: true },
                    { name: "Descargas offline", included: false },
                  ]}
                  plans={[
                    { name: "Fan", price: 4.99 },
                    { name: "Mega Fan", price: 5.99 },
                    { name: "Ultimate Fan", price: 7.99 },
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ServiceDetailCard({ name, description, color, features, plans }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className={`${color} text-white`}>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="text-white/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <h3 className="font-semibold mb-3">Características:</h3>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature.included ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <X className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span>{feature.name}</span>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold mb-3">Planes disponibles:</h3>
        <div className="space-y-2">
          {plans.map((plan, index) => (
            <div key={index} className="flex justify-between items-center p-2 border rounded-md">
              <span>{plan.name}</span>
              <span className="font-bold">${plan.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/#servicios" className="w-full">
          <Button className="w-full">Ver planes</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
