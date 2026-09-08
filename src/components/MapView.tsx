import { MapPin, Navigation } from 'lucide-react';
import type { Gym, SearchMode } from '@/types';
import { routePath } from '@/data/gyms';

interface MapViewProps {
  gyms: Gym[];
  mode: SearchMode;
  selectedId: number | null;
  onPinClick: (id: number) => void;
}

export default function MapView({ gyms, mode, selectedId, onPinClick }: MapViewProps) {
  const routePoints = routePath.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative h-full w-full overflow-hidden bg-canvas-surface map-grid">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="0" y1="35" x2="100" y2="35" stroke="#E9E5F7" strokeWidth="2" />
        <line x1="0" y1="65" x2="100" y2="65" stroke="#E9E5F7" strokeWidth="2" />
        <line x1="30" y1="0" x2="30" y2="100" stroke="#E9E5F7" strokeWidth="2" />
        <line x1="65" y1="0" x2="65" y2="100" stroke="#E9E5F7" strokeWidth="2" />

        {mode === 'route' && (
          <>
            <polyline
              points={routePoints}
              fill="none"
              stroke="#7C3AED"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2,1"
              opacity="0.8"
            >
              <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
            </polyline>
            <circle cx={routePath[0].x} cy={routePath[0].y} r="2.5" fill="#7C3AED" opacity="0.9" />
            <circle cx={routePath[0].x} cy={routePath[0].y} r="1.2" fill="#FFFFFF" />
            <circle cx={routePath[routePath.length - 1].x} cy={routePath[routePath.length - 1].y} r="2.5" fill="#7C3AED" opacity="0.9" />
            <circle cx={routePath[routePath.length - 1].x} cy={routePath[routePath.length - 1].y} r="1.2" fill="#FFFFFF" />
          </>
        )}
      </svg>

      {mode === 'near' && (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '50%', top: '50%' }}>
          <div className="relative">
            <div className="h-4 w-4 rounded-full bg-accent ring-4 ring-accent/20 animate-pulse" />
            <div className="absolute inset-0 h-4 w-4 rounded-full bg-accent/40 animate-ping" />
          </div>
        </div>
      )}

      {gyms.map((gym) => {
        const isSelected = selectedId === gym.id;
        const isOnRoute = mode === 'route' && gym.detourMin <= 8;
        return (
          <button
            key={gym.id}
            onClick={() => onPinClick(gym.id)}
            className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 hover:scale-110 focus:outline-none z-20"
            style={{ left: `${gym.x}%`, top: `${gym.y}%` }}
            aria-label={`${gym.name}, ${gym.area}`}
          >
            <div
              className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                isSelected
                  ? 'h-9 w-9 bg-gradient-to-br from-accent to-accent-light glow scale-110'
                  : isOnRoute
                  ? 'h-8 w-8 bg-gradient-to-br from-accent to-accent-light shadow-3d-sm'
                  : 'h-7 w-7 bg-white border-2 border-accent/50 shadow-3d-sm'
              }`}
            >
              <MapPin
                className={`h-4 w-4 ${isSelected || isOnRoute ? 'text-white' : 'text-accent'}`}
                fill={isSelected || isOnRoute ? 'currentColor' : 'none'}
              />
            </div>
            {isSelected && (
              <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg glass px-2 py-1 text-[10px] font-semibold text-accent border border-canvas-border shadow-3d-sm">
                {gym.name}
              </div>
            )}
          </button>
        );
      })}

      <div className="absolute top-3 left-3 flex items-center gap-2 rounded-xl glass px-3 py-2 border border-canvas-border shadow-3d-sm">
        <Navigation className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold text-ink-soft">
          {mode === 'near' ? 'Near your location' : 'Route from A to B'}
        </span>
      </div>

      <div className="absolute bottom-3 right-3 rounded-xl glass px-3 py-1.5 border border-canvas-border shadow-3d-sm">
        <span className="text-[10px] font-semibold text-ink-muted">{gyms.length} gyms shown</span>
      </div>
    </div>
  );
}
