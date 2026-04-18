import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { MessageCircle } from "lucide-react";
import LandingPage from "./components/LandingPage";
import ServiceFlow from "./components/ServiceFlow";
import ProductsPage from "./components/ProductsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { trackPageView } from "./analytics";

export type ViewState = "landing" | "booking" | "products";
export type ServiceId = "gypsum" | "cctv" | "electrical";

export default function App() {
  const location = useLocation(); // ✅ FIX 1

  const [view, setView] = useState<ViewState>("landing");
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId | null>(null);

  // ✅ FIX 2: GA tracking inside component
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

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
    <div className="min-h-screen bg-white font-sans relative">
      <Toaster position="top-center" richColors />

      <Navbar
        onGetStarted={() => handleStartBooking()}
        onLogoClick={handleBackToLanding}
        onProductsClick={handleGoToProducts}
        currentView={view}
      />

      <main>
        <AnimatePresence mode="wait">
          {view === "landing" && (
            <motion.div key="landing">
              <LandingPage onServiceSelect={handleStartBooking} onViewProducts={handleGoToProducts} />
            </motion.div>
          )}

          {view === "booking" && (
            <motion.div key="booking">
              <ServiceFlow initialServiceId={selectedServiceId} onBack={handleBackToLanding} />
            </motion.div>
          )}

          {view === "products" && (
            <motion.div key="products">
              <ProductsPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {(view === "landing" || view === "products") && <Footer />}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[200] text-white p-4 rounded-full shadow-2xl"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}