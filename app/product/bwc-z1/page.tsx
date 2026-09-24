"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ChevronDown,
  Cloud,
  Cpu,
  Menu,
  Radio,
  Router,
  Shield,
  Signal,
  Smartphone,
  Thermometer,
  Wifi,
  X,
} from "lucide-react";
import ProductDropdown from "@/components/ProductDropdown";

const productViews = [
  { src: "/images/products/bwc-z1-front.webp", label: "Front view with status LEDs" },
  { src: "/images/products/bwc-z1-angle.webp", label: "Angled product view" },
  { src: "/images/products/bwc-z1-ports.webp", label: "LED and port layout" },
  { src: "/images/products/bwc-z1-sim-tray.jpg", label: "SIM tray and USB-C debug port" },
];

const highlights = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "OpenCPU 5G architecture",
    description: "The Sanechips ZX298501S runs at 2 GHz and acts as both the application CPU and the 5G modem, removing the need for a separate host processor.",
  },
  {
    icon: <Wifi className="h-6 w-6" />,
    title: "Wi-Fi 6 AX1800",
    description: "AIC8800D80X2P delivers 4x4 MIMO 802.11ax on both 5 GHz and 2.4 GHz for dense commercial client loads.",
  },
  {
    icon: <Signal className="h-6 w-6" />,
    title: "5G NR and LTE bands",
    description: "14 5G NR bands plus LTE FDD and TDD coverage, with 4x4 MIMO on N1, N41, N77 and N78 for high-throughput links.",
  },
  {
    icon: <Router className="h-6 w-6" />,
    title: "Gigabit wired LAN",
    description: "Four gigabit LAN ports plus a gigabit LAN/WAN uplink, alongside dual nano SIM for carrier flexibility and failover.",
  },
];

const cellularSpecs = [
  ["5G NR bands", "N1 / N3 / N5 / N7 / N8 / N20 / N28 / N34 / N38 / N39 / N40 / N41 / N77 / N78"],
  ["LTE FDD bands", "B1 / B3 / B5 / B7 / B8 / B20 / B28"],
  ["LTE TDD bands", "B38 / B40 / B41 / B42 / B43"],
  ["Cellular MIMO", "4x4 MIMO on N1 / N41 / N77 / N78"],
  ["5G NR peak rate", "DL 4 Gbps / UL 900 Mbps"],
  ["LTE peak rate", "DL 300 Mbps / UL 50 Mbps"],
  ["SIM", "2 x nano SIM"],
  ["Packet data", "PDP: IPv4 / IPv6 / IPv4v6"],
];

const wirelessSpecs = [
  ["Wi-Fi standard", "Wi-Fi 6 (802.11ax), AX1800"],
  ["Wi-Fi chipset", "AIC8800D80X2P"],
  ["5 GHz", "4x4 MIMO 11ax, 1.2 Gbps"],
  ["2.4 GHz", "4x4 MIMO 11ax, 0.573 Gbps"],
  ["Ethernet", "3 x 10/100/1000 Mbps LAN + 1 x LAN/WAN uplink"],
  ["Debug port", "1 x USB Type-C"],
  ["Buttons & power", "Power button, Reset, DC power jack"],
];

const hardwareSpecs = [
  ["Solution", "OpenCPU"],
  ["SoC", "Sanechips ZX298501S"],
  ["CPU clock", "2 GHz"],
  ["NAND flash", "4 Gb"],
  ["DDR", "4 Gb"],
  ["Battery (optional)", "4500 mAh built-in"],
  ["Material", "ABS"],
  ["Protection level", "IP30"],
];

const environmentalSpecs = [
  ["Dimensions", "136 x 52 x 190 mm"],
  ["Weight", "516 g"],
  ["Installation", "Vertical desktop or shelf placement"],
  ["Remote management", "BW_CLOUD"],
  ["Network features", "Port mapping and mainstream network protocols"],
  ["VPN", "WireGuard"],
];

