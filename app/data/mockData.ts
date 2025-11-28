/**
 * Mock 資料定義
 */
import { Product, HomeFeature } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'MacBook Pro 16"',
    price: 79900,
    description: '強力效能，專業創作首選筆電',
    imageUrl: '/next.svg', // 暫用 Next.js logo
    category: '筆記型電腦',
    inStock: true,
  },
  {
    id: 'p2', 
    name: 'iPhone 15 Pro',
    price: 36900,
    description: '鈦合金材質，攝影功能全面升級',
    imageUrl: '/vercel.svg',
    category: '智慧型手機',
    inStock: true,
  },
  {
    id: 'p3',
    name: 'AirPods Pro',
    price: 7490,
    description: '主動降噪，沉浸式音效體驗',
    imageUrl: '/file.svg',
    category: '音響配件',
    inStock: false,
  },
  {
    id: 'p4',
    name: 'iPad Air',
    price: 18900,
    description: '輕薄設計，創意無限可能',
    imageUrl: '/globe.svg',
    category: '平板電腦',
    inStock: true,
  },
];

export const HOME_FEATURES: HomeFeature[] = [
  {
    id: 'f1',
    title: '快速交付',
    description: '24小時內快速處理訂單',
    icon: '🚀',
  },
  {
    id: 'f2', 
    title: '品質保證',
    description: '嚴選優質產品，品質有保障',
    icon: '✅',
  },
  {
    id: 'f3',
    title: '專業服務',
    description: '專業團隊提供完整售後服務',
    icon: '👨‍💻',
  },
];