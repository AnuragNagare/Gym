import { useState, useRef, useMemo, useCallback } from 'react';
import { ArrowLeft, Dumbbell, User, MapPin, Route } from 'lucide-react';
import type { Page, SearchMode, RouteInfo } from '@/types';
import { mockGyms } from '@/data/gyms';
import MapView from '@/components/MapView';
import GymCard from '@/components/GymCard';
import FiltersBar, { type FilterState } from '@/components/FiltersBar';

interface ResultsPageProps {
  mode: SearchMode;
  route?: RouteInfo;
  onNavigate: (page: Page) => void;
}

export default function ResultsPage({ mode, route, onNavigate }: ResultsPageProps) {
  const [filters, setFilters] = useState<FilterState>({
    distance: null, price: null, hours: null, gymType: null, equipment: null, amenities: null,
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [savedGyms, setSavedGyms] = useState<Set<number>>(new Set());

  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = useCallback((category: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [category]: prev[category] === value ? null : value }));
  }, []);

  const filteredGyms = useMemo(() => {
    return mockGyms.filter((gym) => {
      if (filters.distance === '<1 km' && gym.distanceKm >= 1) return false;
      if (filters.distance === '1–3 km' && (gym.distanceKm < 1 || gym.distanceKm > 3)) return false;
      if (filters.distance === '3–5 km' && (gym.distanceKm < 3 || gym.distanceKm > 5)) return false;
      if (filters.price && gym.priceTier !== filters.price) return false;
      if (filters.hours === 'Open now' && !gym.openNow) return false;
      if (filters.hours === '24/7' && !gym.open247) return false;
      if (filters.gymType && gym.type !== filters.gymType) return false;
      if (filters.equipment && !gym.equipment.includes(filters.equipment)) return false;
      if (filters.amenities && !gym.amenities.includes(filters.amenities)) return false;
      return true;
    });
  }, [filters]);

  const handleSave = useCallback((id: number) => {
    setSavedGyms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleCardClick = useCallback((id: number) => { setSelectedId(id); }, []);

  const handlePinClick = useCallback((id: number) => {
    setSelectedId(id);
    const cardEl = cardRefs.current.get(id);
    if (cardEl) {
      cardEl.classList.remove('visible');
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      requestAnimationFrame(() => { setTimeout(() => cardEl.classList.add('visible'), 100); });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-canvas-base overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-canvas-border shrink-0 glass">
        <button
          onClick={() => onNavigate('select')}
          className="flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-light shadow-3d-sm">
            <Dumbbell className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-ink">Fit Path</span>
          {route && (
            <span className="ml-2 hidden sm:flex items-center gap-1 text-xs text-ink-muted">
              <MapPin className="h-3 w-3 text-accent" />
              {route.from}
              <Route className="h-3 w-3 mx-0.5 text-accent" />
              {route.to}
            </span>
          )}
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas-border bg-white shadow-3d-sm transition-colors hover:shadow-3d">
          <User className="h-4 w-4 text-accent" />
        </button>
      </div>

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <div className="h-[40%] md:h-full md:w-1/2 shrink-0 border-b md:border-b-0 md:border-r border-canvas-border">
          <MapView gyms={filteredGyms} mode={mode} selectedId={selectedId} onPinClick={handlePinClick} />
        </div>

        <div className="flex flex-col flex-1 md:w-1/2 h-[60%] md:h-full overflow-hidden">
          <FiltersBar filters={filters} onFilterChange={handleFilterChange} />

          <div ref={cardsContainerRef} className="flex-1 overflow-y-auto card-scroll px-4 py-3 space-y-3">
            {filteredGyms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MapPin className="h-10 w-10 text-accent/30" />
                <p className="mt-3 text-sm text-ink-muted">No gyms match your filters</p>
                <button
                  onClick={() => setFilters({ distance: null, price: null, hours: null, gymType: null, equipment: null, amenities: null })}
                  className="mt-3 rounded-lg border border-canvas-border px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-canvas-elevated"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredGyms.map((gym, index) => (
                <div
                  key={gym.id}
                  ref={(el) => { if (el) cardRefs.current.set(gym.id, el); else cardRefs.current.delete(gym.id); }}
                >
                  <GymCard gym={gym} mode={mode} index={index} isSelected={selectedId === gym.id} isSaved={savedGyms.has(gym.id)} onSave={handleSave} onClick={handleCardClick} />
                </div>
              ))
            )}
            <div className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
