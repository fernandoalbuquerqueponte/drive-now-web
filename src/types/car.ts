export interface CarSpecification {
  label: string;
  value: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  category: string;
  image: string;
  gallery: string[];
  year: number;
  pricePerHour: number;
  description: string;
  available: boolean;
  specifications: CarSpecification[];
  features: string[];
}
