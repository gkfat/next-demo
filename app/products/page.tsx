/**
 * Products 頁面
 */
import { MOCK_PRODUCTS } from '../data/mockData';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '產品列表 - Demo App',
  description: '瀏覽我們精選的產品系列',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            產品列表
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            精選優質產品，滿足您的各種需求
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="dark:invert"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
                      {product.inStock ? '有現貨' : '缺貨'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      NT$ {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </span>
                  </div>
                  
                  <button
                    disabled={!product.inStock}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      product.inStock
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? '加入購物車' : '暫時缺貨'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State or Load More */}
        {MOCK_PRODUCTS.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              目前沒有產品可顯示
            </p>
          </div>
        )}
      </div>
    </div>
  );
}