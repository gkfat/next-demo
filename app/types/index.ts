/**
 * 專案共用類型定義
 */

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
};

export type HomeFeature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};