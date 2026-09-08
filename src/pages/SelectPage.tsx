import { useState } from 'react';
import { Dumbbell, User, MapPin, Route, Car, Bike, Train, Footprints, ArrowRight, ArrowLeft, X } from 'lucide-react';
import type { Page, TravelMode, RouteInfo } from '@/types';
import { useSectionReveal } from '@/hooks/useReveal';

interface SelectPageProps {
  onNavigate: (page: Page) => void;
  onSearch: (mode: 'near' | 'route', route?: RouteInfo) => void;
}

const travelModes: { mode: TravelMode; icon: typeof Car; label: string }[] = [
  { mode: 'Car', icon: Car, label: 'Car' },
  { mode: 'Bike', icon: Bike, label: 'Bike' },
  { mode: 'Metro', icon: Train, label: 'Metro' },
  { mode: 'Walk', icon: Footprints, label: 'Walk' },
];

export default function SelectPage({ onNavigate, onSearch }: SelectPageProps) {
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [travelMode, setTravelMode] = useState<TravelMode>('Car');

  const nearRef = useSectionReveal<HTMLDivElement>('slide-right-reveal');
  const routeRef = useSectionReveal<HTMLDivElement>('slide-left-reveal');

  const handleRouteSearch = () => {
    onSearch('route', { from: from || 'Home', to: to || 'Work', mode: travelMode });
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-canvas-border">
        <button
          onClick={() => onNavigate('auth')}
          className="flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-light shadow-3d-sm">
            <Dumbbell className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-ink">Fit Path</span>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas-border bg-white shadow-3d-sm transition-colors hover:shadow-3d">
          <User className="h-4 w-4 text-accent" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-5 py-8 perspective-2000">
        <div className="w-full max-w-2xl">
          <h1 className="text-center text-2xl font-bold text-ink sm:text-3xl">
            How do you want to find gyms?
          </h1>
          <p className="mt-2 text-center text-sm text-ink-muted">
            Choose a search mode to get started
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div ref={nearRef} className="card-3d group rounded-2xl border border-canvas-border bg-white p-6 shadow-3d hover:shadow-3d-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-accent-light/10 shadow-inner-glow transition-colors group-hover:from-accent/25 group-hover:to-accent-light/20">
                <MapPin className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-lg font-bold text-ink">Near me</h2>
              <p className="mt-1.5 text-sm text-ink-muted">
                Find gyms around your current location.
              </p>
              <button
                onClick={() => onSearch('near')}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-accent to-accent-hover py-3 text-sm font-bold text-white shadow-3d-sm transition-all hover:shadow-3d hover:-translate-y-0.5"
              >
                Search near me
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div ref={routeRef} className="card-3d group rounded-2xl border border-canvas-border bg-white p-6 shadow-3d hover:shadow-3d-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-accent-light/10 shadow-inner-glow transition-colors group-hover:from-accent/25 group-hover:to-accent-light/20">
                <Route className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-lg font-bold text-ink">From A to B</h2>
              <p className="mt-1.5 text-sm text-ink-muted">
                Find gyms on your way from one place to another.
              </p>
              <button
                onClick={() => setShowRouteForm(true)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-accent bg-accent/10 py-3 text-sm font-bold text-accent transition-all hover:bg-accent/20 hover:-translate-y-0.5"
              >
                Set your route
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRouteForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/20 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md rounded-t-3xl border border-canvas-border bg-white p-6 shadow-3d-lg sm:rounded-3xl animate-slide-up">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">Set your route</h2>
              <button
                onClick={() => setShowRouteForm(false)}
                className="rounded-lg p-1.5 text-ink-light transition-colors hover:bg-canvas-elevated hover:text-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-soft">From</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border-2 border-accent" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Starting point"
                    className="w-full rounded-xl bg-canvas-elevated border border-canvas-border py-3 pl-10 pr-4 text-sm text-ink placeholder-ink-light outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex justify-center -my-2">
                <div className="h-4 w-px border-l border-dashed border-canvas-muted" />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink-soft">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-accent" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Destination"
                    className="w-full rounded-xl bg-canvas-elevated border border-canvas-border py-3 pl-10 pr-4 text-sm text-ink placeholder-ink-light outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-ink-soft">Mode of travel</label>
                <div className="flex gap-2">
                  {travelModes.map((tm) => (
                    <button
                      key={tm.mode}
                      onClick={() => setTravelMode(tm.mode)}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-xl border py-2.5 transition-all ${
                        travelMode === tm.mode
                          ? 'border-accent bg-accent/10 text-accent shadow-3d-sm'
                          : 'border-canvas-border bg-canvas-elevated text-ink-muted hover:text-ink-soft'
                      }`}
                    >
                      <tm.icon className="h-5 w-5" />
                      <span className="text-[10px] font-medium">{tm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRouteSearch}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-accent to-accent-hover py-3.5 text-sm font-bold text-white shadow-3d transition-all hover:shadow-3d-lg hover:-translate-y-0.5"
              >
                Find gyms on this route
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
