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

import { getUTMInfo, loadUTMInfo } from './utm'

/**
 * 獲取當前的 UTM 資訊 (優先使用 localStorage 中的資料)
 */
function getCurrentUTMData() {
  // 優先使用已儲存的 UTM 資訊，避免 URL 參數被清除後遺失
  const storedUTM = loadUTMInfo()
  if (storedUTM) {
    return {
      utm_source: storedUTM.utm_source,
      utm_medium: storedUTM.utm_medium,
      utm_campaign: storedUTM.utm_campaign,
      utm_term: storedUTM.utm_term,
      utm_content: storedUTM.utm_content,
      sessionId: storedUTM.sessionId,
      referrer: storedUTM.referrer
    }
  }
  
  // 如果沒有儲存的資訊，嘗試從當前 URL 解析
  const currentUTM = getUTMInfo()
  return {
    utm_source: currentUTM.utm_source,
    utm_medium: currentUTM.utm_medium,
    utm_campaign: currentUTM.utm_campaign,
    utm_term: currentUTM.utm_term,
    utm_content: currentUTM.utm_content,
    sessionId: currentUTM.sessionId,
    referrer: currentUTM.referrer
  }
}

/**
 * 通用事件追蹤函式 (自動附加 UTM 資訊)
 * @param eventName 事件名稱
 * @param customData 自訂資料
 */
export function trackEvent(
  eventName: string,
  customData?: Record<string, any>
) {
  const utmData = getCurrentUTMData()
  
  if (typeof window !== 'undefined' && window.umami?.track) {
    window.umami.track((props) => ({
      ...props, // 保持預設追蹤屬性
      name: eventName,
      data: {
        ...customData,
        ...utmData, // 自動附加 UTM 資訊
        timestamp: new Date().toISOString(),
      },
    }))
  } else {
    // 開發環境或 umami 未載入時的 fallback
    console.log('🔍 Analytics Event:', {
      name: eventName,
      data: { ...customData, ...utmData }
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