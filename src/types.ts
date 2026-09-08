export type GymType = 'Commercial' | 'CrossFit' | 'Martial Arts' | 'Boutique';
export type PriceTier = 'Budget' | 'Mid' | 'Premium';
export type TravelMode = 'Car' | 'Bike' | 'Metro' | 'Walk';

export interface Gym {
  id: number;
  name: string;
  area: string;
  lat: number;
  lng: number;
  /** position on the SVG map (0-100 percent) */
  x: number;
  y: number;
  distanceKm: number;
  detourMin: number;
  rating: number;
  reviewCount: number;
  priceDay: number;
  priceMonth: number;
  priceTier: PriceTier;
  tags: string[];
  openNow: boolean;
  open247: boolean;
  type: GymType;
  equipment: string[];
  amenities: string[];
}

export type SearchMode = 'near' | 'route';

export type Page = 'landing' | 'auth' | 'select' | 'results';

export interface RouteInfo {
  from: string;
  to: string;
  mode: TravelMode;
}
