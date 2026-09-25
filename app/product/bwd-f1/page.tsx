"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Briefcase,
  ChevronDown,
  Cpu,
  Menu,
  Plug,
  Ruler,
  Signal,
  Smartphone,
  Thermometer,
  Wifi,
  X,
} from "lucide-react";
import ProductDropdown from "@/components/ProductDropdown";

const productViews = [
  { src: "/images/products/bwd-f1-front.webp", label: "Angled product view with the LED status panel" },
  { src: "/images/products/bwd-f1-usb-laptop.webp", label: "USB Type-C tethering to a laptop" },
  { src: "/images/products/bwd-f1-hand.webp", label: "Handheld size reference" },
  { src: "/images/products/bwd-f1-dimensions.webp", label: "Dimensions: 100 x 47 x 13 mm" },
];

const keyNumbers = [
  ["100 x 47 x 13 mm", "Dimensions"],
  ["Approx. 46 g", "Weight"],
  ["Max. 2500 Mbps", "5G NSA peak downlink"],
  ["Up to 16", "Wi-Fi clients"],
];

const highlights = [
  {
    icon: <Plug className="h-6 w-6" />,
    title: "Plug and play, no drivers",
    description: "Connect BWD_F1 over USB 3.2 Gen 1 Type-C and it is online immediately — no driver installation and no separate power adapter.",
  },
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "100 x 47 x 13 mm, about 46 g",
    description: "The modem and hotspot together weigh less than a phone, so travelling teams can carry their own link anywhere.",
  },
  {
    icon: <Wifi className="h-6 w-6" />,
    title: "Wi-Fi 5 for up to 16 devices",
    description: "802.11 a/b/g/n/ac on 2.4 GHz or 5 GHz with a 433 Mbps peak rate, shared by as many as 16 devices at once.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "eSIM plus nano SIM",
    description: "Switch freely between the built-in eSIM / vSIM profile and a physical nano SIM to keep local rates when crossing borders.",
  },
];

const cellularSpecs = [
  ["Cellular standard", "5G NR Sub-6, SA / NSA dual mode"],
  ["5G NR bands", "n1 / n2 / n3 / n5 / n7 / n8 / n12 / n14 / n20 / n25 / n28 / n38 / n40 / n41 / n66 / n71 / n77 / n78"],
  ["LTE bands", "B1 / B2 / B3 / B4 / B5 / B7 / B8 / B12 / B13 / B14 / B17 / B18 / B19 / B20 / B25 / B26 / B28 / B38 / B40 / B41 / B42 / B43 / B66 / B71"],
  ["Antennas", "4 x internal cellular + 1 x internal Wi-Fi"],
  ["5G SA peak rate", "1T4R 256Q — DL 2300 Mbps / UL 570 Mbps"],
  ["5G NSA peak rate", "1T4R 256Q — DL 2500 Mbps / UL 670 Mbps"],
  ["LTE peak rate", "DL 1200 Mbps / UL 100 Mbps"],
  ["SIM", "1 x nano SIM + 1 x eSIM / vSIM"],
];

const wirelessSpecs = [
  ["Wi-Fi standard", "802.11 a/b/g/n/ac (Wi-Fi 5), 2.4 GHz / 5 GHz"],
  ["Max wireless rate", "Up to 433 Mbps"],
  ["Concurrent clients", "Up to 16 devices"],
  ["USB interface", "1 x USB 3.2 Gen 1 Type-C"],
  ["Physical button", "1 x Reset"],
  ["Status indicators", "Power / VPN / Net / Wi-Fi / Signal"],
  ["Power requirement", "5 V / 2 A"],
];

const hardwareSpecs = [
  ["SoC", "Qualcomm SM4450, 4 nm octa-core"],
  ["CPU", "2 x Gold (Cortex-A78) @ 2.2 GHz + 6 x Silver (Cortex-A55) @ 1.95 GHz"],
  ["Memory", "2 GB LPDDR4X"],
  ["Storage", "16 GB eMMC"],
  ["Operating system", "Android 15"],
  ["Operating modes", "USB tethering dongle and Wi-Fi MiFi, 2-in-1"],
];

const environmentalSpecs = [
  ["Dimensions", "100 x 47 x 13 mm"],
  ["Weight", "Approx. 46 g"],
  ["Operating temperature", "0 °C to +40 °C"],
  ["Storage temperature", "-20 °C to +55 °C"],
  ["Humidity", "0-85%"],
  ["Certification", "CE / FCC / RoHS"],
];

