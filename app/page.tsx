"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, ArrowRight, ArrowLeft } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import ProductDropdown from '@/components/ProductDropdown';

const newsCardVisuals = [
  { href: '/product/bwr-352', tint: 'bg-gradient-to-br from-blue-50 via-white to-blue-100', rule: 'from-blue-400 to-blue-600', cta: 'text-blue-700' },
  { href: '/product/bwr-e01', tint: 'bg-gradient-to-br from-cyan-50 via-white to-sky-100', rule: 'from-cyan-400 to-sky-600', cta: 'text-cyan-700' },
  { href: '/product/bwc-z1', tint: 'bg-gradient-to-br from-indigo-50 via-white to-indigo-100', rule: 'from-indigo-400 to-indigo-600', cta: 'text-indigo-700' },
  { href: '/product/bwd-f1', tint: 'bg-gradient-to-br from-violet-50 via-white to-violet-100', rule: 'from-violet-400 to-violet-600', cta: 'text-violet-700' },
  { href: '/product/vpnhub', tint: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100', rule: 'from-emerald-400 to-emerald-600', cta: 'text-emerald-700' },
  { href: '/product/bw-cloud', tint: 'bg-gradient-to-br from-sky-50 via-white to-sky-100', rule: 'from-sky-400 to-sky-600', cta: 'text-sky-700' },
  { href: '/use-cases', tint: 'bg-gradient-to-br from-amber-50 via-white to-amber-100', rule: 'from-amber-400 to-amber-600', cta: 'text-amber-700' },
];

/* English cards define the shape and order; the text itself comes from the active language. */
const newsCards = translations.en.news.cards.map((card, index) => ({
  ...card,
  ...newsCardVisuals[index],
}));

const BitsWavingHomepage = () => {
  const { data: session, status } = useSession();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const newsTrackRef = useRef<HTMLDivElement | null>(null);
  const newsSectionVisible = useRef(false);
  const suppressClickUntil = useRef(0);
  const dragState = useRef<{ active: boolean; startX: number; startScrollLeft: number; moved: boolean }>({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  /* The card that sits closest to the left edge is the active one. The last card wins at the
     maximum scroll offset, which can fall short of its own offset by up to one card width. */
  const activeIndexFromScroll = useCallback(() => {
    const track = newsTrackRef.current;
    if (!track) return 0;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return 0;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) return cards.length - 1;
    let best = 0;
    let bestDistance = Infinity;
    for (let i = 0; i < cards.length; i += 1) {
      const distance = Math.abs(cards[i].offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    }
    return best;
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const track = newsTrackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const clampedIndex = Math.min(Math.max(index, 0), cards.length - 1);
    const card = cards[clampedIndex];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActiveCard(clampedIndex);
  }, []);

  /* Keep the pagination dots in sync while the user drags, scrolls or resizes. */
  useEffect(() => {
    const track = newsTrackRef.current;
    if (!track) return;
    let frame = 0;
    const syncActiveCard = () => {
      frame = 0;
      setActiveCard(activeIndexFromScroll());
    };
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncActiveCard);
    };
    track.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(handleScroll);
    observer?.observe(track);
    return () => {
      track.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [activeIndexFromScroll]);

  /* Only react to the wheel while the carousel is actually on screen. */
  useEffect(() => {
    const track = newsTrackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') {
      newsSectionVisible.current = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        newsSectionVisible.current = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.2 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  /* Translate vertical wheel input into horizontal movement, but only once the page itself
     cannot scroll further in that direction, so normal page scrolling always wins. */
  useEffect(() => {
    const track = newsTrackRef.current;
    if (!track) return;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !newsSectionVisible.current) return;
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      if (!delta) return;
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      if (maxScrollLeft <= 0) return;
      const canScrollForward = delta > 0 && track.scrollLeft < maxScrollLeft - 1;
      const canScrollBackward = delta < 0 && track.scrollLeft > 1;
      if (!canScrollForward && !canScrollBackward) return;

      const scroller = document.scrollingElement ?? document.documentElement;
      const pageScrolls = scroller.scrollHeight - scroller.clientHeight > 1;
      if (pageScrolls) {
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        const atTop = scroller.scrollTop <= 1;
        if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) return;
      }

      event.preventDefault();
      track.scrollLeft = Math.min(Math.max(track.scrollLeft + delta, 0), maxScrollLeft);
    };
    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => track.removeEventListener('wheel', handleWheel);
  }, []);

  /* Mouse drag to scroll sideways. Pointer capture is only taken once a drag really starts,
     because capturing on pointerdown would retarget the click away from the card link. */
  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const track = newsTrackRef.current;
    if (!track) return;
    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const track = newsTrackRef.current;
    if (!state.active || !track) return;
    const delta = event.clientX - state.startX;
    if (!state.moved) {
      if (Math.abs(delta) <= 6) return;
      state.moved = true;
      track.classList.add('cursor-grabbing');
      if (!track.hasPointerCapture(event.pointerId)) {
        track.setPointerCapture(event.pointerId);
      }
    }
    track.scrollLeft = state.startScrollLeft - delta;
  };

  const handleDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = newsTrackRef.current;
    const wasDragging = dragState.current.moved;
    dragState.current.active = false;
    if (track) {
      track.classList.remove('cursor-grabbing');
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
      if (wasDragging) {
        scrollToCard(activeIndexFromScroll());
        /* The click the browser fires after this drag must not open a page. A deadline is used
           instead of a boolean because the click's own pointerup also runs this handler. */
        suppressClickUntil.current = Date.now() + 900;
      }
    }
    dragState.current.moved = false;
  };

  /* Suppress the click that ends a drag, so dragging never opens a product page. */
  const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const wasDragging = dragState.current.moved || Date.now() < suppressClickUntil.current;
    dragState.current.moved = false;
    if (wasDragging) {
      event.preventDefault();
    }
  };

  const handleTrackKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollToCard(activeCard + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollToCard(activeCard - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="Bitswaving Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl text-gray-900">BITSWAVING</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">{t.nav.home}</a>
              
              {/* Product Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setProductDropdown(true)}
                onMouseLeave={() => setProductDropdown(false)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                  <span>{t.nav.product}</span>
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
                <button className="flex items-center space-x-1 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                  <span>{t.nav.support}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {supportDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link href="/support#datasheet" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">{t.support.datasheet}</Link>
                      <Link href="/support#manual" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t.support.userManual}</Link>
                      <Link href="/support#firmware" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t.support.firmware}</Link>
                      <Link href="/support#catalog" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">{t.support.catalog}</Link>
                      <Link href="/support#certificate" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">{t.support.certificates}</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/use-cases" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">{t.nav.useCases}</Link>
              <Link href="/about" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">{t.nav.aboutUs}</Link>
            </div>

            {/* Language Switcher & Login/Profile */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="flex items-center space-x-1 font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
              >
                <Globe className="w-4 h-4" />
                <span>{language.toUpperCase()}|{language === 'en' ? 'ES' : 'EN'}</span>
              </button>
              
              {status === 'loading' ? (
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              ) : session ? (
                /* Profile Dropdown */
                <div 
                  className="relative"
                  onMouseEnter={() => setProfileDropdown(true)}
                  onMouseLeave={() => setProfileDropdown(false)}
                >
                  <button className="flex items-center space-x-2">
                    {session.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-blue-500 transition">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </button>
                  
                  {profileDropdown && (
                    <div className="absolute top-full right-0 pt-2 w-48">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                        <Link 
                          href="/profile" 
                          className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg"
                        >
                          <User className="w-4 h-4" />
                          <span>{t.nav.myProfile}</span>
                        </Link>
                        <Link 
                          href="/orders" 
                          className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Package className="w-4 h-4" />
                          <span>{t.nav.myOrders}</span>
                        </Link>
                        <button 
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t.nav.logout}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Login Button */
                <Link href="/login" className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
                  {t.nav.login}
                </Link>
              )}
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
              <a href="#" className="block text-gray-700">Home</a>
              <a href="#" className="block text-gray-700">Product</a>
              <a href="#" className="block text-gray-700">Support</a>
              <a href="#" className="block text-gray-700">Use Cases</a>
              <a href="#" className="block text-gray-700">About Us</a>
              <div className="flex items-center space-x-2 py-2">
                <Globe className="w-4 h-4" />
                <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}>
                  {language.toUpperCase()}|{language === 'en' ? 'ES' : 'EN'}
                </button>
              </div>
              <button className="w-full px-4 py-2 bg-black text-white rounded-lg">
                <Link href="/login" className="block">Login</Link>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
			<div className="mt-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-blue-100 rounded-3xl py-16 text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
							Industrial Connectivity Solutions
						</h1>
						<p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
							Reliable, secure, and intelligent networking equipment for Industry 4.0
						</p>
					</div>
				</div>
			</div>

      {/* Main Content - horizontal news carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl text-gray-900">{t.news.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{t.news.scrollHint}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToCard(activeCard - 1)}
              disabled={activeCard === 0}
              aria-label={t.news.previous}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToCard(activeCard + 1)}
              disabled={activeCard === newsCards.length - 1}
              aria-label={t.news.next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* No CSS scroll snapping here: `snap-mandatory` reverts the programmatic offsets used
            while dragging. The drag, wheel, arrow and dot paths all settle on a card instead. */}
        <div
          ref={newsTrackRef}
          role="region"
          aria-label={t.news.title}
          tabIndex={0}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          onKeyDown={handleTrackKeyDown}
          className="flex gap-6 overflow-x-auto overscroll-x-contain pb-4 cursor-grab select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-3xl"
        >
          {newsCards.map((card, index) => {
            const content = t.news.cards[index] ?? card;
            return (
              <div key={card.href} className="shrink-0 basis-full md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]">
                <Link
                  href={card.href}
                  onClick={handleCardClick}
                  draggable={false}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 ${card.tint} p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.rule}`} aria-hidden="true" />
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700">
                      {content.tag}
                    </span>
                    <span className="text-sm text-gray-500">{content.date}</span>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-900">{content.title}</h3>
                  <p className="mb-6 leading-relaxed text-gray-600">{content.description}</p>
                  <span className={`mt-auto inline-flex items-center gap-1 text-sm font-semibold ${card.cta}`}>
                    {t.news.learnMore}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {newsCards.map((card, index) => (
            <button
              key={card.href}
              type="button"
              onClick={() => scrollToCard(index)}
              aria-label={`${t.news.goToCard} ${index + 1}`}
              aria-current={activeCard === index}
              className={`h-2.5 rounded-full transition-all ${activeCard === index ? 'w-6 bg-blue-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
		<div className="px-4 sm:px-6 lg:px-8 pb-8">
			<footer className="max-w-7xl mx-auto py-8 text-center">
				<p className="text-gray-500">
				© 2026 Bitswaving. All rights reserved.
				</p>
			</footer>
		</div>
    </div>
  );
};

export default BitsWavingHomepage;
