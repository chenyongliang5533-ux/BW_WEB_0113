"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CircleGauge,
  Code2,
  Cpu,
  Menu,
  Radio,
  ShieldCheck,
  Thermometer,
  X,
} from "lucide-react";
import ProductDropdown from "@/components/ProductDropdown";

const productViews = [
  { src: "/images/products/bwr-e01-angle.png", label: "Angled product view" },
  { src: "/images/products/bwr-e01-front.png", label: "Front and I/O view" },
];

const hardwareSpecs = [
  ["Processor", "ESP32-S3"],
  ["Memory", "512 KB SRAM, 8 MB PSRAM, 16 MB flash"],
  ["Cellular", "Lierda NT26 Series 4G Cat-1"],
  ["Wireless", "Wi-Fi 4 (802.11b/g/n), Bluetooth 5 LE / Mesh"],
  ["Ethernet", "1 x 10/100 Mbps RJ45"],
  ["Serial", "1 x RS232, 1 x RS485"],
  ["I/O", "2 x DI, 2 x AI (4-20 mA), 2 x relay (10 A / 277 VAC)"],
  ["Expansion", "USB-C programming port, Micro SD slot up to 64 GB"],
];

const environmentalSpecs = [
  ["Power input", "DC 9-36 V"],
  ["Operating current", "60 mA average @ 12 V"],
  ["Operating temperature", "-40 to 75 C"],
  ["Storage temperature", "-40 to 85 C"],
  ["Humidity", "5-95% RH, non-condensing"],
  ["Protection", "IP30; ESD, EFT and surge immunity"],
  ["Dimensions", "117.5 x 73 x 27.5 mm"],
  ["Installation", "Ear-mount installation"],
];

