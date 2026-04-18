import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReactToPrint } from "react-to-print";
import {
  ShieldCheck,
  ChevronRight,
  Camera,
  Layers,
  Zap,
  CheckCircle2,
  Truck,
  CreditCard,
  ArrowLeft,
  Download,
  Calendar,
  Activity,
  Cpu,
  BarChart3,
  PhoneCall,
  Bolt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ServiceId } from "../App";
import ProfessionalInvoice from "./ProfessionalInvoice";

const PHONE = "254700000000";
const BRAND = "UjenziHub";

const SERVICES = [
  {
    id: "gypsum",
    title: "Gypsum Ceiling Installation",
    description: "Precision bulkheads, light troughs and partition systems — fire-rated and LED-ready.",
    icon: <Layers className="w-7 h-7" />,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/gypsum-details-tech-b693ab39-1776526266605.webp",
    basePrice: 1500,
    unit: "sq metre",
    boqItems: (qty: number) => [
      { description: "9mm Moisture-Resistant Gypsum Boards", quantity: `${qty} m²`, unitPrice: 650, total: qty * 650 },
      { description: "Galvanized Steel Framework (0.5mm)", quantity: "1 Unit", unitPrice: qty * 150, total: qty * 150 },
      { description: "Structural-Grade Gypsum Cornices", quantity: `${Math.ceil(qty * 0.8)} m`, unitPrice: 200, total: Math.ceil(qty * 0.8) * 200 },
      { description: "Joint Filler & Reinforcement Fibre", quantity: "1 Lot", unitPrice: qty * 100, total: qty * 100 },
      { description: "Specialist Installation & Leveling", quantity: `${qty} m²`, unitPrice: 400, total: qty * 400 },
    ]
  },
  {
    id: "cctv",
    title: "CCTV Security System",
    description: "4K AI-integrated surveillance with mobile remote access and cloud-encrypted storage.",
    icon: <Camera className="w-7 h-7" />,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/cctv-tech-hero-1-e61f17e9-1776526268225.webp",
    basePrice: 5000,
    unit: "camera",
    boqItems: (qty: number) => [
      { description: "4K Ultra-HD AI Smart IP Cameras", quantity: `${qty} Units`, unitPrice: 4500, total: qty * 4500 },
      { description: "8-Channel NVR with 2TB Storage Drive", quantity: "1 Unit", unitPrice: 15000, total: 15000 },
      { description: "Shielded Cat6 Cabling & Connectors", quantity: "1 Lot", unitPrice: qty * 800, total: qty * 800 },
      { description: "PoE Managed Switch & Power Unit", quantity: "1 Unit", unitPrice: 7500, total: 7500 },
      { description: "AI Calibration & Mobile App Setup", quantity: "1 Service", unitPrice: 5000, total: 5000 },
      { description: "Professional Mounting & Alignment", quantity: `${qty} Units`, unitPrice: 1200, total: qty * 1200 },
    ]
  },
  {
    id: "electrical",
    title: "Electrical Installation",
    description: "Licensed electricians for DB boards, power outlets, smart wiring and LED lighting systems.",
    icon: <Bolt className="w-7 h-7" />,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/af00f8d7-c6a3-482d-90dd-f6b5bde092b6/pro-technician-tech-963638c3-1776526267308.webp",
    basePrice: 2500,
    unit: "point",
    boqItems: (qty: number) => [
      { description: "Power Points & Socket Installation", quantity: `${qty} Points`, unitPrice: 850, total: qty * 850 },
      { description: "Distribution Board (DB) Supply & Wiring", quantity: "1 Unit", unitPrice: qty * 200, total: qty * 200 },
      { description: "3-Core Copper Wiring (2.5mm²)", quantity: `${Math.ceil(qty * 3)} m`, unitPrice: 120, total: Math.ceil(qty * 3) * 120 },
      { description: "Circuit Breakers & Safety Switches", quantity: `${Math.ceil(qty / 4)} Units`, unitPrice: 1800, total: Math.ceil(qty / 4) * 1800 },
      { description: "Earthing & Surge Protection System", quantity: "1 Lot", unitPrice: qty * 150, total: qty * 150 },
      { description: "Licensed Electrician Labour & Certification", quantity: `${qty} Points`, unitPrice: 600, total: qty * 600 },
    ]
  }
];

