/**
 * Tracking Events 枚舉定義
 * 統一管理所有追蹤事件名稱
 */

// 導覽列相關事件
export enum NavigationEvents {
  LOGO_CLICK = 'navigation-logo-click',
  HOME_CLICK = 'navigation-home-click',
  PRODUCTS_CLICK = 'navigation-products-click',
  SEARCH_OPEN = 'navigation-search-open',
  SEARCH_PERFORM = 'navigation-search-perform',
  CART_OPEN = 'navigation-cart-open',
  USER_MENU_OPEN = 'navigation-user-menu-open',
  MOBILE_MENU_OPEN = 'navigation-mobile-menu-open',
}

// 購物車相關事件
export enum CartEvents {
  ADD_TO_CART = 'add-to-cart-button',
  CART_CLEAR = 'cart-clear-button',
  CART_CHECKOUT = 'cart-checkout-button',
  CART_VIEW_ITEMS = 'cart-view-items',
}

// 付費頁面事件
export enum PaymentEvents {
  PAYMENT_METHOD_SELECT = 'payment-method-select',
  PAYMENT_SUBMIT = 'payment-submit-button',
  PAYMENT_BACK = 'payment-back-button',
  PAYMENT_SUCCESS = 'payment-success',
  PAYMENT_FAILED = 'payment-failed',
}

// Campaign 活動頁面事件
export enum CampaignEvents {
  CAMPAIGN_HERO_CTA = 'campaign-hero-cta-button',
  CAMPAIGN_PRODUCT_BUY = 'campaign-product-buy-button',
  CAMPAIGN_VIEW_ALL_PRODUCTS = 'campaign-view-all-products-button',
  CAMPAIGN_FINAL_CTA = 'campaign-final-cta-button',
  CAMPAIGN_COUNTDOWN_VIEW = 'campaign-countdown-view',
}

// 首頁事件
export enum HomeEvents {
  HOME_HERO_CTA = 'home-hero-cta-button',
  HOME_FEATURE_VIEW = 'home-feature-view',
}

// 產品頁面事件
export enum ProductEvents {
  PRODUCT_FILTER = 'product-filter-change',
  PRODUCT_VIEW = 'product-view',
  PRODUCT_ADD_TO_CART = 'product-add-to-cart',
}

// 通用事件類型
export type TrackingEventData = {
  eventName: string
  customData?: Record<string, any>
}