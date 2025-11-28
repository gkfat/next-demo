/**
 * Home 頁面
 */
import { HOME_FEATURES } from '../data/mockData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Demo App',
  description: '歡迎來到我們的首頁',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto py-16 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            歡迎來到 Demo App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            提供優質產品與服務，讓您的生活更便利
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          我們的特色
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {HOME_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 dark:bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white dark:text-black mb-4">
            準備開始了嗎？
          </h2>
          <p className="text-gray-300 dark:text-gray-600 mb-8 text-lg">
            瀏覽我們的產品，找到最適合您的選擇
          </p>
          <a
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            查看產品
          </a>
        </div>
      </div>
    </div>
  );
}