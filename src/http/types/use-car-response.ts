export interface UseGetCarResponse {
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
  specifications: {
    id: string;
    label: string;
    value: string;
    carId: string;
  }[];
  CarImage: string[];
}
