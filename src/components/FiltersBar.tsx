import type { GymType, PriceTier } from '@/types';

export interface FilterState {
  distance: string | null;
  price: PriceTier | null;
  hours: string | null;
  gymType: GymType | null;
  equipment: string | null;
  amenities: string | null;
}

interface FiltersBarProps {
  filters: FilterState;
  onFilterChange: (category: keyof FilterState, value: string) => void;
}

const filterGroups: { label: string; key: keyof FilterState; options: string[] }[] = [
  { label: 'Distance', key: 'distance', options: ['<1 km', '1–3 km', '3–5 km'] },
  { label: 'Price', key: 'price', options: ['Budget', 'Mid', 'Premium'] },
  { label: 'Hours', key: 'hours', options: ['Open now', '24/7'] },
  { label: 'Type', key: 'gymType', options: ['Commercial', 'CrossFit', 'Martial Arts', 'Boutique'] },
  { label: 'Equipment', key: 'equipment', options: ['Squat racks', 'Platforms', 'Punching bags'] },
  { label: 'Amenities', key: 'amenities', options: ['AC', 'Showers', 'Parking'] },
];

export default function FiltersBar({ filters, onFilterChange }: FiltersBarProps) {
  return (
    <div className="sticky top-0 z-30 glass border-b border-canvas-border">
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        {filterGroups.map((group) => (
          <div key={group.key} className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-light">
              {group.label}
            </span>
            {group.options.map((option) => {
              const isActive = filters[group.key] === option;
              return (
                <button
                  key={option}
                  onClick={() => onFilterChange(group.key, option)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-br from-accent to-accent-hover text-white shadow-3d-sm'
                      : 'bg-canvas-elevated text-ink-soft hover:bg-canvas-muted/30 hover:text-ink'
                  }`}
                >
                  {option}
                </button>
              );
            })}
            <div className="mx-1 h-5 w-px bg-canvas-border" />
          </div>
        ))}
      </div>
    </div>
  );
}
