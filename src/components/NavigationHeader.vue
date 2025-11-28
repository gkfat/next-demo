<template>
  <v-app-bar elevation="2" color="white" height="64">
    <!-- 手機版選單按鈕 -->
    <v-app-bar-nav-icon
      class="d-md-none"
      @click="toggleMobileMenu"
    />
    
    <!-- Logo 與標題 -->
    <div class="d-flex align-center flex-shrink-0">
      <router-link to="/" class="d-flex align-center text-decoration-none" @click="trackLogoClick">
        <v-img
          src="@/assets/logo.svg"
          alt="Logo"
          max-width="32"
          class="mr-2"
        />
        <div class="text-h5 text-primary font-weight-bold text-no-wrap">
          MyApp
        </div>
      </router-link>
    </div>

    <!-- 桌面版導航選單 -->
    <div class="d-none d-md-flex ml-8">
      <v-btn
        to="/"
        variant="text"
        class="mx-1"
        prepend-icon="mdi-home"
        @click="trackHomeClick"
      >
        首頁
      </v-btn>
      <v-btn
        to="/products"
        variant="text"
        class="mx-1"
        prepend-icon="mdi-package-variant"
        @click="trackProductsClick"
      >
        產品
      </v-btn>
    </div>

    <v-spacer />

    <!-- 搜尋按鈕 -->
    <v-btn
      icon
      @click="toggleSearchWithTracking"
      class="mr-2 d-none d-sm-flex"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- 購物車按鈕 -->
    <v-btn
      icon
      @click="openCartWithTracking"
      class="mr-2"
    >
      <v-badge
        v-if="cartCount > 0"
        :content="cartCount"
        color="error"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart</v-icon>
    </v-btn>

    <!-- 用戶選單 -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          class="d-none d-sm-flex"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>個人資料</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>訂單記錄</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item class="text-error">
          <v-list-item-title>登出</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- 搜尋列展開 -->
  <v-expand-transition>
    <v-toolbar
      v-if="showSearch"
      color="grey-lighten-4"
      elevation="0"
    >
      <v-container>
        <v-row align="center" no-gutters>
          <v-col>
            <v-text-field
              v-model="searchQuery"
              placeholder="搜尋產品..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              @keyup.enter="performSearch"
            />
          </v-col>
          <v-col cols="auto" class="ml-2">
            <v-btn
              color="primary"
              @click="performSearchWithTracking"
              :disabled="!searchQuery.trim()"
            >
              搜尋
            </v-btn>
          </v-col>
          <v-col cols="auto" class="ml-2">
            <v-btn
              icon
              @click="toggleSearch"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
  </v-expand-transition>

  <!-- 手機版導航抽屜 -->
  <v-navigation-drawer
    v-model="showMobileMenu"
    temporary
    location="left"
  >
    <v-list>
      <v-list-item
        to="/"
        prepend-icon="mdi-home"
        title="首頁"
        @click="closeMobileMenu"
      />
      <v-list-item
        to="/products"
        prepend-icon="mdi-package-variant"
        title="產品"
        @click="closeMobileMenu"
      />
      
      <v-divider class="my-2" />
      
      <v-list-item
        prepend-icon="mdi-account"
        title="個人資料"
        @click="closeMobileMenu"
      />
      <v-list-item
        prepend-icon="mdi-clipboard-list"
        title="訂單記錄"
        @click="closeMobileMenu"
      />
      <v-list-item
        prepend-icon="mdi-logout"
        title="登出"
        class="text-error"
        @click="closeMobileMenu"
      />
    </v-list>
  </v-navigation-drawer>

  <!-- 購物車對話框 -->
  <v-dialog
    v-model="showCartDialog"
    max-width="400"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>購物車</span>
        <v-btn
          icon
          size="small"
          @click="showCartDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div v-if="cartCount === 0" class="text-center py-4">
          <v-icon size="64" color="grey-lighten-2">mdi-cart-outline</v-icon>
          <p class="text-grey mt-2">購物車是空的</p>
        </div>
        <div v-else>
          <div class="mb-4">
            <p class="text-h6 mb-3">購物車內容</p>
            <v-list>
              <v-list-item
                v-for="item in mockCartItems"
                :key="item.id"
                class="px-0"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  數量: {{ item.quantity }} | NT$ {{ item.price.toLocaleString() }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            
            <v-divider class="my-3" />
            
            <div class="d-flex justify-space-between text-h6 font-weight-bold">
              <span>總計:</span>
              <span class="text-error">NT$ {{ cartTotal.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </v-card-text>
      
      <!-- 購物車動作按鈕 -->
      <v-card-actions v-if="cartCount > 0" class="pa-4">
        <v-btn
          variant="outlined"
          color="secondary"
          @click="clearCartWithTracking"
        >
          清空購物車
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          @click="goToPaymentWithTracking"
        >
          <v-icon start>mdi-credit-card</v-icon>
          前往付款
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { trackEvent } from '../utils/analytics'
import { NavigationEvents, CartEvents } from '../utils/trackingEvents'

const router = useRouter()

// 響應式狀態
const showSearch = ref(false)
const showMobileMenu = ref(false)
const showCartDialog = ref(false)
const searchQuery = ref('')
const cartCount = ref(3) // Mock 購物車數量

// Mock 購物車商品資料
const mockCartItems = ref([
  { id: 1, name: 'iPhone 15 Pro', quantity: 1, price: 35900 },
  { id: 2, name: 'AirPods Pro', quantity: 2, price: 7490 },
  { id: 3, name: '無線充電器', quantity: 1, price: 1200 }
])

// 計算購物車總金額
const cartTotal = computed(() => {
  return mockCartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

// Tracking 函式
const trackLogoClick = () => {
  trackEvent(NavigationEvents.LOGO_CLICK)
}

const trackHomeClick = () => {
  trackEvent(NavigationEvents.HOME_CLICK)
}

const trackProductsClick = () => {
  trackEvent(NavigationEvents.PRODUCTS_CLICK)
}

// 搜尋功能
const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchQuery.value = ''
  }
}

const toggleSearchWithTracking = () => {
  trackEvent(NavigationEvents.SEARCH_OPEN)
  toggleSearch()
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('搜尋:', searchQuery.value)
    router.push(`/products?search=${encodeURIComponent(searchQuery.value)}`)
    showSearch.value = false
    searchQuery.value = ''
  }
}

const performSearchWithTracking = () => {
  trackEvent(NavigationEvents.SEARCH_PERFORM, {
    searchQuery: searchQuery.value.trim()
  })
  performSearch()
}

// 購物車功能
const openCart = () => {
  showCartDialog.value = true
}

const openCartWithTracking = () => {
  trackEvent(NavigationEvents.CART_OPEN, {
    cartItemCount: cartCount.value,
    cartTotal: cartTotal.value
  })
  openCart()
}

// 手機版選單
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// 購物車功能
const clearCart = () => {
  mockCartItems.value = []
  cartCount.value = 0
  showCartDialog.value = false
}

const clearCartWithTracking = () => {
  trackEvent(CartEvents.CART_CLEAR, {
    previousItemCount: cartCount.value,
    previousTotal: cartTotal.value
  })
  clearCart()
}

const goToPayment = () => {
  showCartDialog.value = false
  router.push('/payment')
}

const goToPaymentWithTracking = () => {
  trackEvent(CartEvents.CART_CHECKOUT, {
    cartItemCount: cartCount.value,
    cartTotal: cartTotal.value,
    items: mockCartItems.value
  })
  goToPayment()
}
</script>