export default function BWCZ1ProductPage() {
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
              <Link href="/product/bwc-z1" className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700">BWC_Z1</Link>
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
                <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">BWC_Z1</h1>
                <span className="rounded-full border border-lime-300 bg-lime-100 px-3 py-1 text-xs font-bold tracking-wider text-lime-900">Wi-Fi 6 AX1800</span>
                <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-900">OEM READY</span>
              </div>
              <p className="max-w-xl text-xl leading-8 text-slate-600">Commercial 5G CPE built on an OpenCPU platform.</p>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">BWC_Z1 combines the Sanechips ZX298501S 5G modem, Wi-Fi 6 AX1800 radios and five gigabit Ethernet ports in a compact vertical enclosure. As an OEM platform it is offered for rebranding, so partners can ship it under their own brand and firmware.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:leon@bitswaving.com?subject=BWC_Z1%20OEM%20enquiry" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Discuss an OEM project <ArrowRight className="h-4 w-4" /></a>
                <a href="#specifications" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">View specifications</a>
              </div>
            </div>

            <div className="relative rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_50%_45%,#e9f5ff_0%,#f8fbff_46%,#ffffff_76%)] p-5 shadow-[0_25px_80px_-45px_rgba(15,23,42,.45)] sm:p-8">
              <div className="absolute left-6 top-6 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">Product image</div>
              <div className="flex min-h-[320px] items-center justify-center pt-5 sm:min-h-[390px]">
                <img src={productViews[activeView].src} alt={productViews[activeView].label} className="max-h-[385px] w-full object-contain mix-blend-multiply" />
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
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
            <p className="text-sm font-bold tracking-[0.16em] text-blue-700">PLATFORM HIGHLIGHTS</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">One integrated platform for 5G access and Wi-Fi.</h2>
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
              <p className="max-w-sm text-sm leading-6 text-slate-400">Core specifications for the BWC_Z1 commercial 5G CPE platform.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <SpecTable title="Cellular & bands" icon={<Signal className="h-5 w-5" />} specs={cellularSpecs} />
              <SpecTable title="Wi-Fi & interfaces" icon={<Wifi className="h-5 w-5" />} specs={wirelessSpecs} />
              <SpecTable title="Hardware platform" icon={<Cpu className="h-5 w-5" />} specs={hardwareSpecs} />
              <SpecTable title="Environment & management" icon={<Thermometer className="h-5 w-5" />} specs={environmentalSpecs} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] text-blue-700">DEPLOYMENT & MANAGEMENT</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Plug and play, then managed from the cloud.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [<Radio className="h-6 w-6" key="radio" />, "Plug and Play with auto APN", "Insert a nano SIM and the CPE brings the link up on its own, negotiating APN settings without manual entry."],
              [<Cloud className="h-6 w-6" key="cloud" />, "BW_CLOUD remote management", "Register the device to BW_CLOUD for centralised monitoring and remote administration across a fleet."],
              [<Shield className="h-6 w-6" key="shield" />, "WireGuard VPN", "Build encrypted site-to-site or remote-access tunnels directly on the CPE."],
              [<Signal className="h-6 w-6" key="detail" />, "Cell tower details", "The interface reports detailed information about the base station the device is currently attached to."],
              [<Smartphone className="h-6 w-6" key="sim" />, "Dual nano SIM tray", "Two nano SIM slots sit behind the bottom cover, selectable for carrier choice or failover."],
              [<Boxes className="h-6 w-6" key="net" />, "Full network feature set", "Port mapping and support for mainstream network protocols cover typical commercial gateway duties."],
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
              <p className="text-sm font-bold tracking-[0.16em] text-blue-700">OEM & ODM</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Ship BWC_Z1 under your own brand.</h2>
              <p className="mt-3 max-w-2xl text-slate-600">BWC_Z1 is primarily offered as an OEM platform. We can adapt branding, packaging, firmware defaults, band configurations and management integration to suit your market.</p>
            </div>
            <a href="mailto:leon@bitswaving.com?subject=BWC_Z1%20OEM%20discussion" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">Start an OEM discussion <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl bg-blue-600 px-7 py-10 text-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-blue-100">START YOUR DEPLOYMENT</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Need BWC_Z1 configured for your network?</h2>
              <p className="mt-3 max-w-2xl text-blue-100">Tell us your target bands, throughput, port and management requirements. Our team will confirm the right BWC_Z1 configuration for your deployment.</p>
            </div>
            <a href="mailto:leon@bitswaving.com?subject=BWC_Z1%20project%20inquiry" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">Talk to us <ArrowRight className="h-4 w-4" /></a>
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
