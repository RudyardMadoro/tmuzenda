import type { Accommodation } from '@/types';

export const accommodation: Accommodation[] = [
  {
    id: 'rental-noordwyk-apartment', slug: 'noordwyk-garden-apartment', kind: 'rental', title: 'Noordwyk Garden Apartment', location: 'Noordwyk, Midrand', propertyType: 'Apartment',
    summary: 'A calm two-bedroom apartment concept close to everyday Midrand connections.',
    description: 'This illustrative record shows the information TK Muzenda Properties will provide for a longer-term rental. The photography and specifications are placeholders and must be confirmed against the actual unit before any decision is made.',
    bedrooms: 2, bathrooms: 1, price: { currency: 'ZAR', period: 'month', verified: false }, amenities: ['Secure access', 'Dedicated parking', 'Private patio', 'Fibre-ready'],
    specifications: { Furnishing: 'Unfurnished', Parking: '1 dedicated bay', Outdoor: 'Private patio', Utilities: 'Confirm on enquiry' },
    images: [
      { src: '/images/properties/serenity-tower.jpg', alt: 'Illustrative exterior for the Noordwyk apartment concept' },
      { src: '/images/properties/belgrave-penthouse.jpg', alt: 'Illustrative living area for the Noordwyk apartment concept' },
      { src: '/images/properties/floor-plan-sample.jpg', alt: 'Illustrative planning image, not the apartment floor plan' },
    ], illustrative: true,
  },
  {
    id: 'rental-midrand-townhouse', slug: 'midrand-family-townhouse', kind: 'rental', title: 'Midrand Family Townhouse', location: 'Midrand, Gauteng', propertyType: 'Townhouse',
    summary: 'An illustrative three-bedroom townhouse profile designed for practical family living.',
    description: 'A sample rental presentation using licensed template imagery while verified inventory is being prepared. Rent, deposit, lease terms and availability are intentionally shown on request.',
    bedrooms: 3, bathrooms: 2, price: { currency: 'ZAR', period: 'month', verified: false }, amenities: ['Private garden', 'Covered parking', 'Secure complex', 'Pet terms on request'],
    specifications: { Furnishing: 'Unfurnished', Parking: '2 covered bays', Outdoor: 'Private garden', Pets: 'Subject to owner approval' },
    images: [
      { src: '/images/properties/azura-villa.jpg', alt: 'Illustrative exterior for the Midrand townhouse profile' },
      { src: '/images/properties/ocean-breeze-retreat.jpg', alt: 'Illustrative interior for the Midrand townhouse profile' },
      { src: '/images/properties/floor-plan-sample.jpg', alt: 'Illustrative planning image, not the townhouse floor plan' },
    ], illustrative: true,
  },
  {
    id: 'rental-waterfall-apartment', slug: 'waterfall-worklife-apartment', kind: 'rental', title: 'Waterfall Worklife Apartment', location: 'Waterfall, Midrand', propertyType: 'Apartment',
    summary: 'A compact one-bedroom accommodation concept for a connected workweek routine.',
    description: 'This is an honest illustrative listing awaiting verified property details. It demonstrates the intended level of clarity without implying that a unit is currently available.',
    bedrooms: 1, bathrooms: 1, price: { currency: 'ZAR', period: 'month', verified: false }, amenities: ['Access control', 'Covered parking', 'Balcony', 'Fibre-ready'],
    specifications: { Furnishing: 'Confirm on enquiry', Parking: '1 covered bay', Outdoor: 'Balcony', Utilities: 'Confirm on enquiry' },
    images: [
      { src: '/images/properties/lumina-commercial.jpg', alt: 'Illustrative building exterior for the Waterfall apartment concept' },
      { src: '/images/properties/belgrave-penthouse.jpg', alt: 'Illustrative apartment interior for the Waterfall concept' },
    ], illustrative: true,
  },
  {
    id: 'stay-midrand-suite', slug: 'midrand-city-suite', kind: 'short-stay', title: 'Midrand City Suite', location: 'Midrand, Gauteng', propertyType: 'Guest suite',
    summary: 'A welcoming illustrative base for work trips, family visits and short Midrand stays.',
    description: 'This guest-suite profile uses illustrative photography and does not represent live inventory. Send preferred dates and guest details for a human response with verified options and terms.',
    bedrooms: 1, bathrooms: 1, maxGuests: 2, price: { currency: 'ZAR', period: 'night', verified: false }, amenities: ['Wi-Fi', 'Furnished', 'Secure access', 'Workspace', 'Kitchenette'],
    specifications: { Bed: '1 queen bed', Kitchen: 'Kitchenette', Access: 'Private entrance', Cleaning: 'Terms confirmed on enquiry' },
    houseRules: ['No parties or events', 'No smoking indoors', 'Guest names required before arrival', 'Quiet hours confirmed with the host'],
    images: [
      { src: '/images/properties/belgrave-penthouse.jpg', alt: 'Illustrative interior for the Midrand City Suite profile' },
      { src: '/images/properties/mountain-lodge.jpg', alt: 'Illustrative bedroom for the Midrand City Suite profile' },
      { src: '/images/properties/island-retreat.jpg', alt: 'Illustrative guest room detail for the Midrand City Suite profile' },
    ], illustrative: true,
  },
  {
    id: 'stay-noordwyk-retreat', slug: 'noordwyk-weekend-retreat', kind: 'short-stay', title: 'Noordwyk Weekend Retreat', location: 'Noordwyk, Midrand', propertyType: 'Apartment',
    summary: 'An illustrative two-bedroom stay for small families or colleagues travelling together.',
    description: 'A sample short-stay record designed to make occupancy, amenities and enquiry expectations clear. Dates are requested, not reserved, until the team responds directly.',
    bedrooms: 2, bathrooms: 1, maxGuests: 4, price: { currency: 'ZAR', period: 'night', verified: false }, amenities: ['Wi-Fi', 'Furnished', 'Kitchen', 'Secure parking', 'Lounge'],
    specifications: { Beds: 'Illustrative: 2 beds', Kitchen: 'Full kitchen', Parking: '1 secure bay', Access: 'Confirm on enquiry' },
    houseRules: ['No parties or events', 'No smoking indoors', 'Maximum occupancy applies', 'Check-in details confirmed directly'],
    images: [
      { src: '/images/properties/comporta-beach-house.jpg', alt: 'Illustrative accommodation for the Noordwyk retreat profile' },
      { src: '/images/properties/ocean-breeze-retreat.jpg', alt: 'Illustrative living area for the Noordwyk retreat profile' },
      { src: '/images/properties/mountain-lodge.jpg', alt: 'Illustrative bedroom for the Noordwyk retreat profile' },
    ], illustrative: true,
  },
  {
    id: 'stay-waterfall-studio', slug: 'waterfall-business-studio', kind: 'short-stay', title: 'Waterfall Business Studio', location: 'Waterfall, Midrand', propertyType: 'Guest suite',
    summary: 'A streamlined illustrative studio concept for an independent business stay.',
    description: 'This placeholder profile demonstrates the planned catalogue experience. Pricing and availability remain unverified and are supplied only after a direct enquiry.',
    bedrooms: 1, bathrooms: 1, maxGuests: 2, price: { currency: 'ZAR', period: 'night', verified: false }, amenities: ['Wi-Fi', 'Workspace', 'Kitchenette', 'Secure access'],
    specifications: { Bed: '1 double bed', Workspace: 'Dedicated desk', Kitchen: 'Kitchenette', Parking: 'Confirm on enquiry' },
    houseRules: ['No parties or events', 'No smoking indoors', 'Registered guests only'],
    images: [
      { src: '/images/properties/island-retreat.jpg', alt: 'Illustrative studio for the Waterfall business stay profile' },
      { src: '/images/properties/belgrave-penthouse.jpg', alt: 'Illustrative interior for the Waterfall business stay profile' },
    ], illustrative: true,
  },
];

export const rentals = accommodation.filter((item) => item.kind === 'rental');
export const shortStays = accommodation.filter((item) => item.kind === 'short-stay');
