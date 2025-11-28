<template>
  <div class="products-container">
    <div class="products-header">
      <h1>產品列表</h1>
      <div class="filter-section">
        <select v-model="selectedCategory" @change="filterProducts">
          <option value="">所有分類</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="products-grid">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-card"
        :class="{ 'out-of-stock': !product.inStock }"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
          <div v-if="!product.inStock" class="stock-overlay">缺貨</div>
        </div>
        
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          
          <div class="product-footer">
            <span class="product-price">NT$ {{ product.price.toLocaleString() }}</span>
            <button 
              class="add-to-cart-btn" 
              :disabled="!product.inStock"
              @click="addToCart(product)"
            >
              {{ product.inStock ? '加入購物車' : '缺貨' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="empty-state">
      <p>找不到符合條件的產品</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '../data/mockProducts'
import type { Product } from '../types/product'

const selectedCategory = ref('')
const products = ref<Product[]>([])
const categories = ref(PRODUCT_CATEGORIES)

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return products.value
  }
  return products.value.filter(product => product.category === selectedCategory.value)
})

const filterProducts = () => {
  // 這裡可以加入更複雜的篩選邏輯
  console.log('篩選分類:', selectedCategory.value)
}

const addToCart = (product: Product) => {
  // TODO: 實作加入購物車功能
  console.log('加入購物車:', product.name)
  alert(`已將 ${product.name} 加入購物車`)
}

onMounted(() => {
  // 模擬 API 載入
  products.value = MOCK_PRODUCTS
})
</script>

<style scoped>
.products-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.products-header h1 {
  color: #2c3e50;
  margin: 0;
}

.filter-section select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  min-width: 150px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-card.out-of-stock {
  opacity: 0.7;
}

.product-image {
  position: relative;
  height: 200px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.stock-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(220, 53, 69, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
}

.product-info {
  padding: 1rem;
}

.product-name {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
}

.add-to-cart-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #369870;
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

@media (max-width: 768px) {
  .products-container {
    padding: 1rem;
  }
  
  .products-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .product-footer {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
}
</style>