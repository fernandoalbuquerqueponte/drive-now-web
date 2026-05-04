export interface UseGetCarByIdResponse {
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
  reviews: {
    id: string;
    carId: string;
    userId: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      imageUrl: string | null;
      created_at: string;
      updated_at: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }[];
  CarImage: string[];
}
