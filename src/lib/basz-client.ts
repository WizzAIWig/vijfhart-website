/**
 * BASZ API Client - Vijfhart
 * 
 * Handles real-time data from BASZ Platform:
 * - Pricing & Availability
 * - Customer accounts & Strippenkaart
 * - Orders & Checkout
 */

const BASZ_API_URL = process.env.NEXT_PUBLIC_BASZ_API_URL ?? 'https://api.basz.dcg.nl/v1';

// Types
export interface CoursePrice {
  basePrice: number;
  discount: number;
  finalPrice: number;
  vat: number;
  currency: string;
}

export interface ScheduleAvailability {
  id: string;
  date: string;
  seatsAvailable: number;
  totalSeats: number;
  location: string;
  status: 'available' | 'limited' | 'full' | 'cancelled';
}

export interface CustomerBalance {
  strippenkaart: {
    balance: number;
    expiryDate: string;
  };
}

// API Functions
export async function getCoursePrice(courseId: string): Promise<CoursePrice> {
  const res = await fetch(`${BASZ_API_URL}/pricing/course/${courseId}`);
  if (!res.ok) throw new Error('Failed to fetch price');
  return res.json();
}

export async function getCourseAvailability(courseId: string): Promise<ScheduleAvailability[]> {
  const res = await fetch(`${BASZ_API_URL}/availability/course/${courseId}`);
  if (!res.ok) throw new Error('Failed to fetch availability');
  const data = await res.json();
  return data.schedules;
}

export async function getCustomerBalance(token: string): Promise<CustomerBalance> {
  const res = await fetch(`${BASZ_API_URL}/customer/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch balance');
  return res.json();
}

// Placeholder for development - returns mock data
export async function getMockPrice(): Promise<CoursePrice> {
  return {
    basePrice: 1495,
    discount: 0,
    finalPrice: 1495,
    vat: 314.95,
    currency: 'EUR',
  };
}

export async function getMockAvailability(): Promise<ScheduleAvailability[]> {
  return [
    { id: '1', date: '2026-03-15', seatsAvailable: 8, totalSeats: 12, location: 'Utrecht', status: 'available' },
    { id: '2', date: '2026-04-10', seatsAvailable: 3, totalSeats: 12, location: 'Amsterdam', status: 'limited' },
    { id: '3', date: '2026-05-05', seatsAvailable: 12, totalSeats: 12, location: 'Online', status: 'available' },
  ];
}
