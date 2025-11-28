/**
 * 導航元件
 */
import Link from 'next/link';

type NavigationProps = {
  currentPath?: string;
};

export default function Navigation({ currentPath }: NavigationProps) {
  const navItems = [
    { href: '/home', label: 'Home' },
    { href: '/products', label: '產品' },
  ];

  return (
    <nav className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Demo App
              </Link>
            </div>
            <div className="flex space-x-4 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPath === item.href
                      ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-black'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}