import { Heart, MapPin, Star, Clock, Navigation, Info } from 'lucide-react';
import type { Gym, SearchMode } from '@/types';
import { useReveal, staggerDelay } from '@/hooks/useReveal';

interface GymCardProps {
  gym: Gym;
  mode: SearchMode;
  index: number;
  isSelected: boolean;
  isSaved: boolean;
  onSave: (id: number) => void;
  onClick: (id: number) => void;
}

export default function GymCard({ gym, mode, index, isSelected, isSaved, onSave, onClick }: GymCardProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`card-reveal card-3d group rounded-2xl border p-4 cursor-pointer ${
        isSelected
          ? 'border-accent bg-accent/5 shadow-3d'
          : 'border-canvas-border bg-white shadow-3d-sm hover:border-accent/40 hover:shadow-3d'
      }`}
      style={{ transitionDelay: `${staggerDelay(index)}ms` }}
      onClick={() => onClick(gym.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-ink">{gym.name}</h3>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
            <MapPin className="h-3 w-3 shrink-0 text-accent" />
            <span className="truncate">{gym.area}</span>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onSave(gym.id); }}
          className="shrink-0 rounded-lg p-2 transition-colors hover:bg-canvas-elevated"
          aria-label={isSaved ? 'Unsave gym' : 'Save gym'}
        >
          <Heart className={`h-5 w-5 transition-all ${isSaved ? 'fill-error text-error' : 'text-ink-light'}`} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-sm font-semibold text-ink">{gym.rating}</span>
          <span className="text-xs text-ink-light">({gym.reviewCount})</span>
        </div>
        <div className="h-3 w-px bg-canvas-border" />
        <div className={`flex items-center gap-1 text-xs font-medium ${gym.openNow ? 'text-success' : 'text-error'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${gym.openNow ? 'bg-success' : 'bg-error'}`} />
          {gym.openNow ? 'Open now' : 'Closed'}
        </div>
        {gym.open247 && (
          <>
            <div className="h-3 w-px bg-canvas-border" />
            <span className="flex items-center gap-0.5 text-xs font-medium text-accent">
              <Clock className="h-3 w-3" /> 24/7
            </span>
          </>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        {mode === 'route' ? (
          <span className="rounded-lg bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
            +{gym.detourMin} min detour
          </span>
        ) : (
          <span className="rounded-lg bg-canvas-elevated px-2 py-1 text-xs font-semibold text-ink-soft">
            {gym.distanceKm} km away
          </span>
        )}
        <span className="rounded-lg bg-canvas-elevated px-2 py-1 text-xs font-semibold text-ink-soft">
          {gym.type}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {gym.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-canvas-elevated px-2 py-1 text-[11px] font-medium text-ink-soft">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-canvas-border pt-3">
        <div>
          <span className="text-sm font-bold text-ink">₹{gym.priceDay}</span>
          <span className="text-xs text-ink-light"> /day</span>
          <span className="ml-2 text-xs text-ink-muted">from ₹{gym.priceMonth}/mo</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 rounded-lg bg-gradient-to-br from-accent to-accent-hover px-3 py-1.5 text-xs font-semibold text-white shadow-3d-sm transition-all hover:shadow-3d"
          >
            <Navigation className="h-3.5 w-3.5" />
            Directions
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 rounded-lg border border-canvas-border px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-canvas-elevated"
          >
            <Info className="h-3.5 w-3.5" />
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
