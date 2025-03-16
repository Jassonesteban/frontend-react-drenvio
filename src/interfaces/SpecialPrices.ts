export interface SpecialPrice {
    _id: string;
    userId: string;
    specialPrices: {
      productId: string;
      specialPrice: number;
      _id: string;
    }[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  