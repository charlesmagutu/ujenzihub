import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { MessageCircle } from "lucide-react";
import LandingPage from "./components/LandingPage";
import ServiceFlow from "./components/ServiceFlow";
import ProductsPage from "./components/ProductsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export type ViewState = "landing" | "booking" | "products";
export type ServiceId = "gypsum" | "cctv" | "electrical";

export default function App() {
  const [view, setView] = useState<ViewState>("landing");
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleStartBooking = (serviceId?: ServiceId) => {
    if (serviceId) setSelectedServiceId(serviceId);
    setView("booking");
  };

  const handleBackToLanding = () => {
    setView("landing");
    setSelectedServiceId(null);
  };

  const handleGoToProducts = () => {
    setView("products");
  };

  const whatsappNumber = "254700000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello UjenziHub, I'm interested in your services.`;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#F5A623]/20 selection:text-[#1A2B5F] relative">
      <Toaster position="top-center" richColors />
      
      <Navbar 
        onGetStarted={() => handleStartBooking()} 
        onLogoClick={handleBackToLanding} 
        onProductsClick={handleGoToProducts}
        currentView={view}
      />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {view === "landing" && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LandingPage onServiceSelect={handleStartBooking} onViewProducts={handleGoToProducts} />
            </motion.div>
          )}
          
          {view === "booking" && (
            <motion.div key="booking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ServiceFlow initialServiceId={selectedServiceId} onBack={handleBackToLanding} />
            </motion.div>
          )}

          {view === "products" && (
            <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProductsPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {(view === "landing" || view === "products") && <Footer />}

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[200] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 group"
        style={{background: "#25D366"}}
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap text-sm">
          WhatsApp Us
        </span>
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}