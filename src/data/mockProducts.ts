import type { Product, ProductCategory } from '../types/product'

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'electronics',
    name: '電子產品',
    description: '各種電子設備和配件'
  },
  {
    id: 'clothing',
    name: '服飾',
    description: '時尚服裝和配件'
  },
  {
    id: 'books',
    name: '書籍',
    description: '各類書籍和雜誌'
  }
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 35900,
    description: '最新 iPhone，配備 A17 Pro 晶片',
    category: 'electronics',
    image: '/api/placeholder/300/200',
    inStock: true
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    price: 38900,
    description: '輕薄筆記型電腦，搭載 M2 晶片',
    category: 'electronics',
    image: '/api/placeholder/300/200',
    inStock: true
  },
  {
    id: 3,
    name: '經典白T恤',
    price: 590,
    description: '100% 純棉舒適T恤',
    category: 'clothing',
    image: '/api/placeholder/300/200',
    inStock: false
  },
  {
    id: 4,
    name: 'Vue.js 從入門到精通',
    price: 680,
    description: '最新 Vue 3 完整教學書籍',
    category: 'books',
    image: '/api/placeholder/300/200',
    inStock: true
  },
  {
    id: 5,
    name: 'AirPods Pro',
    price: 7490,
    description: '主動式降噪無線耳機',
    category: 'electronics',
    image: '/api/placeholder/300/200',
    inStock: true
  },
  {
    id: 6,
    name: '牛仔外套',
    price: 1290,
    description: '經典復古牛仔外套',
    category: 'clothing',
    image: '/api/placeholder/300/200',
    inStock: true
  }
]