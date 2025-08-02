"use client"

import { useState, useRef } from "react"
import {
  Search,
  ShoppingCart,
  Gift,
  Star,
  Heart,
  Plus,
  Minus,
  X,
  Upload,
  ImageIcon,
  Settings,
  MapPin,
  Phone,
  Mail,
  Clock,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DulcesMexicanosLanding() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [currentSection, setCurrentSection] = useState("retail") // "retail" o "wholesale"

  // Estados para personalización
  const [branding, setBranding] = useState({
    logo: null,
    businessName: "DULCES MEXICANOS",
    footerBackground: null,
    retailCategories: ["Tamarindos", "Paletas", "Chamoy", "Mazapán", "Dulce de Leche", "Enchilados"],
    wholesaleCategories: ["Cajas Completas", "Paquetes", "Mixtos", "Tamarindos", "Paletas", "Chamoy"],
    footerInfo: {
      address: "Ciudad de Guatemala, Guatemala",
      phone: "37369372",
      email: "dulces@ejemplo.com",
      hours: "Lunes a Domingo: 8:00 AM - 8:00 PM",
      description:
        "Los mejores dulces mexicanos importados directamente desde México. Calidad garantizada y sabores auténticos que te transportarán a las calles de México.",
      socialMedia: {
        facebook: "",
        instagram: "",
        whatsapp: "50237369372",
      },
    },
  })

  const [editingCategories, setEditingCategories] = useState(false)
  const [newCategoryText, setNewCategoryText] = useState("")
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null)
  const [editingCategoryText, setEditingCategoryText] = useState("")

  // Productos para venta al detalle
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tamarindo Enchilado",
      price: 15,
      image: "/placeholder.svg?height=120&width=120&text=Tamarindo+Enchilado",
      category: "Tamarindos",
    },
    {
      id: 2,
      name: "Paleta de Mango",
      price: 12,
      image: "/placeholder.svg?height=120&width=120&text=Paleta+Mango",
      category: "Paletas",
    },
    {
      id: 3,
      name: "Mazapán Tradicional",
      price: 8,
      image: "/placeholder.svg?height=120&width=120&text=Mazapan",
      category: "Mazapán",
    },
    {
      id: 4,
      name: "Dulce de Leche",
      price: 20,
      image: "/placeholder.svg?height=120&width=120&text=Dulce+de+Leche",
      category: "Dulce de Leche",
    },
    {
      id: 5,
      name: "Chamoy Líquido",
      price: 25,
      image: "/placeholder.svg?height=120&width=120&text=Chamoy",
      category: "Chamoy",
    },
    {
      id: 6,
      name: "Paleta de Tamarindo",
      price: 10,
      image: "/placeholder.svg?height=120&width=120&text=Paleta+Tamarindo",
      category: "Paletas",
    },
    {
      id: 7,
      name: "Pulparindo",
      price: 18,
      image: "/placeholder.svg?height=120&width=120&text=Pulparindo",
      category: "Tamarindos",
    },
    {
      id: 8,
      name: "Rockaleta",
      price: 14,
      image: "/placeholder.svg?height=120&width=120&text=Rockaleta",
      category: "Paletas",
    },
    {
      id: 9,
      name: "Pelon Pelo Rico",
      price: 16,
      image: "/placeholder.svg?height=120&width=120&text=Pelon+Pelo+Rico",
      category: "Enchilados",
    },
    {
      id: 10,
      name: "Vero Mango",
      price: 13,
      image: "/placeholder.svg?height=120&width=120&text=Vero+Mango",
      category: "Enchilados",
    },
    {
      id: 11,
      name: "Duvalin",
      price: 22,
      image: "/placeholder.svg?height=120&width=120&text=Duvalin",
      category: "Dulce de Leche",
    },
    {
      id: 12,
      name: "Glorias",
      price: 30,
      image: "/placeholder.svg?height=120&width=120&text=Glorias",
      category: "Dulce de Leche",
    },
    {
      id: 13,
      name: "Paleta Payaso",
      price: 11,
      image: "/placeholder.svg?height=120&width=120&text=Paleta+Payaso",
      category: "Paletas",
    },
    {
      id: 14,
      name: "Chaca Chaca",
      price: 9,
      image: "/placeholder.svg?height=120&width=120&text=Chaca+Chaca",
      category: "Enchilados",
    },
    {
      id: 15,
      name: "Paleta de Coco",
      price: 15,
      image: "/placeholder.svg?height=120&width=120&text=Paleta+Coco",
      category: "Paletas",
    },
  ])

  // Productos para mayoreo
  const [wholesaleProducts, setWholesaleProducts] = useState([
    {
      id: 101,
      name: "Caja Tamarindos Enchilados x50",
      price: 600,
      unitPrice: 12,
      quantity: 50,
      image: "/placeholder.svg?height=120&width=120&text=Caja+Tamarindos+x50",
      category: "Tamarindos",
      description: "Caja completa de 50 unidades de tamarindos enchilados",
    },
    {
      id: 102,
      name: "Paquete Paletas Mango x24",
      price: 240,
      unitPrice: 10,
      quantity: 24,
      image: "/placeholder.svg?height=120&width=120&text=Paquete+Paletas+x24",
      category: "Paletas",
      description: "Paquete de 24 paletas de mango con chamoy",
    },
    {
      id: 103,
      name: "Caja Mazapán x100",
      price: 650,
      unitPrice: 6.5,
      quantity: 100,
      image: "/placeholder.svg?height=120&width=120&text=Caja+Mazapan+x100",
      category: "Mazapán",
      description: "Caja de 100 mazapanes tradicionales",
    },
    {
      id: 104,
      name: "Paquete Dulce de Leche x30",
      price: 480,
      unitPrice: 16,
      quantity: 30,
      image: "/placeholder.svg?height=120&width=120&text=Paquete+Dulce+x30",
      category: "Dulce de Leche",
      description: "Paquete de 30 dulces de leche cremosos",
    },
    {
      id: 105,
      name: "Caja Chamoy x12 Botellas",
      price: 240,
      unitPrice: 20,
      quantity: 12,
      image: "/placeholder.svg?height=120&width=120&text=Caja+Chamoy+x12",
      category: "Chamoy",
      description: "Caja con 12 botellas de chamoy líquido",
    },
    {
      id: 106,
      name: "Paquete Mixto x60",
      price: 720,
      unitPrice: 12,
      quantity: 60,
      image: "/placeholder.svg?height=120&width=120&text=Paquete+Mixto+x60",
      category: "Mixto",
      description: "Paquete mixto con variedad de dulces mexicanos",
    },
  ])

  const [editMode, setEditMode] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newImageUrl, setNewImageUrl] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unitPrice: "",
    quantity: "",
    image: "",
    category: "Tamarindos",
    description: "",
  })

  // Estados para la ruleta de la suerte
  const [showRoulette, setShowRoulette] = useState(false)
  const [rouletteActive, setRouletteActive] = useState(false)
  const [roulettePrizes, setRoulettePrizes] = useState([
    { id: 1, text: "10% de descuento", image: "", color: "#FF6B6B", probability: 15 },
    { id: 2, text: "Dulce gratis", image: "", color: "#4ECDC4", probability: 20 },
    { id: 3, text: "15% de descuento", image: "", color: "#45B7D1", probability: 10 },
    { id: 4, text: "Envío gratis", image: "", color: "#96CEB4", probability: 5 },
    { id: 5, text: "20% de descuento", image: "", color: "#FFEAA7", probability: 5 },
    { id: 6, text: "Combo especial", image: "", color: "#DDA0DD", probability: 10 },
    { id: 7, text: "5% de descuento", image: "", color: "#98D8C8", probability: 25 },
    { id: 8, text: "Sorpresa especial", image: "", color: "#F7DC6F", probability: 10 },
  ])
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedPrize, setSelectedPrize] = useState(null)
  const [showRouletteConfig, setShowRouletteConfig] = useState(false)
  const [editingPrize, setEditingPrize] = useState(null)
  const [newPrizeText, setNewPrizeText] = useState("")
  const [newPrizeImage, setNewPrizeImage] = useState("")
  const [newPrizeColor, setNewPrizeColor] = useState("#FF6B6B")
  const [newPrizeProbability, setNewPrizeProbability] = useState(10)

  // Referencias para los inputs de archivo
  const editFileInputRef = useRef(null)
  const newProductFileInputRef = useRef(null)
  const logoFileInputRef = useRef(null)
  const footerBackgroundInputRef = useRef(null)

  // Funciones del carrito
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Función para convertir archivo a base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Función para manejar la subida del logo
  const handleLogoUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido")
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("El logo es muy grande. Por favor selecciona una imagen menor a 2MB")
        return
      }

      try {
        const base64Image = await convertFileToBase64(file)
        setBranding((prev) => ({ ...prev, logo: base64Image }))
      } catch (error) {
        console.error("Error al procesar el logo:", error)
        alert("Error al procesar el logo")
      }
    }
  }

  // Función para manejar la subida de archivos para editar producto
  const handleEditImageUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es muy grande. Por favor selecciona una imagen menor a 5MB")
        return
      }

      try {
        const base64Image = await convertFileToBase64(file)
        setNewImageUrl(base64Image)
      } catch (error) {
        console.error("Error al procesar la imagen:", error)
        alert("Error al procesar la imagen")
      }
    }
  }

  // Función para manejar la subida de archivos para nuevo producto
  const handleNewProductImageUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es muy grande. Por favor selecciona una imagen menor a 5MB")
        return
      }

      try {
        const base64Image = await convertFileToBase64(file)
        setNewProduct({ ...newProduct, image: base64Image })
      } catch (error) {
        console.error("Error al procesar la imagen:", error)
        alert("Error al procesar la imagen")
      }
    }
  }

  // Función para generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const phoneNumber = branding.footerInfo.socialMedia.whatsapp

    if (cartItems.length === 0) {
      const message =
        "🍬 ¡Hola! Me interesa hacer un pedido de dulces mexicanos. ¿Podrías ayudarme con el catálogo disponible? 😊"
      const encodedMessage = encodeURIComponent(message)
      return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    }

    let message = "🍬 *PEDIDO DE DULCES MEXICANOS* 🍬\n\n"
    message += "Hola! Me gustaría hacer el siguiente pedido:\n\n"

    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio unitario: Q${item.price}\n`
      message += `   Subtotal: Q${item.price * item.quantity}\n\n`
    })

    message += `💰 *TOTAL: Q${getTotalPrice()}*\n\n`
    message += "Por favor confirma la disponibilidad y el método de entrega. ¡Gracias! 😊"

    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  }

  // Función para proceder al pago
  const proceedToPayment = () => {
    const whatsappUrl = generateWhatsAppMessage()
    window.open(whatsappUrl, "_blank")
  }

  // Funciones para editar productos
  const editProductImage = (product) => {
    setEditingProduct(product)
    setNewImageUrl(product.image)
  }

  const saveImageChange = () => {
    if (currentSection === "retail") {
      setProducts((prev) =>
        prev.map((product) => (product.id === editingProduct.id ? { ...product, image: newImageUrl } : product)),
      )
    } else {
      setWholesaleProducts((prev) =>
        prev.map((product) => (product.id === editingProduct.id ? { ...product, image: newImageUrl } : product)),
      )
    }
    setEditingProduct(null)
    setNewImageUrl("")
  }

  const addNewProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: Number.parseFloat(newProduct.price),
        image: newProduct.image || "/placeholder.svg?height=120&width=120&text=" + encodeURIComponent(newProduct.name),
        category: newProduct.category,
      }

      // Si es mayoreo, agregar campos adicionales
      if (currentSection === "wholesale") {
        product.unitPrice = Number.parseFloat(newProduct.unitPrice) || 0
        product.quantity = Number.parseInt(newProduct.quantity) || 1
        product.description = newProduct.description
        setWholesaleProducts((prev) => [...prev, product])
      } else {
        setProducts((prev) => [...prev, product])
      }

      setNewProduct({
        name: "",
        price: "",
        unitPrice: "",
        quantity: "",
        image: "",
        category: "Tamarindos",
        description: "",
      })
      setShowAddProduct(false)
    }
  }

  const deleteProduct = (productId) => {
    if (currentSection === "retail") {
      setProducts((prev) => prev.filter((product) => product.id !== productId))
    } else {
      setWholesaleProducts((prev) => prev.filter((product) => product.id !== productId))
    }
  }

  // Función para manejar la subida de la imagen de fondo del footer
  const handleFooterBackgroundUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido")
        return
      }

      if (file.size > 3 * 1024 * 1024) {
        alert("La imagen es muy grande. Por favor selecciona una imagen menor a 3MB")
        return
      }

      try {
        const base64Image = await convertFileToBase64(file)
        setBranding((prev) => ({ ...prev, footerBackground: base64Image }))
      } catch (error) {
        console.error("Error al procesar la imagen de fondo:", error)
        alert("Error al procesar la imagen de fondo")
      }
    }
  }

  // Obtener productos actuales según la sección
  const getCurrentProducts = () => {
    return currentSection === "retail" ? products : wholesaleProducts
  }

  // Funciones para la ruleta
  const spinRoulette = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedPrize(null)

    // Simular giro por 3 segundos
    setTimeout(() => {
      // Crear array con probabilidades
      const weightedPrizes = []
      roulettePrizes.forEach((prize) => {
        for (let i = 0; i < prize.probability; i++) {
          weightedPrizes.push(prize)
        }
      })

      const randomIndex = Math.floor(Math.random() * weightedPrizes.length)
      setSelectedPrize(weightedPrizes[randomIndex])
      setIsSpinning(false)
    }, 3000)
  }

  const updatePrize = (prizeId, updates) => {
    setRoulettePrizes((prev) => prev.map((prize) => (prize.id === prizeId ? { ...prize, ...updates } : prize)))
  }

  const addNewPrize = () => {
    if (newPrizeText.trim()) {
      const newPrize = {
        id: Date.now(),
        text: newPrizeText,
        image: newPrizeImage,
        color: newPrizeColor,
        probability: newPrizeProbability,
      }
      setRoulettePrizes((prev) => [...prev, newPrize])
      setNewPrizeText("")
      setNewPrizeImage("")
      setNewPrizeColor("#FF6B6B")
      setNewPrizeProbability(10)
    }
  }

  const deletePrize = (prizeId) => {
    setRoulettePrizes((prev) => prev.filter((prize) => prize.id !== prizeId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Floating candy decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-green-500 to-lime-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        />
        <div
          className="absolute top-60 left-1/4 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-18 h-18 bg-gradient-to-br from-red-600 to-red-400 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "3s" }}
        />

        <div className="absolute top-32 right-10 w-8 h-16 bg-gradient-to-b from-amber-600 to-red-700 rounded-full animate-pulse" />
        <div
          className="absolute bottom-40 left-1/3 w-10 h-20 bg-gradient-to-b from-red-500 to-yellow-500 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <div
            className="w-32 h-32 bg-gradient-conic from-red-500 via-yellow-500 via-green-500 via-blue-500 to-red-500 rounded-full animate-spin"
            style={{ animationDuration: "20s" }}
          />
          <div className="w-2 h-20 bg-amber-600 mx-auto mt-2 rounded-full" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {branding.logo ? (
              <img
                src={branding.logo || "/placeholder.svg"}
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            )}
            <span className="text-white font-bold text-xl">{branding.businessName}</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentSection("retail")}
              className={`font-medium transition-colors ${
                currentSection === "retail" ? "text-red-400" : "text-gray-400 hover:text-red-300"
              }`}
            >
              TIENDA
            </button>
            <a
              href="#regalos"
              className="text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                setShowRoulette(true)
              }}
            >
              REGALOS
            </a>
            <button
              onClick={() => setCurrentSection("wholesale")}
              className={`font-medium transition-colors ${
                currentSection === "wholesale" ? "text-red-400" : "text-gray-400 hover:text-red-300"
              }`}
            >
              MAYOREO
            </button>
            <a
              href="#envios"
              className="text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                // Scroll suave hacia la sección de envíos
                document.getElementById("envios-section")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              ENVÍOS
            </a>
            <a href="#servicios" className="text-red-400 hover:text-red-300 font-medium transition-colors">
              SERVICIOS
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-6 py-2 rounded-full relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              CARRITO
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                {currentSection === "retail" ? (
                  <>
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                      <span className="text-red-500">Los Mejores</span>
                      <br />
                      <span className="text-orange-500">Dulces</span>
                      <br />
                      <span className="text-yellow-500">Mexicanos</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
                      Desde tamarindos enchilados hasta paletas de mango con chamoy, tenemos todos los sabores
                      tradicionales que te transportarán a México. ¡Endulza tu día con auténticos sabores mexicanos!
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                      <span className="text-blue-500">Ventas</span>
                      <br />
                      <span className="text-purple-500">Al</span>
                      <br />
                      <span className="text-green-500">Mayoreo</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
                      Precios especiales para revendedores y negocios. Cajas completas y paquetes grandes con los
                      mejores precios del mercado. ¡Haz crecer tu negocio con nosotros!
                    </p>
                  </>
                )}
              </div>

              {/* Search Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <Input
                    type="text"
                    placeholder={
                      currentSection === "retail" ? "Busca tu dulce favorito..." : "Busca productos de mayoreo..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  />
                  <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-8 py-2 rounded-lg">
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">
                    {currentSection === "retail" ? "Categorías Populares:" : "Categorías de Mayoreo:"}
                  </h3>
                  {editMode && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                      onClick={() => setEditingCategories(!editingCategories)}
                    >
                      {editingCategories ? "Terminar Edición" : "Editar Categorías"}
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {(currentSection === "retail" ? branding.retailCategories : branding.wholesaleCategories).map(
                    (category, index) => (
                      <div key={index} className="relative group">
                        <Button
                          variant="outline"
                          className={`${
                            currentSection === "retail"
                              ? "border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                              : "border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                          } transition-colors bg-transparent ${editingCategories ? "pr-8" : ""}`}
                        >
                          {editingCategoryIndex === index ? (
                            <input
                              type="text"
                              value={editingCategoryText}
                              onChange={(e) => setEditingCategoryText(e.target.value)}
                              onBlur={() => {
                                const newCategories = [
                                  ...(currentSection === "retail"
                                    ? branding.retailCategories
                                    : branding.wholesaleCategories),
                                ]
                                newCategories[index] = editingCategoryText
                                setBranding((prev) => ({
                                  ...prev,
                                  [currentSection === "retail" ? "retailCategories" : "wholesaleCategories"]:
                                    newCategories,
                                }))
                                setEditingCategoryIndex(null)
                                setEditingCategoryText("")
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  const newCategories = [
                                    ...(currentSection === "retail"
                                      ? branding.retailCategories
                                      : branding.wholesaleCategories),
                                  ]
                                  newCategories[index] = editingCategoryText
                                  setBranding((prev) => ({
                                    ...prev,
                                    [currentSection === "retail" ? "retailCategories" : "wholesaleCategories"]:
                                      newCategories,
                                  }))
                                  setEditingCategoryIndex(null)
                                  setEditingCategoryText("")
                                }
                              }}
                              className="bg-transparent border-none outline-none text-current w-20"
                              autoFocus
                            />
                          ) : (
                            category
                          )}
                        </Button>
                        {editingCategories && (
                          <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingCategoryIndex(index)
                                setEditingCategoryText(category)
                              }}
                              className="w-5 h-5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs flex items-center justify-center"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => {
                                const newCategories = (
                                  currentSection === "retail" ? branding.retailCategories : branding.wholesaleCategories
                                ).filter((_, i) => i !== index)
                                setBranding((prev) => ({
                                  ...prev,
                                  [currentSection === "retail" ? "retailCategories" : "wholesaleCategories"]:
                                    newCategories,
                                }))
                              }}
                              className="w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </div>
                    ),
                  )}
                  {editingCategories && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newCategoryText}
                        onChange={(e) => setNewCategoryText(e.target.value)}
                        placeholder="Nueva categoría..."
                        className="bg-gray-800 border border-gray-600 text-white px-3 py-1 rounded text-sm"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && newCategoryText.trim()) {
                            const newCategories = [
                              ...(currentSection === "retail"
                                ? branding.retailCategories
                                : branding.wholesaleCategories),
                              newCategoryText.trim(),
                            ]
                            setBranding((prev) => ({
                              ...prev,
                              [currentSection === "retail" ? "retailCategories" : "wholesaleCategories"]: newCategories,
                            }))
                            setNewCategoryText("")
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs"
                        onClick={() => {
                          if (newCategoryText.trim()) {
                            const newCategories = [
                              ...(currentSection === "retail"
                                ? branding.retailCategories
                                : branding.wholesaleCategories),
                              newCategoryText.trim(),
                            ]
                            setBranding((prev) => ({
                              ...prev,
                              [currentSection === "retail" ? "retailCategories" : "wholesaleCategories"]: newCategories,
                            }))
                            setNewCategoryText("")
                          }
                        }}
                      >
                        ➕
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Products Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">
                    {currentSection === "retail" ? "Productos Destacados:" : "Productos de Mayoreo:"}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? "Salir de Edición" : "Editar Productos"}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => setShowAddProduct(true)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Agregar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {getCurrentProducts().map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-red-500 transition-colors relative"
                    >
                      {editMode && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-6 h-6 p-0 text-blue-400 hover:text-blue-300"
                            onClick={() => editProductImage(product)}
                          >
                            ✏️
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-6 h-6 p-0 text-red-400 hover:text-red-300"
                            onClick={() => deleteProduct(product.id)}
                          >
                            🗑️
                          </Button>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="mb-3 overflow-hidden rounded-lg bg-gray-700">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-24 object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1">{product.name}</h4>
                        <p className="text-xs text-gray-400 mb-1">{product.category}</p>

                        {currentSection === "wholesale" && product.quantity && (
                          <>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              <Package className="w-3 h-3 text-blue-400" />
                              <span className="text-xs text-blue-400">{product.quantity} unidades</span>
                            </div>
                            {product.unitPrice && (
                              <p className="text-xs text-gray-400 mb-1">
                                Precio unitario: Q{product.unitPrice.toFixed(2)}
                              </p>
                            )}
                            {product.description && (
                              <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                            )}
                          </>
                        )}

                        <p className="text-green-400 font-bold mb-3">Q{product.price}</p>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white w-full"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-8 py-3 rounded-lg text-lg"
                  onClick={() => {
                    if (cartItems.length > 0) {
                      proceedToPayment()
                    } else {
                      setCartOpen(true)
                    }
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ver Carrito
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold px-8 py-3 rounded-lg text-lg bg-transparent"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Ver Catálogo
                </Button>
                <Button
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-3 rounded-lg text-lg"
                  onClick={() => {
                    const phoneNumber = branding.footerInfo.socialMedia.whatsapp
                    const message =
                      currentSection === "retail"
                        ? "🍬 ¡Hola! Me interesa hacer un pedido de dulces mexicanos. ¿Podrías ayudarme con el catálogo disponible? 😊"
                        : "📦 ¡Hola! Me interesa información sobre precios de mayoreo y productos al por mayor. ¿Podrías ayudarme? 😊"
                    const encodedMessage = encodeURIComponent(message)
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
                    window.open(whatsappUrl, "_blank")
                  }}
                >
                  💬 Contactar por WhatsApp
                </Button>
              </div>
            </div>

            {/* Right Content - Featured Products Preview */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-2xl text-white">
                      <h4 className="font-bold text-lg mb-2">
                        {currentSection === "retail" ? "Tamarindos" : "Cajas Completas"}
                      </h4>
                      <p className="text-sm opacity-90">
                        {currentSection === "retail" ? "Enchilados y dulces" : "50-100 unidades"}
                      </p>
                      <div className="flex items-center mt-3">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-2xl text-white">
                      <h4 className="font-bold text-lg mb-2">{currentSection === "retail" ? "Mazapán" : "Paquetes"}</h4>
                      <p className="text-sm opacity-90">
                        {currentSection === "retail" ? "Tradicional de cacahuate" : "24-30 unidades"}
                      </p>
                      <div className="flex items-center mt-3">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-gradient-to-br from-green-500 to-lime-500 p-6 rounded-2xl text-white">
                      <h4 className="font-bold text-lg mb-2">{currentSection === "retail" ? "Paletas" : "Mixtos"}</h4>
                      <p className="text-sm opacity-90">
                        {currentSection === "retail" ? "De mango con chamoy" : "Variedad de dulces"}
                      </p>
                      <div className="flex items-center mt-3">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl text-white">
                      <h4 className="font-bold text-lg mb-2">
                        {currentSection === "retail" ? "Dulce de Leche" : "Precios Especiales"}
                      </h4>
                      <p className="text-sm opacity-90">
                        {currentSection === "retail" ? "Cremoso y delicioso" : "Descuentos por volumen"}
                      </p>
                      <div className="flex items-center mt-3">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Stats */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500">{currentSection === "retail" ? "500+" : "50+"}</div>
              <div className="text-gray-400">{currentSection === "retail" ? "Productos" : "Productos Mayoreo"}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">{currentSection === "retail" ? "10k+" : "500+"}</div>
              <div className="text-gray-400">{currentSection === "retail" ? "Clientes Felices" : "Revendedores"}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500">24/7</div>
              <div className="text-gray-400">Atención</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500">{currentSection === "retail" ? "100%" : "30%"}</div>
              <div className="text-gray-400">{currentSection === "retail" ? "Auténticos" : "Descuento"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Envíos */}
      <div id="envios-section" className="relative z-10 px-6 py-16 bg-gray-800 bg-opacity-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">📦 Información de Envíos</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div>
          </div>

          <div className="bg-gray-900 bg-opacity-80 rounded-2xl p-8 border border-gray-700">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚧</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Actualmente no contamos con envíos</h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Por el momento, todos nuestros productos están disponibles únicamente para{" "}
                <strong className="text-red-400">retiro en tienda</strong> o{" "}
                <strong className="text-red-400">entrega personal</strong>.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
                  <div className="w-12 h-12 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">Retiro en Tienda</h4>
                  <p className="text-gray-300 text-sm">
                    Visítanos en nuestra ubicación y lleva tus dulces favoritos al instante.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">Entrega Personal</h4>
                  <p className="text-gray-300 text-sm">
                    Coordina con nosotros por WhatsApp para entregas en zonas cercanas.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-3 rounded-lg text-lg"
                  onClick={() => {
                    const phoneNumber = branding.footerInfo.socialMedia.whatsapp
                    const message =
                      "🍬 ¡Hola! Me gustaría coordinar el retiro o entrega de mis dulces. ¿Podrías ayudarme con los detalles? 😊"
                    const encodedMessage = encodeURIComponent(message)
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
                    window.open(whatsappUrl, "_blank")
                  }}
                >
                  💬 Coordinar Retiro/Entrega
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Contraportada */}
      <footer
        className="relative z-10 border-t border-gray-700 overflow-hidden"
        style={{
          backgroundImage: branding.footerBackground ? `url(${branding.footerBackground})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Información del negocio */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {branding.logo ? (
                  <img
                    src={branding.logo || "/placeholder.svg"}
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                )}
                <h3 className="text-white font-bold text-lg">{branding.businessName}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{branding.footerInfo.description}</p>
            </div>

            {/* Información de contacto */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span className="text-sm">{branding.footerInfo.address}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span className="text-sm">{branding.footerInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span className="text-sm">{branding.footerInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span className="text-sm">{branding.footerInfo.hours}</span>
                </div>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Enlaces Rápidos</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentSection("retail")}
                  className="block text-gray-300 hover:text-red-400 text-sm transition-colors text-left"
                >
                  Tienda
                </button>
                <button
                  onClick={() => setShowRoulette(true)}
                  className="block text-gray-300 hover:text-red-400 text-sm transition-colors text-left"
                >
                  Regalos
                </button>
                <button
                  onClick={() => setCurrentSection("wholesale")}
                  className="block text-gray-300 hover:text-red-400 text-sm transition-colors text-left"
                >
                  Mayoreo
                </button>
                <a href="#envios" className="block text-gray-300 hover:text-red-400 text-sm transition-colors">
                  Envíos
                </a>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 mt-4"
                  onClick={() => {
                    const phoneNumber = branding.footerInfo.socialMedia.whatsapp
                    const message = "🍬 ¡Hola! Me gustaría obtener más información sobre sus productos."
                    const encodedMessage = encodeURIComponent(message)
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
                    window.open(whatsappUrl, "_blank")
                  }}
                >
                  💬 WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 {branding.businessName}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de la Ruleta de la Suerte */}
      {showRoulette && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-2xl">🎁 Ruleta de la Suerte</h3>
              <div className="flex gap-2">
                {editMode && (
                  <Button
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => setShowRouletteConfig(true)}
                  >
                    ⚙️ Configurar
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRoulette(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {!rouletteActive && !editMode ? (
              // Mensaje cuando la ruleta no está activa
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Gift className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-white font-bold text-xl mb-4">¡Evento Especial Próximamente!</h4>
                <p className="text-gray-300 mb-6">
                  La ruleta de la suerte estará disponible muy pronto. ¡Mantente atento a nuestras redes sociales para
                  no perderte increíbles premios!
                </p>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    const phoneNumber = branding.footerInfo.socialMedia.whatsapp
                    const message =
                      "🎁 ¡Hola! Me interesa saber cuándo estará disponible la ruleta de la suerte. ¿Podrías avisarme? 😊"
                    const encodedMessage = encodeURIComponent(message)
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
                    window.open(whatsappUrl, "_blank")
                  }}
                >
                  💬 Notificarme por WhatsApp
                </Button>
              </div>
            ) : (
              // Ruleta activa
              <div className="space-y-6">
                {/* Ruleta visual */}
                <div className="relative">
                  <div className="w-80 h-80 mx-auto relative">
                    {/* Círculo de la ruleta */}
                    <div
                      className={`w-full h-full rounded-full border-8 border-yellow-400 relative overflow-hidden transition-transform duration-3000 ease-out ${
                        isSpinning ? "animate-spin" : ""
                      }`}
                      style={{
                        background: `conic-gradient(${roulettePrizes
                          .map(
                            (prize, index) =>
                              `${prize.color} ${(index * 360) / roulettePrizes.length}deg ${((index + 1) * 360) / roulettePrizes.length}deg`,
                          )
                          .join(", ")})`,
                      }}
                    >
                      {/* Segmentos con texto */}
                      {roulettePrizes.map((prize, index) => {
                        const angle = (360 / roulettePrizes.length) * index
                        const textAngle = angle + 360 / roulettePrizes.length / 2
                        return (
                          <div
                            key={prize.id}
                            className="absolute w-full h-full flex items-center justify-center"
                            style={{
                              transform: `rotate(${textAngle}deg)`,
                              transformOrigin: "center",
                            }}
                          >
                            <div
                              className="text-white font-bold text-xs text-center px-2"
                              style={{
                                transform: `translateY(-120px) rotate(${-textAngle}deg)`,
                                maxWidth: "80px",
                                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                              }}
                            >
                              {prize.image && (
                                <img
                                  src={prize.image || "/placeholder.svg"}
                                  alt=""
                                  className="w-6 h-6 mx-auto mb-1 rounded"
                                />
                              )}
                              <div>{prize.text}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Flecha indicadora - CENTRADA Y MÁS VISIBLE */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative">
                        {/* Flecha principal apuntando hacia la derecha */}
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-16 border-t-transparent border-b-transparent border-l-red-500 drop-shadow-lg"></div>
                        {/* Borde de la flecha */}
                        <div className="absolute top-1 left-1 w-0 h-0 border-t-6 border-b-6 border-l-12 border-t-transparent border-b-transparent border-l-yellow-400"></div>
                        {/* Círculo decorativo */}
                        <div className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                    </div>

                    {/* Centro de la ruleta */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Botón de girar */}
                <div className="text-center">
                  <Button
                    className={`bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-full text-lg ${
                      isSpinning ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={spinRoulette}
                    disabled={isSpinning}
                  >
                    {isSpinning ? "🎲 Girando..." : "🎲 ¡Girar la Ruleta!"}
                  </Button>
                </div>

                {/* Resultado */}
                {selectedPrize && !isSpinning && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-center">
                    <h4 className="text-white font-bold text-xl mb-2">🎉 ¡Felicidades!</h4>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {selectedPrize.image && (
                        <img src={selectedPrize.image || "/placeholder.svg"} alt="" className="w-12 h-12 rounded-lg" />
                      )}
                      <p className="text-white text-lg font-semibold">{selectedPrize.text}</p>
                    </div>
                    <Button
                      className="bg-white text-green-600 hover:bg-gray-100 font-bold"
                      onClick={() => {
                        const phoneNumber = branding.footerInfo.socialMedia.whatsapp
                        const message = `🎉 ¡Gané en la ruleta de la suerte! Mi premio es: ${selectedPrize.text}. ¿Cómo puedo reclamarlo? 😊`
                        const encodedMessage = encodeURIComponent(message)
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
                        window.open(whatsappUrl, "_blank")
                      }}
                    >
                      💬 Reclamar Premio
                    </Button>
                  </div>
                )}

                {/* Instrucciones */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">📋 Instrucciones:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Haz clic en "Girar la Ruleta" para participar</li>
                    <li>• Cada cliente puede participar una vez por día</li>
                    <li>• Los premios deben reclamarse el mismo día</li>
                    <li>• Contacta por WhatsApp para reclamar tu premio</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de configuración de la ruleta */}
      {showRouletteConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl">⚙️ Configurar Ruleta</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRouletteConfig(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Control de activación */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">Estado de la Ruleta</h4>
                    <p className="text-gray-300 text-sm">
                      {rouletteActive ? "La ruleta está activa para los clientes" : "La ruleta está desactivada"}
                    </p>
                  </div>
                  <Button
                    className={`${
                      rouletteActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    } text-white font-bold px-6 py-2`}
                    onClick={() => setRouletteActive(!rouletteActive)}
                  >
                    {rouletteActive ? "🔴 Desactivar" : "🟢 Activar"}
                  </Button>
                </div>
              </div>

              {/* Lista de premios */}
              <div>
                <h4 className="text-white font-semibold mb-4">🎁 Premios Configurados</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {roulettePrizes.map((prize) => (
                    <div key={prize.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white"
                          style={{ backgroundColor: prize.color }}
                        ></div>
                        {prize.image && (
                          <img
                            src={prize.image || "/placeholder.svg"}
                            alt=""
                            className="w-8 h-8 rounded object-cover"
                          />
                        )}
                        <span className="text-white font-medium flex-1">{prize.text}</span>
                        <span className="text-yellow-400 text-sm font-semibold bg-gray-600 px-2 py-1 rounded">
                          {prize.probability}%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                          onClick={() => setEditingPrize(prize)}
                        >
                          ✏️ Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
                          onClick={() => deletePrize(prize.id)}
                        >
                          🗑️ Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agregar nuevo premio */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-4">➕ Agregar Nuevo Premio</h5>
                <div className="space-y-3">
                  <Input
                    value={newPrizeText}
                    onChange={(e) => setNewPrizeText(e.target.value)}
                    placeholder="Texto del premio (ej: 10% de descuento)"
                    className="bg-gray-600 border-gray-500 text-white"
                  />
                  <Input
                    value={newPrizeImage}
                    onChange={(e) => setNewPrizeImage(e.target.value)}
                    placeholder="URL de imagen (opcional)"
                    className="bg-gray-600 border-gray-500 text-white"
                  />
                  <div className="flex items-center gap-3">
                    <label className="text-white text-sm">Color:</label>
                    <input
                      type="color"
                      value={newPrizeColor}
                      onChange={(e) => setNewPrizeColor(e.target.value)}
                      className="w-12 h-8 rounded border-2 border-gray-500"
                    />
                    <label className="text-white text-sm">Probabilidad:</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={newPrizeProbability}
                      onChange={(e) => setNewPrizeProbability(Number.parseInt(e.target.value) || 10)}
                      className="w-16 bg-gray-600 border border-gray-500 text-white rounded px-2 py-1 text-sm"
                    />
                    <span className="text-gray-400 text-sm">%</span>
                    <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={addNewPrize}>
                      ➕ Agregar Premio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar premio */}
      {editingPrize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-white font-bold text-lg mb-4">✏️ Editar Premio</h3>
            <div className="space-y-4">
              <Input
                value={editingPrize.text}
                onChange={(e) => setEditingPrize({ ...editingPrize, text: e.target.value })}
                placeholder="Texto del premio"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Input
                value={editingPrize.image}
                onChange={(e) => setEditingPrize({ ...editingPrize, image: e.target.value })}
                placeholder="URL de imagen (opcional)"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <div className="flex items-center gap-3">
                <label className="text-white text-sm">Color:</label>
                <input
                  type="color"
                  value={editingPrize.color}
                  onChange={(e) => setEditingPrize({ ...editingPrize, color: e.target.value })}
                  className="w-12 h-8 rounded border-2 border-gray-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-white text-sm">Probabilidad:</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editingPrize.probability || 10}
                  onChange={(e) =>
                    setEditingPrize({ ...editingPrize, probability: Number.parseInt(e.target.value) || 10 })
                  }
                  className="w-20 bg-gray-700 border border-gray-600 text-white rounded px-2 py-1"
                />
                <span className="text-gray-400 text-sm">%</span>
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    updatePrize(editingPrize.id, editingPrize)
                    setEditingPrize(null)
                  }}
                >
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                  onClick={() => setEditingPrize(null)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de configuración */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-bold text-xl mb-6">Configuración del Negocio</h3>

            <div className="space-y-6">
              {/* Logo y nombre del negocio */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Logo y Marca</h4>
                <div className="flex items-center gap-4">
                  {branding.logo ? (
                    <img
                      src={branding.logo || "/placeholder.svg"}
                      alt="Logo actual"
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
                      onClick={() => logoFileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {branding.logo ? "Cambiar Logo" : "Subir Logo"}
                    </Button>
                    <input
                      ref={logoFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                <Input
                  value={branding.businessName}
                  onChange={(e) => setBranding((prev) => ({ ...prev, businessName: e.target.value }))}
                  placeholder="Nombre del negocio"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {/* Información de contacto */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Información de Contacto</h4>
                <Input
                  value={branding.footerInfo.address}
                  onChange={(e) =>
                    setBranding((prev) => ({
                      ...prev,
                      footerInfo: { ...prev.footerInfo, address: e.target.value },
                    }))
                  }
                  placeholder="Dirección"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  value={branding.footerInfo.phone}
                  onChange={(e) =>
                    setBranding((prev) => ({
                      ...prev,
                      footerInfo: { ...prev.footerInfo, phone: e.target.value },
                    }))
                  }
                  placeholder="Teléfono"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  value={branding.footerInfo.email}
                  onChange={(e) =>
                    setBranding((prev) => ({
                      ...prev,
                      footerInfo: { ...prev.footerInfo, email: e.target.value },
                    }))
                  }
                  placeholder="Email"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  value={branding.footerInfo.socialMedia.whatsapp}
                  onChange={(e) =>
                    setBranding((prev) => ({
                      ...prev,
                      footerInfo: {
                        ...prev.footerInfo,
                        socialMedia: { ...prev.footerInfo.socialMedia, whatsapp: e.target.value },
                      },
                    }))
                  }
                  placeholder="WhatsApp (ej: 50237369372)"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  value={branding.footerInfo.hours}
                  onChange={(e) =>
                    setBranding((prev) => ({
                      ...prev,
                      footerInfo: { ...prev.footerInfo, hours: e.target.value },
                    }))
                  }
                  placeholder="Horarios de atención"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {/* Descripción del negocio */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Descripción del Negocio</h4>
                <textarea
                  value={branding.footerInfo.description}
                  onChange={(e) =>
                    setBranding((prev) => ({
                      ...prev,
                      footerInfo: { ...prev.footerInfo, description: e.target.value },
                    }))
                  }
                  placeholder="Describe tu negocio..."
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 resize-none"
                />
              </div>

              {/* Imagen de fondo del footer */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Imagen de Fondo del Footer</h4>
                <div className="space-y-2">
                  {branding.footerBackground && (
                    <div className="relative">
                      <img
                        src={branding.footerBackground || "/placeholder.svg"}
                        alt="Fondo actual del footer"
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-600"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-1 right-1 text-red-400 hover:text-red-300 bg-black bg-opacity-50 rounded"
                        onClick={() => setBranding((prev) => ({ ...prev, footerBackground: null }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:text-white bg-transparent"
                    onClick={() => footerBackgroundInputRef.current?.click()}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    {branding.footerBackground ? "Cambiar Imagen de Fondo" : "Subir Imagen de Fondo"}
                  </Button>
                  <input
                    ref={footerBackgroundInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFooterBackgroundUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-400">Recomendado: Imagen horizontal de buena calidad (máximo 3MB)</p>
                </div>
              </div>

              {/* Categorías personalizables */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Categorías Personalizables</h4>

                {/* Categorías de Retail */}
                <div className="space-y-3">
                  <h5 className="text-gray-300 font-medium">Categorías de Tienda:</h5>
                  <div className="space-y-2">
                    {branding.retailCategories.map((category, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={category}
                          onChange={(e) => {
                            const newCategories = [...branding.retailCategories]
                            newCategories[index] = e.target.value
                            setBranding((prev) => ({ ...prev, retailCategories: newCategories }))
                          }}
                          className="bg-gray-700 border-gray-600 text-white flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
                          onClick={() => {
                            const newCategories = branding.retailCategories.filter((_, i) => i !== index)
                            setBranding((prev) => ({ ...prev, retailCategories: newCategories }))
                          }}
                        >
                          🗑️
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => {
                        setBranding((prev) => ({
                          ...prev,
                          retailCategories: [...prev.retailCategories, "Nueva Categoría"],
                        }))
                      }}
                    >
                      ➕ Agregar Categoría de Tienda
                    </Button>
                  </div>
                </div>

                {/* Categorías de Mayoreo */}
                <div className="space-y-3">
                  <h5 className="text-gray-300 font-medium">Categorías de Mayoreo:</h5>
                  <div className="space-y-2">
                    {branding.wholesaleCategories.map((category, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={category}
                          onChange={(e) => {
                            const newCategories = [...branding.wholesaleCategories]
                            newCategories[index] = e.target.value
                            setBranding((prev) => ({ ...prev, wholesaleCategories: newCategories }))
                          }}
                          className="bg-gray-700 border-gray-600 text-white flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
                          onClick={() => {
                            const newCategories = branding.wholesaleCategories.filter((_, i) => i !== index)
                            setBranding((prev) => ({ ...prev, wholesaleCategories: newCategories }))
                          }}
                        >
                          🗑️
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => {
                        setBranding((prev) => ({
                          ...prev,
                          wholesaleCategories: [...prev.wholesaleCategories, "Nueva Categoría"],
                        }))
                      }}
                    >
                      ➕ Agregar Categoría de Mayoreo
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button className="flex-1 bg-green-500 hover:bg-green-600" onClick={() => setShowSettings(false)}>
                Guardar Cambios
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                onClick={() => setShowSettings(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar imagen */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-white font-bold text-lg mb-4">Cambiar imagen de {editingProduct.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subir imagen desde archivo:</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                    onClick={() => editFileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Seleccionar Archivo
                  </Button>
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="text-center text-gray-400">
                <span>- O -</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">URL de la imagen:</label>
                <Input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="text-center">
                <img
                  src={newImageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mx-auto bg-gray-700"
                />
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-green-500 hover:bg-green-600" onClick={saveImageChange}>
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                  onClick={() => {
                    setEditingProduct(null)
                    setNewImageUrl("")
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar producto */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-white font-bold text-lg mb-4">
              {currentSection === "retail" ? "Agregar Nuevo Producto" : "Agregar Producto de Mayoreo"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del producto:</label>
                <Input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder={currentSection === "retail" ? "Ej: Tamarindo con chile" : "Ej: Caja Tamarindos x50"}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Precio total (Q):</label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder={currentSection === "retail" ? "15" : "600"}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {currentSection === "wholesale" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Cantidad de unidades:</label>
                    <Input
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      placeholder="50"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Precio por unidad (Q):</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newProduct.unitPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, unitPrice: e.target.value })}
                      placeholder="12.00"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Descripción:</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Descripción del producto de mayoreo..."
                      rows={3}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 resize-none"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Categoría:</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2"
                >
                  <option value="Tamarindos">Tamarindos</option>
                  <option value="Paletas">Paletas</option>
                  <option value="Chamoy">Chamoy</option>
                  <option value="Mazapán">Mazapán</option>
                  <option value="Dulce de Leche">Dulce de Leche</option>
                  <option value="Enchilados">Enchilados</option>
                  {currentSection === "wholesale" && <option value="Mixto">Mixto</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Imagen del producto:</label>
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                    onClick={() => newProductFileInputRef.current?.click()}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Seleccionar Imagen
                  </Button>
                  <input
                    ref={newProductFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleNewProductImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="text-center text-gray-400 text-sm mb-2">
                  <span>- O -</span>
                </div>

                <Input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {newProduct.image && (
                <div className="text-center">
                  <img
                    src={newProduct.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg mx-auto bg-gray-700"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <Button className="flex-1 bg-green-500 hover:bg-green-600" onClick={addNewProduct}>
                  Agregar Producto
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                  onClick={() => {
                    setShowAddProduct(false)
                    setNewProduct({
                      name: "",
                      price: "",
                      unitPrice: "",
                      quantity: "",
                      image: "",
                      category: "Tamarindos",
                      description: "",
                    })
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Tu Carrito</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCartOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-400 mt-8">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Tu carrito está vacío</p>
                    <p className="text-sm mt-2">¡Agrega algunos dulces deliciosos!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">{item.name}</h3>
                          <p className="text-green-400 font-bold">Q{item.price}</p>
                          {item.quantity && item.unitPrice && (
                            <p className="text-xs text-gray-400">
                              {item.quantity} unidades - Q{item.unitPrice}/u
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 border-gray-600 text-gray-400 hover:text-white hover:border-red-500 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 border-gray-600 text-gray-400 hover:text-white hover:border-red-500 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 p-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-700 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total:</span>
                    <span className="text-2xl font-bold text-green-400">Q{getTotalPrice()}</span>
                  </div>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3"
                      onClick={proceedToPayment}
                    >
                      Proceder al Pago
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:text-white hover:border-red-500 bg-transparent"
                      onClick={() => setCartOpen(false)}
                    >
                      Seguir Comprando
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
