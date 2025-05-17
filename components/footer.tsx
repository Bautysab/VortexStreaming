import Link from "next/link"
import { Play, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Play className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold">VortexShop</span>
            </div>
            <p className="text-gray-400 mb-4">
              Ofrecemos las mejores cuentas de streaming a precios increíbles. Disfruta de tus plataformas favoritas sin
              complicaciones.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-400 hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/precios" className="text-gray-400 hover:text-white">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/soporte" className="text-gray-400 hover:text-white">
                  Soporte
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios/netflix" className="text-gray-400 hover:text-white">
                  Netflix
                </Link>
              </li>
              <li>
                <Link href="/servicios/disney" className="text-gray-400 hover:text-white">
                  Disney+
                </Link>
              </li>
              <li>
                <Link href="/servicios/crunchyroll" className="text-gray-400 hover:text-white">
                  Crunchyroll
                </Link>
              </li>
              <li>
                <Link href="/servicios/hbo" className="text-gray-400 hover:text-white">
                  HBO Max
                </Link>
              </li>
              <li>
                <Link href="/servicios/amazon" className="text-gray-400 hover:text-white">
                  Amazon Prime
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                <span className="text-gray-400">Calle Principal 123, Ciudad, País</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-400">+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-400">info@vortexshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VortexShop. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Desarrollado con ❤️ por VortexDev</p>
        </div>
      </div>
    </footer>
  )
}