export default function BWRE01ProductPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [activeView, setActiveView] = useState(0);

  return (
    <div className="min-h-screen bg-[#fbfcfe] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Bitswaving home">
            <img src="/images/logo.png" alt="Bitswaving" className="h-10 w-10 object-contain" />
            <span className="text-xl font-semibold tracking-tight">BITSWAVING</span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">Home</Link>
            <div className="relative" onMouseEnter={() => setProductDropdown(true)} onMouseLeave={() => setProductDropdown(false)}>
              <button className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                Product <ChevronDown className="h-4 w-4" />
              </button>
              {productDropdown && <ProductDropdown show={productDropdown} />}
            </div>
            <div className="relative" onMouseEnter={() => setSupportDropdown(true)} onMouseLeave={() => setSupportDropdown(false)}>
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
                Support <ChevronDown className="h-4 w-4" />
              </button>
              {supportDropdown && (
                <div className="absolute left-0 top-full w-48 pt-2">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                    <Link href="/support#datasheet" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700">Datasheet</Link>
                    <Link href="/support#manual" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700">User Manual</Link>
                    <Link href="/support#firmware" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700">Firmware</Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/use-cases" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">Use Cases</Link>
            <Link href="/about" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">About Us</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800">Login</Link>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 md:hidden" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              <Link href="/" className="rounded-lg px-3 py-2 text-slate-700">Home</Link>
              <Link href="/product/bwr-e01" className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700">BWR_E01</Link>
              <Link href="/support" className="rounded-lg px-3 py-2 text-slate-700">Support</Link>
              <Link href="/use-cases" className="rounded-lg px-3 py-2 text-slate-700">Use Cases</Link>
              <Link href="/login" className="mt-2 rounded-lg bg-slate-950 px-3 py-2 text-center font-medium text-white">Login</Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="overflow-hidden border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <div className="mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.16em] text-blue-700">
                <span className="h-px w-10 bg-blue-600" /> INDUSTRIAL 4G CAT-1 RTU
              </div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">BWR_E01</h1>
                <span className="rounded-full border border-lime-300 bg-lime-100 px-3 py-1 text-xs font-bold tracking-wider text-lime-900">ESP32-S3</span>
              </div>
              <p className="max-w-xl text-xl leading-8 text-slate-600">Reliable edge connectivity and local control for industrial IoT.</p>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">BWR_E01 combines 4G Cat-1, Ethernet, Wi-Fi and Bluetooth in a compact RTU. Build custom acquisition, control and data-processing logic directly on the device with MicroPython.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:leon@bitswaving.com?subject=BWR_E01%20quote%20request" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Request a quote <ArrowRight className="h-4 w-4" /></a>
                <a href="#specifications" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">View specifications</a>
              </div>
            </div>

            <div className="relative rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_50%_45%,#e9f5ff_0%,#f8fbff_46%,#ffffff_76%)] p-5 shadow-[0_25px_80px_-45px_rgba(15,23,42,.45)] sm:p-8">
              <div className="absolute left-6 top-6 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">Product image</div>
              <div className="flex min-h-[320px] items-center justify-center pt-5 sm:min-h-[390px]">
                <img src={productViews[activeView].src} alt={productViews[activeView].label} className="max-h-[385px] w-full object-contain mix-blend-multiply" />
              </div>
              <div className="mt-2 flex justify-center gap-3">
                {productViews.map((view, index) => (
                  <button key={view.src} onClick={() => setActiveView(index)} className={`overflow-hidden rounded-lg border-2 bg-white p-1 transition ${activeView === index ? "border-blue-600" : "border-transparent hover:border-slate-300"}`} aria-label={`Show ${view.label}`}>
                    <img src={view.src} alt="" className="h-12 w-20 object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] text-blue-700">DESIGNED FOR THE EDGE</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">One RTU for connection, control and custom logic.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [<Radio className="h-6 w-6" key="radio" />, "Always-connected", "4G Cat-1, Ethernet, Wi-Fi and Bluetooth provide flexible connectivity for field deployments."],
              [<Code2 className="h-6 w-6" key="code" />, "MicroPython ready", "Program and run your own data acquisition, protocol handling and control workflows at the edge."],
              [<CircleGauge className="h-6 w-6" key="gauge" />, "Built for control", "2 DI, 2 AI, 2 relay outputs, RS232 and RS485 connect the RTU to real-world equipment."],
              [<ShieldCheck className="h-6 w-6" key="shield" />, "Industrial resilience", "Wide temperature operation, IP30 enclosure, plus ESD, EFT and surge immunity."],
            ].map(([icon, title, description]) => (
              <article key={String(title)} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-blue-700">{icon}</div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="specifications" className="border-y border-slate-200 bg-slate-950 py-14 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold tracking-[0.16em] text-lime-300">TECHNICAL SPECIFICATIONS</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Compact hardware. Broad interface coverage.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-400">Core specifications from the BWR_E01 Datasheet v1.0.0.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <SpecTable title="Compute & interfaces" icon={<Cpu className="h-5 w-5" />} specs={hardwareSpecs} />
              <SpecTable title="Power & environment" icon={<Thermometer className="h-5 w-5" />} specs={environmentalSpecs} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl bg-blue-600 px-7 py-10 text-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-blue-100">START YOUR DEPLOYMENT</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Need an RTU tailored to your application?</h2>
              <p className="mt-3 max-w-2xl text-blue-100">Tell us your connectivity, I/O and deployment requirements. Our team can help you select the right BWR_E01 configuration.</p>
            </div>
            <a href="mailto:leon@bitswaving.com?subject=BWR_E01%20project%20inquiry" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">Talk to us <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">© 2026 Bitswaving. All rights reserved.</footer>
    </div>
  );
}

function SpecTable({ title, icon, specs }: { title: string; icon: ReactNode; specs: string[][] }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
      <h3 className="flex items-center gap-2 border-b border-white/10 px-5 py-4 text-lg font-bold">{icon}{title}</h3>
      <dl className="divide-y divide-white/10">
        {specs.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-5 py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
            <dt className="text-sm font-medium text-slate-400">{label}</dt>
            <dd className="text-sm leading-6 text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
