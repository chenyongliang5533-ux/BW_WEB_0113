"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Wifi,
  Shield,
  Zap,
  Radio,
  Droplets,
  Cable,
  Plug,
  Wrench,
  Cpu,
  CheckCircle,
  Copy,
  Check,
  Box,
  Rotate3d,
} from 'lucide-react';
import Model3DViewer from '@/components/Model3DViewer';
import ProductDropdown from '@/components/ProductDropdown';

const galleryImages = [
  {
    src: '/images/products/bwr-352-outdoor-kit.jpg',
    alt: 'BWR_352_Outdoor 190 × 190 × 42 mm ABS enclosure with four M12 glands, quick-lock power connector, waterproof junction box and Ethernet cable',
  },
  {
    src: '/images/products/bwr-352-outdoor-internal-antenna.jpg',
    alt: 'BWR_352_Outdoor enclosure open, showing the two internal 4G and Wi-Fi stub antennas fitted to the BWR_352 board',
  },
  {
    src: '/images/products/bwr-352-outdoor-external-antenna.jpg',
    alt: 'BWR_352_Outdoor enclosure open with SMA antenna feeds for external 4G and Wi-Fi antennas',
  },
  {
    src: '/images/products/bwr-352-outdoor-pole-mount.jpg',
    alt: 'BWR_352_Outdoor fixed to a pole with two stainless band clamps and its Ethernet run',
  },
];

