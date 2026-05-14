export interface Review {
  id: string;
  carId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: string;
  totalHours: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarSpecification {
  id: string;
  label: string;
  value: string;
  carId: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  pricePerHour: number;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  available: boolean;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  specifications: CarSpecification[];
  bookings: Booking[];
  CarImage: string[];
}

export type UseGetUserResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  imageUrl: string | null;
  created_at: string;
  updated_at: string;
  reviews: Review[];
  bookings: Booking[];
  cars: Car[];
};