interface ServiceFlowProps {
  initialServiceId: ServiceId | null;
  onBack: () => void;
}

export default function ServiceFlow({ initialServiceId, onBack }: ServiceFlowProps) {
  const [step, setStep] = useState<"services" | "quotation" | "generating" | "final-quote">(
    initialServiceId ? "quotation" : "services"
  );
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(
    initialServiceId ? SERVICES.find(s => s.id === initialServiceId) || null : null
  );
  const [quantity, setQuantity] = useState(10);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const boqLines = selectedService ? selectedService.boqItems(quantity) : [];
  const subtotal = boqLines.reduce((acc, item) => acc + item.total, 0);
  const vat = subtotal * 0.16;
  const totalEstimate = subtotal + vat;
  const depositAmount = totalEstimate * 0.3;

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `UjenziHub-BOQ-${selectedService?.id.toUpperCase()}`,
  });

  const handleServiceSelect = (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    setStep("quotation");
  };

  const handleGenerateQuote = () => {
    setStep("generating");
    setTimeout(() => {
      setStep("final-quote");
      toast.success("Your Bill of Quantities is ready!");
    }, 2000);
  };

  const handleCallExpert = () => {
    window.location.href = `tel:+${PHONE}`;
  };

  const handleWhatsAppQuote = () => {
    const text = `Hello UjenziHub! I need a quote for ${selectedService?.title} — ${quantity} ${selectedService?.unit}(s). Estimated total: KES ${Math.round(totalEstimate).toLocaleString()}. Please confirm availability.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const accentStyle = { background: "#F5A623", color: "#1A2B5F" };
  const navyStyle = { background: "#1A2B5F", color: "white" };

  return (
    <div className="container px-4 py-32 md:px-6 max-w-7xl mx-auto min-h-[90vh] relative bg-white">
      <AnimatePresence mode="wait">

        {/* ── Step 1: Service Selection ── */}
        {step === "services" && (
          <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="flex flex-col items-center text-center mb-16 space-y-5">
              <Button variant="ghost" onClick={onBack} className="self-start hover:bg-slate-100 rounded-lg font-bold text-slate-500">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back Home
              </Button>
              <span className="inline-block border border-[#F5A623]/40 text-[#F5A623] bg-[#F5A623]/5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">Get a Quote</span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#1A2B5F]">
                Which service <span style={{color:"#F5A623"}}>do you need?</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl font-normal leading-relaxed">
                Select a service and we'll generate your itemised Bill of Quantities instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {SERVICES.map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden border border-slate-200 hover:border-[#F5A623] transition-all duration-300 cursor-pointer shadow-sm bg-white rounded-2xl"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="aspect-[16/9] overflow-hidden relative bg-slate-100">
                    <img src={service.image} alt={service.title} className="object-cover w-full h-full grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B5F]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="p-2 rounded-lg inline-flex" style={{background:"rgba(245,166,35,0.9)"}}>
                        <span style={{color:"#1A2B5F"}}>{service.icon}</span>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-black text-[#1A2B5F]">{service.title}</CardTitle>
                    <CardDescription className="text-slate-500 font-normal mt-1 text-sm">{service.description}</CardDescription>
                    <p className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest mt-2">From KES {service.basePrice.toLocaleString()} / {service.unit}</p>
                  </CardHeader>
                  <CardFooter className="px-6 pb-6">
                    <Button className="w-full rounded-xl h-12 font-bold border-none text-sm transition-all" style={navyStyle}
                      onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, accentStyle)}
                      onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, navyStyle)}
                    >
                      Get Quote <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Quantity Configuration ── */}
        {step === "quotation" && selectedService && (
          <motion.div key="quotation" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="max-w-5xl mx-auto">
              <Button variant="ghost" onClick={() => initialServiceId ? onBack() : setStep("services")} className="mb-10 hover:bg-slate-100 rounded-lg font-bold text-slate-500">
                <ArrowLeft className="mr-2 h-4 w-4" /> {initialServiceId ? "Back Home" : "Change Service"}
              </Button>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <Card className="lg:col-span-8 border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="p-8 border-b border-slate-100" style={{background:"linear-gradient(135deg, #1A2B5F, #0D1A3A)"}}>
                    <span className="inline-block bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">Configure Your Project</span>
                    <CardTitle className="text-2xl font-black text-white">{selectedService.title}</CardTitle>
                    <CardDescription className="text-slate-400 font-normal">Adjust the quantity to get your instant estimate.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-10">
                    <div className="space-y-5">
                      <div className="flex justify-between items-end">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Project Size</label>
                          <span className="text-5xl font-black text-[#1A2B5F]">{quantity}</span>
                          <span className="text-slate-400 ml-3 font-bold text-lg">{selectedService.unit}s</span>
                        </div>
                      </div>
                      <input
                        type="range" min="1" max="200" value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{accentColor:"#F5A623"}}
                      />
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Min: 1</span>
                        <span>Max: 200 {selectedService.unit}s</span>
                      </div>
                    </div>

                    <div className="p-7 rounded-xl border" style={{background:"#F5F7FF", borderColor:"#E0E7FF"}}>
                      <div className="flex items-center gap-2 mb-5">
                        <BarChart3 className="w-5 h-5" style={{color:"#1A2B5F"}} />
                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#1A2B5F]">Estimated Cost Breakdown</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-medium">Materials</span>
                          <span className="font-bold text-[#1A2B5F]">KES {Math.round(subtotal * 0.6).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-medium">Labour</span>
                          <span className="font-bold text-[#1A2B5F]">KES {Math.round(subtotal * 0.4).toLocaleString()}</span>
                        </div>
                        <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtotal (excl. VAT)</span>
                          <span className="text-3xl font-black text-[#1A2B5F]">KES {subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 border-t border-slate-100">
                    <Button className="w-full h-14 text-base font-bold rounded-xl border-none transition-all" style={accentStyle}
                      onClick={handleGenerateQuote}
                    >
                      <Zap className="mr-2 h-5 w-5" /> Generate Full BOQ
                    </Button>
                  </CardFooter>
                </Card>

                <div className="lg:col-span-4 space-y-5">
                  <div className="bg-white border border-slate-200 rounded-2xl p-7 space-y-5 shadow-sm">
                    <CheckCircle2 className="w-7 h-7" style={{color:"#F5A623"}} />
                    <div>
                      <h4 className="text-base font-black text-[#1A2B5F] mb-1">UjenziHub Guarantee</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-normal">Certified specialists, ISO-grade materials, nationwide coverage.</p>
                    </div>
                    <ul className="space-y-3">
                      {["National Price Index Sync", "12-Month Workmanship Guarantee", "VAT-Compliant Invoice"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{color:"#F5A623"}} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl p-7 text-white" style={{background:"linear-gradient(135deg, #1A2B5F, #0D1A3A)"}}>
                    <PhoneCall className="w-6 h-6 mb-4" style={{color:"#F5A623"}} />
                    <h4 className="text-sm font-bold mb-2">Talk to an Expert</h4>
                    <p className="text-slate-400 mb-5 text-sm font-normal leading-relaxed">Need advice before generating your quote? Call our project team.</p>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl h-11 font-bold transition-all" onClick={handleCallExpert}>
                      <PhoneCall className="mr-2 w-4 h-4" /> Call Us Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Generating ── */}
        {step === "generating" && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
              <motion.div
                className="absolute inset-0 border-4 border-t-transparent rounded-full"
                style={{borderColor:"#F5A623", borderTopColor:"transparent"}}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-1">
                <Activity className="w-8 h-8" style={{color:"#1A2B5F"}} />
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Building</span>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-black text-[#1A2B5F] tracking-tight">Generating Your BOQ</h2>
              <p className="text-slate-400 text-lg">Syncing with Kenya national price indices...</p>
            </div>
          </motion.div>
        )}

        {/* ── Step 4: Final Quote ── */}
        {step === "final-quote" && selectedService && (
          <motion.div key="final-quote" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <Button variant="ghost" onClick={() => setStep("quotation")} className="hover:bg-slate-100 rounded-lg font-bold text-slate-500">
                <ArrowLeft className="mr-2 h-4 w-4" /> Adjust Parameters
              </Button>
              <div className="flex items-center gap-4">
                <Badge className="bg-emerald-600 text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[9px] border-none">✓ Verified Estimate</Badge>
                <span className="text-slate-400 font-bold text-[10px] flex items-center gap-2 uppercase tracking-widest">
                  <Calendar className="w-3 h-3" /> Valid for 14 Days
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="text-white p-8" style={{background:"linear-gradient(135deg, #1A2B5F, #0D1A3A)"}}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-black">Bill of Quantities</CardTitle>
                        <CardDescription className="text-slate-400">{selectedService.title} — {quantity} {selectedService.unit}s</CardDescription>
                      </div>
                      <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">UjenziHub</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {boqLines.map((item, idx) => (
                        <div key={idx} className="p-6 flex justify-between items-start group hover:bg-slate-50 transition-colors">
                          <div className="space-y-1">
                            <p className="font-bold text-[#1A2B5F] leading-tight group-hover:text-[#F5A623] transition-colors text-sm">{item.description}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-black text-[#1A2B5F] text-sm shrink-0 ml-4">KES {item.total.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-8 bg-slate-50 border-t border-slate-100">
                      <div className="flex justify-between items-center mb-2 text-slate-500 text-sm font-bold">
                        <span>Subtotal</span><span>KES {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-5 text-slate-500 text-sm font-bold">
                        <span>VAT 16%</span><span>KES {Math.round(vat).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                        <span className="text-xl font-black text-[#1A2B5F]">Grand Total</span>
                        <span className="text-3xl font-black" style={{color:"#F5A623"}}>KES {Math.round(totalEstimate).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="rounded-2xl p-7 border border-emerald-100 flex flex-col md:flex-row items-center gap-6 bg-emerald-50">
                  <div className="w-14 h-14 bg-white border border-emerald-200 rounded-xl shadow-sm flex items-center justify-center text-emerald-600 shrink-0">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-950">30% Deposit to Confirm</h4>
                    <p className="text-slate-600 text-sm font-normal leading-relaxed mt-1">
                      Pay <span className="font-black text-emerald-700">KES {Math.round(depositAmount).toLocaleString()}</span> to secure your installation date and begin material procurement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-5">
                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white p-7 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-[#1A2B5F]">Book This Project</h3>
                    <p className="text-sm text-slate-500 font-normal leading-relaxed">Send your BOQ to our team and confirm your installation date.</p>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full h-13 font-bold rounded-xl border-none text-sm" style={accentStyle} onClick={handleWhatsAppQuote}>
                      <Zap className="mr-2 h-4 w-4" /> Send via WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full h-13 font-bold rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-sm" onClick={() => handlePrint()}>
                      <Download className="mr-2 h-4 w-4" /> Download PDF Invoice
                    </Button>
                  </div>
                  <div className="pt-5 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Truck className="w-4 h-4 shrink-0" style={{color:"#F5A623"}} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Installation within 24–48 Hours</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <ShieldCheck className="w-4 h-4 shrink-0" style={{color:"#F5A623"}} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">12-Month Workmanship Guarantee</span>
                    </div>
                  </div>
                </Card>

                <div className="rounded-2xl p-7 text-white" style={{background:"linear-gradient(135deg, #1A2B5F, #0D1A3A)"}}>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4" style={{color:"#F5A623"}}>Our Track Record</h4>
                  <div className="flex -space-x-2 mb-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-[#1A2B5F] overflow-hidden bg-slate-700">
                        <img src={`https://i.pravatar.cc/100?img=${i+25}`} alt="Technician" />
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs">
                    <span className="text-white font-bold">1,200+</span> projects completed across Kenya by our certified team.
                  </p>
                </div>
              </div>
            </div>

            {/* Hidden invoice for PDF print */}
            <div className="hidden">
              <ProfessionalInvoice
                ref={invoiceRef}
                invoiceNumber={`UJH-${Math.floor(1000 + Math.random() * 9000)}`}
                date={new Date().toLocaleDateString("en-KE")}
                expiryDate={new Date(Date.now() + 14 * 86400000).toLocaleDateString("en-KE")}
                serviceTitle={selectedService.title}
                items={boqLines}
                subtotal={subtotal}
                vat={vat}
                total={totalEstimate}
                deposit={depositAmount}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}