const BWR352OutdoorProductPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeView, setActiveView] = useState<'photos' | '3d'>('photos');
  const [activeImage, setActiveImage] = useState(0);

  const contactEmail = 'leon@bitswaving.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = contactEmail;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const keyBenefits = [
    'Slim 190 × 190 × 42 mm sealed ABS enclosure, rated IPX6 for rain, hose spray and dust',
    '4 × M12 waterproof glands for DC power, Ethernet / PoE, serial and an antenna or sensor run',
    'Internal 4G and Wi-Fi stub antennas fitted as standard — nothing protrudes from the box',
    'Optional external SMA antennas for weak-signal sites, no change to the enclosure',
    'Power either way: 9–48 VDC direct, or a non-standard PoE adapter over the Ethernet cable',
    'Quick-lock waterproof connector and IP68 junction box options complete the outdoor run',
    'Drop your existing BWR_352 board straight in — same firmware, same features, no redesign',
  ];

  const features = [
    {
      icon: <Droplets className="w-6 h-6" />,
      title: 'Slim IPX6 ABS Enclosure',
      description:
        'A 190 × 190 × 42 mm UV-stabilised ABS shell with a moulded gasket protects the router board while sitting close to the wall, the mast bracket or the back of a cabinet.',
    },
    {
      icon: <Cable className="w-6 h-6" />,
      title: '4 × M12 Waterproof Glands',
      description:
        'Four M12 glands give sealed entries for DC power, the Ethernet / PoE link, an RS232/RS485 serial run and an antenna or sensor cable — each with its own seal and strain relief, so no on-site drilling.',
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: 'Internal 4G + Wi-Fi Antennas',
      description:
        'The standard build fits compact 4G and Wi-Fi stub antennas on right-angle SMA adapters inside the lid. Nothing sticks out of the enclosure, so the RF path is protected and the profile stays low.',
    },
    {
      icon: <Radio className="w-6 h-6" />,
      title: 'External SMA Option',
      description:
        'For marginal coverage, specify the external variant: SMA feeds pass through the enclosure so a higher-gain 4G or Wi-Fi antenna can be mounted and aimed outside, while the board stays sealed inside.',
    },
    {
      icon: <Plug className="w-6 h-6" />,
      title: 'DC or PoE Power',
      description:
        'Feed 9–48 VDC straight to the terminal block, or add the non-standard passive PoE adapter and power the router over the Ethernet pairs — one cable up the pole, up to 100 m.',
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Wall & Pole Mounting',
      description:
        'The bracket fixes with four corner screws for walls, cabinets and flat surfaces, or with two stainless steel band clamps for masts and poles; 4G / Wi-Fi and cable accessories bolt on without extra holes.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Same Industrial Features',
      description:
        'BWR_OS on OpenWrt 24.10, IPsec / OpenVPN / WireGuard, Modbus RTU polling, MQTT reporting and BW Cloud remote management all carry over unchanged.',
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'BWR_352 Board Inside',
      description:
        'The same Cat 4 / Cat 1 LTE board, dual SIM failover, 5 × Ethernet, RS232/RS485 and DI/DO ports — only the mechanical envelope changes.',
    },
  ];

  const antennaOptions = [
    {
      image: '/images/products/bwr-352-outdoor-internal-antenna.jpg',
      alt: 'BWR_352_Outdoor internal 4G and Wi-Fi stub antennas fitted inside the lid',
      badge: 'Standard',
      badgeClass: 'bg-blue-600 text-white',
      title: 'Internal 4G + Wi-Fi Antennas',
      points: [
        'Compact stub antennas on right-angle SMA adapters, fitted inside the lid',
        'Nothing protrudes: the box keeps its 42 mm profile and has no antenna to knock',
        'Best for street furniture, meter cabinets, basements and built-up areas',
        'No extra connector to seal, so the enclosure stays fully closed',
      ],
    },
    {
      image: '/images/products/bwr-352-outdoor-external-antenna.jpg',
      alt: 'BWR_352_Outdoor SMA feeds for external 4G and Wi-Fi antennas',
      badge: 'Option',
      badgeClass: 'bg-pink-600 text-white',
      title: 'External SMA Antennas',
      points: [
        'SMA feeds replace the internal stubs so an external antenna can be connected',
        'Fit a higher-gain 4G antenna aimed at the cell site, or a Wi-Fi antenna for long links',
        'Choose this where the router sits in a metal cabinet, a pit or a weak-signal area',
        'Antenna leads stay inside the sealed enclosure; only the antenna sits outside',
      ],
    },
  ];

  const outdoorAccessories = [
    {
      image: '/images/products/quick-lock-waterproof-connector.png',
      alt: 'Quick-lock outdoor waterproof connector with PG13.5 gland and push-in terminals',
      title: 'Quick-Lock Waterproof Connector',
      description:
        'Field-installable connector with a PG13.5 cable entry and push-in terminals: 85 ± 0.5 mm long, Ø29 mm body. Use it to break a power or RS485 run at the pole so the router can be unplugged, swapped or serviced without cutting the cable.',
      points: [
        'PG13.5 gland, 85 ± 0.5 mm body, Ø29 mm',
        'Push-in terminals — no crimping tools on site',
        'A quarter turn locks the halves; the seal stays captive',
      ],
    },
    {
      image: '/images/products/outdoor-waterproof-junction-box.png',
      alt: 'Cedgen CDE106 IP68 outdoor waterproof junction box with two M-series glands',
      title: 'Outdoor Waterproof Junction Box',
      description:
        'IP68 junction box (CDE106, 41 A / 450 V, T85) with two cable glands. It gives the DC supply or a splice a sealed home on the mast and feeds the router through one of its own M12 glands.',
      points: [
        'IP68, 41 A / 450 V, T85, RoHS and CE marked',
        'Two glands in, four screw-down lid fixings',
        'Pairs with the PoE injector or the DC power supply',
      ],
    },
  ];

  const boardSpecs = [
    { label: 'CPU', value: 'Mediatek MT7628AN: 580 MHz MIPS 24KEc' },
    { label: 'RAM', value: '128 MB DDR2' },
    { label: 'FLASH', value: '32 MB SPI FLASH' },
    { label: 'Cellular Module', value: 'Quectel CAT4/CAT1, Fibocom CAT4/CAT1 LTE module ' },
    { label: 'Ethernet Ports', value: '5 x 10/100 Mbps RJ45 ports (1 x WAN, 4 x LAN)' },
    { label: 'Serial Ports', value: '1 X RS232 + 1 X RS485' },
    { label: 'WiFi', value: '2T2R 802.11b/g/n 2.4 GHz (300 Mbps) WIFI4' },
    { label: 'Power supply range', value: '9-48 VDC, or PoE via the Ethernet cable with the PoE adapter' },
    { label: 'Digital I/O', value: '1 x Digital inputs, 1 x Digital output' },
    { label: 'OS', value: 'BWR_OS (based on OPENWRT 24.10)' },
    { label: 'Kernel version', value: 'Linux 6.6.122' },
    { label: 'Front-end frameworks', value: 'Vanilla JS SPA' },
    { label: 'Back-end frameworks', value: 'UCODE + RPCD + UBUS' },
  ];

  const enclosureSpecs = [
    { label: 'Model', value: 'BWR_352_Outdoor (BWR_352 board + 190 × 190 × 42 mm outdoor enclosure kit)' },
    { label: 'Enclosure material', value: 'ABS, UV-stabilised' },
    { label: 'Ingress protection', value: 'IPX6 (enclosure); IP68 for the optional junction box' },
    { label: 'Dimensions', value: '190 mm (L) x 190 mm (W) x 42 mm (H)' },
    { label: 'Cable entries', value: '4 x M12 waterproof glands (power, Ethernet / PoE, serial, antenna or sensor)' },
    { label: 'Antennas', value: 'Internal 4G + Wi-Fi stub antennas (standard); external SMA antennas (optional)' },
    { label: 'Power options', value: '9-48 VDC direct input, or non-standard passive PoE adapter over the Ethernet cable' },
    { label: 'Mounting', value: 'Wall / cabinet mount (4 corner screws) and pole mount with 2 stainless band clamps' },
    { label: 'Accessory options', value: 'Quick-lock outdoor waterproof connector (PG13.5, 85 ± 0.5 mm, Ø29 mm); outdoor waterproof junction box (CDE106, 41 A / 450 V, IP68)' },
  ];

  const specRow = (spec: { label: string; value: string }, idx: number) => (
    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="md:col-span-1 bg-gray-100 rounded-xl px-5 py-3 flex items-center">
        <span className="font-semibold text-gray-900">{spec.label}</span>
      </div>
      <div className="md:col-span-2 bg-blue-50 rounded-xl px-5 py-3 flex items-center">
        <span className="text-gray-700">{spec.value}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/images/logo.png"
                alt="Bitswaving Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-semibold text-gray-900">BITSWAVING</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Home</Link>

              {/* Product Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductDropdown(true)}
                onMouseLeave={() => setProductDropdown(false)}
              >
                <button className="flex items-center space-x-1 font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                  <span>Product</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {productDropdown && (
                  <ProductDropdown show={productDropdown} />
                )}
              </div>

              {/* Support Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSupportDropdown(true)}
                onMouseLeave={() => setSupportDropdown(false)}
              >
                <button className="flex items-center space-x-1 font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                  <span>Support</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {supportDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link href="/support#datasheet" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">Datasheet</Link>
                      <Link href="/support#manual" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">User Manual</Link>
                      <Link href="/support#firmware" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Firmware</Link>
                      <Link href="/support#catalog" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Catalog</Link>
                      <Link href="/support#certificate" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">Certificates</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/use-cases" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Use Cases</Link>
              <Link href="/about" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">About Us</Link>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
                className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-blue-600 transition"
              >
                <Globe className="w-4 h-4" />
                <span>{language}|{language === 'EN' ? 'ES' : 'EN'}</span>
              </button>
              <Link href="/login" className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <Link href="/" className="block text-gray-700">Home</Link>
              <Link href="/product/bwr-352" className="block text-gray-700">BWR_352</Link>
              <Link href="/product/bwr-352-outdoor" className="block text-gray-700">BWR_352_Outdoor</Link>
              <Link href="/support" className="block text-gray-700">Support</Link>
              <Link href="/use-cases" className="block text-gray-700">Use Cases</Link>
              <Link href="/about" className="block text-gray-700">About Us</Link>
              <button className="w-full px-4 py-2 bg-black text-white rounded-lg">
                <Link href="/login" className="block">Login</Link>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Industrial 4G Router</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">BWR_352_Outdoor</span>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Product media */}
          <div className="lg:col-span-3">
            <div className="relative w-full bg-gray-50 rounded-3xl overflow-hidden" style={{ minHeight: '400px' }}>
              <div className="flex items-center justify-between px-4 pt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold px-3 py-1">
                  <Droplets className="w-3.5 h-3.5" />
                  IPX6 Outdoor Kit
                </span>
                <div className="flex rounded-full bg-white border border-gray-200 p-1 shadow-sm">
                  <button
                    onClick={() => setActiveView('photos')}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      activeView === 'photos' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    Photos
                  </button>
                  <button
                    onClick={() => setActiveView('3d')}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      activeView === '3d' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Rotate3d className="w-3.5 h-3.5" />
                    3D View
                  </button>
                </div>
              </div>

              {activeView === 'photos' ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={galleryImages[activeImage].src}
                    alt={galleryImages[activeImage].alt}
                    className="w-full h-auto"
                    style={{ maxHeight: '620px', objectFit: 'contain' }}
                  />
                  <div className="flex justify-center gap-3 px-4 pb-4 pt-2">
                    {galleryImages.map((image, idx) => (
                      <button
                        key={image.src}
                        onClick={() => setActiveImage(idx)}
                        className={`h-16 w-16 overflow-hidden rounded-xl border-2 bg-white transition ${
                          activeImage === idx ? 'border-blue-600' : 'border-gray-200 hover:border-blue-300'
                        }`}
                        aria-label={image.alt}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image.src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <Model3DViewer key="bwr352-outdoor-3d" modelPath="/models/BWR352.glb" />
              )}
            </div>
            {activeView === '3d' && (
              <p className="text-xs text-gray-500 mt-3">
                The 3D model shows the BWR_352 board and housing that ships inside the BWR_352_Outdoor enclosure kit.
              </p>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">BWR_352_Outdoor</h1>
            <p className="text-base text-gray-600 mb-5">
              Outdoor IPX6 Enclosure Kit for the BWR_352 Industrial 4G Router — 190 × 190 × 42 mm ABS,
              four M12 glands, internal or external antennas
            </p>

            <div className="bg-blue-50 rounded-2xl p-6 mb-5">
              <h3 className="font-semibold text-gray-900 mb-3">Key Highlights</h3>
              <ul className="space-y-3">
                {keyBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
              <h3 className="font-semibold text-gray-900 mb-3">At a Glance</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-gray-500">Material</dt>
                  <dd className="font-semibold text-gray-900">ABS</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Waterproof</dt>
                  <dd className="font-semibold text-gray-900">IPX6</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Size (L×W×H)</dt>
                  <dd className="font-semibold text-gray-900">190 × 190 × 42 mm</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Cable glands</dt>
                  <dd className="font-semibold text-gray-900">4 × M12 waterproof</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Antennas</dt>
                  <dd className="font-semibold text-gray-900">Internal / SMA option</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Mounting</dt>
                  <dd className="font-semibold text-gray-900">Wall / pole clamp</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Power</dt>
                  <dd className="font-semibold text-gray-900">DC or PoE adapter</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Accessories</dt>
                  <dd className="font-semibold text-gray-900">Connector / junction box</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowQuoteModal(true)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
              >
                Request Quote
              </button>
              <Link
                href="/product/bwr-352"
                className="block w-full px-6 py-3 text-center bg-white border border-gray-300 text-gray-800 rounded-xl hover:bg-gray-50 transition font-medium"
              >
                See the BWR_352 board specs
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Features &amp; Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gray-50 rounded-3xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Antenna options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Antennas</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            One enclosure covers both deployment styles. The internal antenna set ships as standard; the
            external SMA version is a build option for sites where the signal has to be chased.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {antennaOptions.map((option) => (
              <div key={option.title} className="bg-gray-50 rounded-3xl overflow-hidden">
                <div className="relative aspect-[4/3] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={option.image}
                    alt={option.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: 'center 18%' }}
                  />
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${option.badgeClass}`}>
                    {option.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{option.title}</h3>
                  <ul className="space-y-2">
                    {option.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outdoor deployment / power note */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cyan-50 rounded-3xl p-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-cyan-600 mb-4">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Antennas Inside the Box</h3>
            <p className="text-gray-700 text-sm">
              The internal 4G and Wi-Fi stub antennas are fitted on the board before the lid goes on, so the
              enclosure arrives closed and sealed. Ask for the SMA version if the antenna has to sit outside.
            </p>
          </div>
          <div className="bg-pink-50 rounded-3xl p-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-600 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">PoE When DC Is Hard</h3>
            <p className="text-gray-700 text-sm">
              If there is no convenient DC outlet on site, add the non-standard PoE adapter and power the
              router through the same Ethernet cable that carries the data — one cable, one gland.
            </p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 mb-4">
              <Cable className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Four Glands, Every Cable</h3>
            <p className="text-gray-700 text-sm">
              DC power, the Ethernet / PoE link, an RS232/RS485 run and an antenna or sensor lead — four M12
              glands cover the whole installation, so nothing is left routed through an open lid.
            </p>
          </div>
        </div>

        {/* Outdoor accessories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Outdoor Cable &amp; Power Accessories</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Everything needed to finish the run outside the enclosure. Order either accessory with the kit,
            or both when the site needs a serviceable power joint and a sealed home for the supply.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outdoorAccessories.map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-3xl overflow-hidden">
                <div className="aspect-[4/3] bg-white p-6 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/product/accessories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              See all antennas, cables and mounting accessories
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Outdoor Enclosure Kit</h3>
          <div className="space-y-3 mb-10">
            {enclosureSpecs.map(specRow)}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">BWR_352 Board (supplied in the kit)</h3>
          <div className="space-y-3">
            {boardSpecs.map(specRow)}
          </div>
        </div>

        {/* Software Features */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Software Features</h2>
          <p className="text-gray-600 mb-6">
            BWR_352_Outdoor runs the same BWR_OS build as the standard BWR_352, so every routing,
            VPN, telemetry and management feature is available out of the box.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cyan-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Security</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• OpenVPN, IPsec, GRE, L2TP</li>
                <li>• WireGuard &amp; ZeroTier support</li>
                <li>• Firewall with custom rules</li>
                <li>• VLAN support</li>
                <li>• MAC filtering</li>
                <li>• DDNS support</li>
              </ul>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Networking</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Static &amp; dynamic routing</li>
                <li>• Load balancing &amp; WAN failover</li>
                <li>• QoS traffic management</li>
                <li>• DHCP server/client</li>
                <li>• Port forwarding &amp; NAT</li>
                <li>• Modbus RTU/TCP to MQTT</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Management</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• BW Cloud remote management</li>
                <li>• SMS control &amp; alerts</li>
                <li>• SNMP monitoring</li>
                <li>• Event logging</li>
                <li>• Scheduled reboot</li>
                <li>• Remote firmware update</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Request Quote Modal */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowQuoteModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Modal content */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h3>
              <p className="text-gray-600">
                Tell us about your outdoor site — we will confirm the enclosure kit, the antenna option
                (internal or SMA), the power method and whether a connector or junction box fits your run.
              </p>
            </div>

            {/* Email row with copy button */}
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between gap-3 mb-4">
              <a
                href={`mailto:${contactEmail}`}
                className="text-blue-600 font-medium hover:underline truncate"
              >
                {contactEmail}
              </a>
              <button
                onClick={handleCopyEmail}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition flex-shrink-0 ${
                  emailCopied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Copy email address"
              >
                {emailCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Please include product model (BWR_352_Outdoor), quantity, antenna option (internal / external
              SMA), power method (DC / PoE), mounting type and your application scenario in your email.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 mt-16">
        <footer className="max-w-7xl mx-auto bg-gray-100 rounded-3xl py-8 text-center">
          <p className="text-gray-600">© 2026 Bitswaving. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default BWR352OutdoorProductPage;
