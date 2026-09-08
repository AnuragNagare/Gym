import { ArrowRight, MapPin, Route, SlidersHorizontal, Dumbbell, Search, Star } from 'lucide-react';
import type { Page } from '@/types';
import { useSectionReveal } from '@/hooks/useReveal';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const howItWorksRef = useSectionReveal<HTMLDivElement>();
  const demoRef = useSectionReveal<HTMLDivElement>();
  const socialProofRef = useSectionReveal<HTMLDivElement>('scale-reveal');
  const demoMapRef = useSectionReveal<HTMLDivElement>('slide-left-reveal');
  const demoCardsRef = useSectionReveal<HTMLDivElement>('slide-right-reveal');

  return (
    <div className="min-h-screen mesh-bg">
      {/* Nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-canvas-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light shadow-3d-sm">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-ink">Fit Path</span>
          </div>
          <button
            onClick={() => onNavigate('auth')}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent-muted"
          >
            Log in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-5">
        <div className="absolute top-20 left-[10%] h-48 w-48 rounded-full bg-gradient-to-br from-accent/20 to-accent-light/10 blur-3xl float-anim" />
        <div className="absolute top-40 right-[15%] h-40 w-40 rounded-full bg-gradient-to-br from-accent-light/20 to-accent/5 blur-3xl float-anim-delayed" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-canvas-border bg-white/60 px-4 py-1.5 shadow-3d-sm">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold text-ink-soft">Now live in Mumbai</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
            Find gyms near you—<br />
            <span className="gradient-text">and on your way</span> from A to B.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-ink-muted sm:text-lg">
            Discover gyms along your commute, with smart filters and real-time info.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => onNavigate('auth')}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-accent to-accent-hover px-6 py-3.5 text-sm font-bold text-white shadow-3d transition-all hover:shadow-3d-lg hover:-translate-y-0.5 sm:w-auto"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-canvas-border bg-white px-6 py-3.5 text-sm font-bold text-accent shadow-3d-sm transition-all hover:shadow-3d hover:-translate-y-0.5 sm:w-auto">
              List your gym
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 py-16">
        <div ref={howItWorksRef} className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">How it works</h2>
          <p className="mt-2 text-center text-sm text-ink-muted">Three steps to your next workout</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { icon: MapPin, step: '01', title: 'Choose your mode', desc: "Pick 'Near me' or set your route from A to B." },
              { icon: SlidersHorizontal, step: '02', title: 'Apply filters', desc: 'Filter by price, equipment, hours, and amenities.' },
              { icon: Dumbbell, step: '03', title: 'Pick and go', desc: 'Choose a gym from the map or cards and go train.' },
            ].map((item, i) => (
              <div
                key={item.step}
                className="card-3d group rounded-2xl border border-canvas-border bg-white p-6 shadow-3d-sm hover:shadow-3d"
                style={{ animation: `slideUp 0.5s ease-out ${i * 120}ms both` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent-light/10 transition-colors group-hover:from-accent/20 group-hover:to-accent-light/20">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <span className="text-xs font-bold text-accent/70">{item.step}</span>
                <h3 className="mt-1 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual demo */}
      <section className="px-5 py-16">
        <div ref={demoRef} className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">See it in action</h2>
          <p className="mt-2 text-center text-sm text-ink-muted">Map and cards, working together</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div ref={demoMapRef} className="perspective-1000">
              <div className="relative h-72 rounded-2xl border border-canvas-border bg-white overflow-hidden map-grid shadow-3d sm:h-96" style={{ transform: 'rotateY(-3deg) rotateX(2deg)' }}>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="35" x2="100" y2="35" stroke="#E9E5F7" strokeWidth="2" />
                  <line x1="0" y1="65" x2="100" y2="65" stroke="#E9E5F7" strokeWidth="2" />
                  <line x1="30" y1="0" x2="30" y2="100" stroke="#E9E5F7" strokeWidth="2" />
                  <line x1="65" y1="0" x2="65" y2="100" stroke="#E9E5F7" strokeWidth="2" />
                  <polyline points="10,15 25,25 40,30 55,42 68,55 80,72 90,85" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2,1" opacity="0.8" />
                  <circle cx="10" cy="15" r="2.5" fill="#7C3AED" opacity="0.9" />
                  <circle cx="90" cy="85" r="2.5" fill="#7C3AED" opacity="0.9" />
                </svg>
                {[
                  { x: 22, y: 30 }, { x: 45, y: 22 }, { x: 28, y: 45 }, { x: 55, y: 38 }, { x: 72, y: 78 },
                ].map((pin, i) => (
                  <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-3d-sm">
                      <MapPin className="h-4 w-4 text-white" fill="currentColor" />
                    </div>
                  </div>
                ))}
                <div className="absolute top-3 left-3 flex items-center gap-2 rounded-xl glass px-3 py-2 border border-canvas-border shadow-3d-sm">
                  <Route className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold text-ink-soft">Route from A to B</span>
                </div>
              </div>
            </div>

            <div ref={demoCardsRef} className="flex flex-col gap-3 perspective-1000">
              {[
                { name: 'Iron Pulse Fitness', area: 'Bandra West', rating: 4.6, detour: '+3 min' },
                { name: 'Mumbai Barbell Club', area: 'Andheri East', rating: 4.8, detour: '+4 min' },
                { name: 'FitZone 24/7', area: 'Juhu', rating: 4.2, detour: '+6 min' },
              ].map((gym, i) => (
                <div key={i} className="card-3d rounded-2xl border border-canvas-border bg-white p-4 shadow-3d-sm hover:shadow-3d" style={{ transform: `translateZ(${(3 - i) * 8}px)` }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-ink">{gym.name}</h3>
                      <p className="text-xs text-ink-light">{gym.area}</p>
                    </div>
                    <span className="rounded-lg bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">{gym.detour}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-ink-soft">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {gym.rating}
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center gap-2 py-2 text-xs text-ink-light">
                <Search className="h-3.5 w-3.5" />
                Scroll for more gyms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-5 py-16">
        <div ref={socialProofRef} className="mx-auto max-w-2xl rounded-2xl border border-canvas-border bg-gradient-to-br from-white to-canvas-elevated p-8 text-center shadow-3d">
          <div className="mb-3 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-warning text-warning" />
            ))}
          </div>
          <p className="text-lg font-semibold text-ink">Trusted by gym-goers in Mumbai, Pune, and Bangalore.</p>
          <p className="mt-2 text-sm text-ink-muted">Join thousands finding their perfect gym on the way.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-canvas-border px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-light">
              <Dumbbell className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-ink">Fit Path</span>
          </div>
          <div className="flex gap-6 text-sm text-ink-muted">
            <a href="#" className="transition-colors hover:text-accent">About</a>
            <a href="#" className="transition-colors hover:text-accent">Contact</a>
            <a href="#" className="transition-colors hover:text-accent">Privacy</a>
          </div>
          <p className="text-xs text-ink-light">© 2026 Fit Path</p>
        </div>
      </footer>
    </div>
  );
}
