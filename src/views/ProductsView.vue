<template>
  <v-container>
    <!-- 頁面標題與篩選器 -->
    <v-row class="mb-6">
      <v-col cols="12" md="8">
        <h1 class="text-h3 text-primary font-weight-bold">產品列表</h1>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedCategory"
          :items="categoryOptions"
          label="選擇分類"
          variant="outlined"
          density="compact"
          @update:model-value="filterProducts"
        />
      </v-col>
    </v-row>

    <!-- 產品網格 -->
    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          :class="{ 'opacity-75': !product.inStock }"
          elevation="2"
          hover
        >
          <!-- 產品圖片 -->
          <div class="position-relative">
            <v-img
              :src="product.image"
              :alt="product.name"
              height="200"
              cover
            />
            <v-overlay
              v-if="!product.inStock"
              contained
              class="d-flex align-center justify-center"
            >
              <v-chip
                color="error"
                variant="elevated"
                size="large"
              >
                缺貨
              </v-chip>
            </v-overlay>
          </div>

          <!-- 產品標題 -->
          <v-card-title class="pb-2">
            {{ product.name }}
          </v-card-title>
          
          <!-- 產品描述 -->
          <v-card-subtitle class="pb-4">
            {{ product.description }}
          </v-card-subtitle>
          
          <!-- 價格與按鈕 -->
          <v-card-actions class="px-4 pb-4">
            <span class="text-h6 text-error font-weight-bold">
              NT$ {{ product.price.toLocaleString() }}
            </span>
            <v-spacer />
            <v-btn
              :disabled="!product.inStock"
              color="primary"
              variant="elevated"
              size="small"
              @click="addToCart(product)"
            >
              {{ product.inStock ? '加入購物車' : '缺貨' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 空狀態 -->
    <v-row v-if="filteredProducts.length === 0">
      <v-col cols="12">
        <v-card class="text-center py-8">
          <v-icon size="64" color="grey-lighten-2" class="mb-4">
            mdi-package-variant-remove
          </v-icon>
          <v-card-title class="text-grey">
            找不到符合條件的產品
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '../data/mockProducts'
import type { Product } from '../types/product'
import { trackAddToCart, trackEvent } from '../utils/analytics'
import { ProductEvents } from '../utils/trackingEvents'

const selectedCategory = ref('')
const products = ref<Product[]>([])

// 轉換分類選項格式供 v-select 使用
const categoryOptions = computed(() => [
  { title: '所有分類', value: '' },
  ...PRODUCT_CATEGORIES.map(category => ({
    title: category.name,
    value: category.id
  }))
])

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return products.value
  }
  return products.value.filter(product => product.category === selectedCategory.value)
})

const filterProducts = () => {
  // 追蹤篩選事件
  trackEvent(ProductEvents.PRODUCT_FILTER, {
    selectedCategory: selectedCategory.value,
    categoryName: PRODUCT_CATEGORIES.find(cat => cat.id === selectedCategory.value)?.name || '所有分類'
  })
  console.log('篩選分類:', selectedCategory.value)
}

const addToCart = (product: Product) => {
  // 追蹤產品瀏覽事件
  trackEvent(ProductEvents.PRODUCT_VIEW, {
    productId: product.id,
    productName: product.name,
    productPrice: product.price,
    productCategory: product.category
  })

  // 追蹤產品加入購物車事件
  trackAddToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category
  })
  
  // TODO: 實作加入購物車功能
  console.log('加入購物車:', product.name)
  alert(`已將 ${product.name} 加入購物車`)
}

onMounted(() => {
  // 模擬 API 載入
  products.value = MOCK_PRODUCTS
})
</script>

