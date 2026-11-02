export type Media = { src: string; alt: string };
export interface Service { id: string; slug: string; title: string; shortTitle: string; summary: string; description: string; image: Media; capabilities: string[]; }
export type ProjectCategory = 'Transformation' | 'Cabinetry' | 'Interiors' | 'Maintenance';
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  service: string;
  location: string;
  status: 'Illustrative concept';
  summary: string;
  description: string;
  scope: string[];
  image: Media;
  gallery: Media[];
  beforeAfter?: { before: Media; after: Media; note: string };
  featured?: boolean;
}
export interface ServiceOffering { id: string; title: string; description: string; benefits: string[]; image: Media; }
export interface MaterialInspiration { name: string; character: string; applications: string[]; image: Media; }
export interface Product { id: string; slug: string; title: string; category: 'Board' | 'Hardware'; summary: string; uses: string[]; image: Media; }
export interface Board extends Product { category: 'Board'; finishes: string[]; cutToSize: boolean; }

export type CatalogueCategory = 'Construction materials' | 'Boards' | 'Screws' | 'Nails' | 'Fittings' | 'Tools' | 'Accessories';
export type PriceStatus = 'verified' | 'unverified' | 'on-request';
export interface CataloguePrice { amount?: number; currency: 'ZAR'; unit?: string; status: PriceStatus; }
export interface CatalogueProduct {
  id: string;
  slug: string;
  name: string;
  category: CatalogueCategory;
  summary: string;
  description: string;
  image: Media;
  specifications: Record<string, string>;
  price: CataloguePrice;
  illustrative: boolean;
}
export type BoardMaterial = 'Melamine' | 'MDF' | 'Plywood' | 'Particleboard';
export interface SupplyBoard extends CatalogueProduct {
  category: 'Boards';
  material: BoardMaterial;
  finish: string;
  colour: string;
  thicknessMm: number;
  sheet: { lengthMm: number; widthMm: number };
}
export type DimensionUnit = 'mm' | 'cm';
export type EdgeBandSide = 'top' | 'right' | 'bottom' | 'left';
export interface CuttingPanel {
  id: string;
  length: string;
  width: string;
  quantity: string;
  unit: DimensionUnit;
  edgeBanding: EdgeBandSide[];
  notes: string;
}
export interface BoardCuttingRequest { id: string; boardId: string; panels: CuttingPanel[]; }
export type AccommodationKind = 'rental' | 'short-stay';
export type AccommodationPrice = { amount?: number; currency: 'ZAR'; period: 'month' | 'night'; verified: boolean };
export interface Accommodation {
  id: string;
  slug: string;
  kind: AccommodationKind;
  title: string;
  location: string;
  propertyType: 'Apartment' | 'Townhouse' | 'House' | 'Guest suite';
  summary: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests?: number;
  price: AccommodationPrice;
  amenities: string[];
  specifications: Record<string, string>;
  images: Media[];
  illustrative: boolean;
  availability?: string;
  deposit?: string;
  leaseTerm?: string;
  houseRules?: string[];
}
/** @deprecated Use Accommodation. Kept while older integrations migrate. */
export interface Property { id: string; slug: string; title: string; location: string; stayType: 'Rental' | 'Short stay'; summary: string; amenities: string[]; image: Media; }
