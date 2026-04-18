import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, ShieldCheck, Truck, MessageCircle, ChevronRight, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const PHONE = "254700000000";

const PRODUCTS = [
  {
    id: 1,
    name: "UjenziHub 4-Cam CCTV Set",
    description: "4-camera 4K AI surveillance system with 2TB NVR, mobile app access and cloud backup.",
    price: 35000,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/cctv-tech-hero-1-e61f17e9-1776526268225.webp",
    category: "Security",
    rating: 4.9,
    reviews: 42
  },
  {
    id: 2,
    name: "LED Trough Lighting Kit",
    description: "High-density warm-white LED strip system for gypsum troughs, with smart dimmer controller.",
    price: 4800,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/gypsum-details-tech-b693ab39-1776526266605.webp",
    category: "Lighting",
    rating: 4.8,
    reviews: 128
  },
  {
    id: 3,
    name: "Gypsum Ceiling Pack (10 Boards)",
    description: "10 x 9mm moisture-resistant gypsum boards with steel framework for one standard room.",
    price: 12000,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/pro-technician-tech-963638c3-1776526267308.webp",
    category: "Ceiling",
    rating: 5.0,
    reviews: 15
  },
  {
    id: 4,
    name: "Smart Security Hub",
    description: "Centralised control unit for CCTV, smart lighting, and electrical management — all in one.",
    price: 15500,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/hardware-tech-grid-b4cf8e6f-1776526268934.webp",
    category: "Automation",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 5,
    name: "4K IP Security Camera",
    description: "Single 4K IP camera with AI motion detection, full-color night vision, and PoE support.",
    price: 9500,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/cctv-tech-hero-1-e61f17e9-1776526268225.webp",
    category: "Security",
    rating: 4.9,
    reviews: 31
  },
  {
    id: 6,
    name: "Recessed LED Spotlights (10-Pack)",
    description: "Energy-efficient warm-white recessed spots, compatible with all standard gypsum ceilings.",
    price: 3200,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/gypsum-details-tech-b693ab39-1776526266605.webp",
    category: "Lighting",
    rating: 4.6,
    reviews: 56
  }
];

const CATEGORIES = ["All", "Security", "Ceiling", "Lighting", "Automation"];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleBuyNow = (product: typeof PRODUCTS[0]) => {
    const text = `Hello UjenziHub! I'm interested in purchasing: ${product.name} (KES ${product.price.toLocaleString()}). Please confirm availability and delivery.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, "_blank");
    toast.success(`Enquiry sent for ${product.name}`);
  };

  return (
    <div className="pt-28 pb-32 bg-white min-h-screen">
      <div className="container px-4 md:px-6 mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block border border-[#F5A623]/40 text-[#F5A623] bg-[#F5A623]/5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4">Our Products</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[#1A2B5F] leading-[0.95] mb-5">
            Shop Our <span style={{color:"#F5A623"}}>Hardware.</span>
          </h1>
          <p className="text-lg text-slate-500 font-normal leading-relaxed">
            Premium CCTV cameras, gypsum ceiling materials, LED lighting and electrical components. Nationwide delivery across Kenya.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl h-12 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#F5A623] transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 h-12 rounded-xl text-sm font-bold border transition-all"
                style={activeCategory === cat
                  ? {background:"#1A2B5F", color:"white", borderColor:"#1A2B5F"}
                  : {background:"white", color:"#1A2B5F", borderColor:"#E2E8F0"}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-[#F5A623] hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="text-white font-bold px-3 py-1 rounded-full text-[9px] uppercase tracking-widest border-none" style={{background:"rgba(26,43,95,0.85)"}}>
                      {product.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-black" style={{color:"#F5A623"}}>
                      <Star className="w-3 h-3 fill-current" /> {product.rating}
                    </span>
                  </div>
                </div>
                <CardContent className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-[#1A2B5F] leading-snug">{product.name}</h3>
                    <p className="text-slate-500 font-normal leading-relaxed text-sm">{product.description}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{product.reviews} verified reviews</p>
                  </div>
                  <div className="pt-5 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Price</p>
                        <p className="text-2xl font-black text-[#1A2B5F]">KES {product.price.toLocaleString()}</p>
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold px-2 py-1 rounded-full text-[9px] uppercase">In Stock</Badge>
                    </div>
                    <Button
                      className="w-full h-12 font-bold rounded-xl border-none text-sm transition-all"
                      style={{background:"#1A2B5F", color:"white"}}
                      onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, {background:"#F5A623", color:"#1A2B5F"})}
                      onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, {background:"#1A2B5F", color:"white"})}
                      onClick={() => handleBuyNow(product)}
                    >
                      Order via WhatsApp
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">No products found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}

        {/* B2B / Bulk Banner */}
        <div className="mt-24 rounded-3xl p-12 md:p-20 text-white relative overflow-hidden" style={{background:"linear-gradient(135deg, #1A2B5F, #0D1A3A)"}}>
          <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 80% 50%, rgba(245,166,35,0.12) 0%, transparent 60%)"}} />
          <div className="absolute top-0 left-0 right-0 h-1" style={{background:"linear-gradient(to right, #F5A623, #FFD700, #F5A623)"}} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl space-y-4">
              <span className="inline-block bg-[#F5A623]/15 border border-[#F5A623]/30 text-[#F5A623] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">Bulk & B2B Orders</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Building Something Big?</h2>
              <p className="text-lg text-slate-400 font-normal leading-relaxed">
                Special pricing for developers, contractors and property managers ordering in bulk. We supply nationwide across all 47 counties.
              </p>
            </div>
            <Button size="lg" className="h-16 px-10 rounded-xl font-bold shrink-0 border-none text-base transition-all"
              style={{background:"#F5A623", color:"#1A2B5F"}}
              onClick={() => window.open(`https://wa.me/${PHONE}?text=Hi UjenziHub, I'm interested in bulk / B2B pricing for your products.`, "_blank")}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Get Bulk Pricing
            </Button>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: <Truck className="w-5 h-5" />, title: "Nationwide Delivery", desc: "All 47 counties covered" },
            { icon: <ShieldCheck className="w-5 h-5" />, title: "Genuine Products", desc: "Sourced from certified suppliers" },
            { icon: <MessageCircle className="w-5 h-5" />, title: "WhatsApp Support", desc: "24/7 customer assistance" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50">
              <div className="p-3 rounded-xl" style={{background:"#1A2B5F", color:"#F5A623"}}>{item.icon}</div>
              <div>
                <p className="font-bold text-[#1A2B5F] text-sm">{item.title}</p>
                <p className="text-slate-400 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;