export default function BWDF1ProductPage() {
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
              <Link href="/product/bwc-z1" className="rounded-lg px-3 py-2 text-slate-700">BWC_Z1</Link>
              <Link href="/product/bwd-f1" className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700">BWD_F1</Link>
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
                <span className="h-px w-10 bg-blue-600" /> COMMERCIAL 5G CPE
              </div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">BWD_F1</h1>
                <span className="rounded-full border border-lime-300 bg-lime-100 px-3 py-1 text-xs font-bold tracking-wider text-lime-900">DONGLE + MIFI</span>
                <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-900">Wi-Fi 5</span>
              </div>
              <p className="max-w-xl text-xl leading-8 text-slate-600">5G dongle and MiFi in one 46 g device.</p>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">BWD_F1 pairs 5G Sub-6 SA/NSA cellular access with Wi-Fi 5 in a 100 x 47 x 13 mm enclosure running Android 15. Connect it to a laptop or router over USB 3.2 Gen 1 Type-C, or share the link over Wi-Fi with up to 16 devices — for business travel, cross-border trips, outdoor live streaming and temporary networks.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:leon@bitswaving.com?subject=BWD_F1%20datasheet%20request" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Request the datasheet <ArrowRight className="h-4 w-4" /></a>
                <a href="#specifications" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">View specifications</a>
              </div>
            </div>

            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_25px_80px_-45px_rgba(15,23,42,.45)] sm:p-8">
              <div className="absolute left-6 top-6 z-10 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">Product view</div>
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-slate-50 pt-6 sm:min-h-[390px]">
                <img src={productViews[activeView].src} alt={productViews[activeView].label} className="max-h-[385px] w-full object-contain mix-blend-multiply" />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {productViews.map((view, index) => (
                  <button key={view.src} onClick={() => setActiveView(index)} className={`overflow-hidden rounded-lg border-2 bg-white p-1 transition ${activeView === index ? "border-blue-600" : "border-transparent hover:border-slate-300"}`} aria-label={`Show ${view.label}`} aria-pressed={activeView === index}>
                    <img src={view.src} alt="" className="h-12 w-20 rounded object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50">
            <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-7 sm:px-6 lg:grid-cols-4 lg:px-8">
              {keyNumbers.map(([value, label]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</dt>
                  <dd className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] text-blue-700">PRODUCT HIGHLIGHTS</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">One link that travels with your team.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-blue-700">{item.icon}</div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="specifications" className="border-y border-slate-200 bg-slate-950 py-14 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold tracking-[0.16em] text-lime-300">TECHNICAL SPECIFICATIONS</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Cellular, Wi-Fi and hardware in detail.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-400">Core specifications for the BWD_F1 5G dongle and MiFi platform.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <SpecTable title="Cellular & SIM" icon={<Signal className="h-5 w-5" />} specs={cellularSpecs} />
              <SpecTable title="Wi-Fi & interfaces" icon={<Wifi className="h-5 w-5" />} specs={wirelessSpecs} />
              <SpecTable title="Hardware & software" icon={<Cpu className="h-5 w-5" />} specs={hardwareSpecs} />
              <SpecTable title="Environment & compliance" icon={<Thermometer className="h-5 w-5" />} specs={environmentalSpecs} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] text-blue-700">HOW IT IS USED</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Dongle for one laptop, MiFi for the whole team.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [<Plug className="h-6 w-6" key="plug" />, "Plug and play over USB-C", "No driver installation: connect BWD_F1 to a laptop, tablet or router over USB 3.2 Gen 1 Type-C and the link comes up straight away."],
              [<Wifi className="h-6 w-6" key="wifi" />, "Hotspot for up to 16 devices", "Share the 5G link over Wi-Fi 5 on 2.4 GHz or 5 GHz — enough for a small team, a streaming kit or a pop-up site."],
              [<Signal className="h-6 w-6" key="signal" />, "SA / NSA with 1T4R receive", "Sub-6 5G in both SA and NSA mode, with 4 internal cellular antennas and 256Q modulation for up to 2500 Mbps downlink."],
              [<Smartphone className="h-6 w-6" key="sim" />, "eSIM and nano SIM", "Keep a local eSIM or vSIM profile for travel and a physical nano SIM as a fallback, then switch between the two."],
              [<Activity className="h-6 w-6" key="led" />, "Five-LED status panel", "Power, VPN, Net, Wi-Fi and Signal indicators show the state of the link without opening a management page."],
              [<Briefcase className="h-6 w-6" key="travel" />, "Built for mobility", "Business travel, cross-border trips, outdoor live streaming and temporary networks are the scenarios it was designed around."],
            ].map(([icon, title, description]) => (
              <article key={String(title)} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-blue-700">{icon}</div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white px-7 py-10 shadow-sm sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-blue-700">COMPLIANCE</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Certified for CE, FCC and RoHS markets.</h2>
              <p className="mt-3 max-w-2xl text-slate-600">BWD_F1 is CE, FCC and RoHS certified and covers 18 Sub-6 5G NR bands with 24 LTE bands for fallback. Ask us for the declaration of conformity, the datasheet and the mechanical drawing.</p>
            </div>
            <a href="mailto:leon@bitswaving.com?subject=BWD_F1%20certification%20and%20datasheet" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">Request the datasheet <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl bg-blue-600 px-7 py-10 text-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-blue-100">START YOUR DEPLOYMENT</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Planning a BWD_F1 rollout?</h2>
              <p className="mt-3 max-w-2xl text-blue-100">Tell us your target regions, SIM strategy and how many devices you need to connect. Our team will confirm the right BWD_F1 configuration for your deployment.</p>
            </div>
            <a href="mailto:leon@bitswaving.com?subject=BWD_F1%20project%20inquiry" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">Talk to us <ArrowRight className="h-4 w-4" /></a>
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
