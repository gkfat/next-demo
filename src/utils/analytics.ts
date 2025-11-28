/**
 * Umami 追蹤工具函式
 */

declare global {
  interface Window {
    umami: {
      track: (data: UmamiTrackData | ((props: any) => UmamiTrackData)) => void
    }
  }
}

export type UmamiTrackData = {
  name: string
  data?: Record<string, any>
  [key: string]: any
}

export type ProductTrackingData = {
  productId: number
  productName: string
  productPrice: number
  productCategory: string
  action: 'add_to_cart' | 'view_product' | 'remove_from_cart'
}

/**
 * 通用事件追蹤函式
 * @param eventName 事件名稱
 * @param customData 自訂資料
 */
export function trackEvent(
  eventName: string,
  customData?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.umami?.track) {
    window.umami.track((props) => ({
      ...props, // 保持預設追蹤屬性
      name: eventName,
      data: {
        ...customData,
        timestamp: new Date().toISOString(),
      },
    }))
  } else {
    // 開發環境或 umami 未載入時的 fallback
    console.log('🔍 Analytics Event:', {
      name: eventName,
      data: customData
    })
  }
}

/**
 * 追蹤產品相關事件
 * @param eventName 事件名稱
 * @param productData 產品資料
 * @param customData 額外自訂資料
 */
export function trackProductEvent(
  eventName: string,
  productData: ProductTrackingData,
  customData?: Record<string, any>
) {
  trackEvent(eventName, {
    ...productData,
    ...customData,
  })
}

/**
 * 追蹤加入購物車事件
 */
export function trackAddToCart(product: {
  id: number
  name: string
  price: number
  category: string
}, quantity = 1) {
  trackProductEvent('add-to-cart-button', {
    productId: product.id,
    productName: product.name,
    productPrice: product.price,
    productCategory: product.category,
    action: 'add_to_cart'
  }, {
    quantity,
    value: product.price * quantity,
    currency: 'TWD'
  })
}

/**
 * 追蹤產品瀏覽事件
 */
export function trackProductView(product: {
  id: number
  name: string
  price: number
  category: string
}) {
  trackProductEvent('product-view', {
    productId: product.id,
    productName: product.name,
    productPrice: product.price,
    productCategory: product.category,
    action: 'view_product'
  })
}