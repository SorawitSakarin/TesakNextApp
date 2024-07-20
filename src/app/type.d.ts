export type nutritionalInfo = {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
};

export type farmerInfo = {
  fullName: string;
  lastName: string;
  location: string;
  latitude: string;
  longitude: string;
  locationMap: string;
};

export type productInfo = {
  name: string;
  ingredients: string;
  description: string;
  nutritionalInfo: nutritionalInfo;
  images: string[];
  packaging: string;
  farmer: farmerInfo;
  createdDate: string;
  farmerFirstName: string;
};
