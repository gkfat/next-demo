<template>
  <header class="navigation-header">
    <div class="nav-container">
      <!-- Logo 區域 -->
      <div class="nav-brand">
        <RouterLink to="/home" class="brand-link">
          <img 
            alt="Vue logo" 
            class="brand-logo" 
            src="@/assets/logo.svg" 
            width="32" 
            height="32" 
          />
          <span class="brand-name">MyApp</span>
        </RouterLink>
      </div>

      <!-- 主要導航 -->
      <nav class="main-nav">
        <RouterLink to="/home" class="nav-link">
          <span class="nav-icon">🏠</span>
          首頁
        </RouterLink>
        <RouterLink to="/products" class="nav-link">
          <span class="nav-icon">📦</span>
          產品
        </RouterLink>
      </nav>

      <!-- 右側功能區 -->
      <div class="nav-actions">
        <button class="action-btn search-btn" @click="toggleSearch">
          <span class="action-icon">🔍</span>
          搜尋
        </button>
        <button class="action-btn cart-btn" @click="openCart">
          <span class="action-icon">🛒</span>
          購物車
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>
        <div class="user-menu">
          <button class="action-btn user-btn" @click="toggleUserMenu">
            <span class="action-icon">👤</span>
            會員
          </button>
          <div v-if="showUserMenu" class="user-dropdown">
            <a href="#" class="dropdown-item">個人資料</a>
            <a href="#" class="dropdown-item">訂單記錄</a>
            <hr class="dropdown-divider">
            <a href="#" class="dropdown-item">登出</a>
          </div>
        </div>
      </div>

      <!-- 手機版選單按鈕 -->
      <button 
        class="mobile-menu-btn"
        @click="toggleMobileMenu"
        :class="{ active: showMobileMenu }"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- 搜尋列 -->
    <div v-if="showSearch" class="search-bar">
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋產品..."
          class="search-input"
          @keyup.enter="performSearch"
        />
        <button class="search-submit" @click="performSearch">搜尋</button>
        <button class="search-close" @click="toggleSearch">✕</button>
      </div>
    </div>

    <!-- 手機版選單 -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <nav class="mobile-nav">
        <RouterLink 
          to="/home" 
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          <span class="nav-icon">🏠</span>
          首頁
        </RouterLink>
        <RouterLink 
          to="/products" 
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          <span class="nav-icon">📦</span>
          產品
        </RouterLink>
        <hr class="mobile-divider">
        <a href="#" class="mobile-nav-link">
          <span class="nav-icon">👤</span>
          個人資料
        </a>
        <a href="#" class="mobile-nav-link">
          <span class="nav-icon">📋</span>
          訂單記錄
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

// 響應式狀態
const showSearch = ref(false)
const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const searchQuery = ref('')
const cartCount = ref(3) // Mock 購物車數量

// 搜尋功能
const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    showUserMenu.value = false
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('搜尋:', searchQuery.value)
    // TODO: 實作搜尋邏輯
    router.push(`/products?search=${encodeURIComponent(searchQuery.value)}`)
  }
}

// 購物車功能
const openCart = () => {
  console.log('打開購物車')
  // TODO: 實作購物車邏輯
}

// 使用者選單
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    showSearch.value = false
  }
}

// 手機版選單
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// 點擊外部關閉選單
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.user-menu')) {
    showUserMenu.value = false
  }
  if (!target.closest('.nav-container') && !target.closest('.mobile-menu')) {
    showMobileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navigation-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

/* Logo 品牌區域 */
.nav-brand .brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2c3e50;
}

.brand-logo {
  margin-right: 8px;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
}

/* 主要導航 */
.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #6b7280;
  border-radius: 6px;
  transition: all 0.2s;
  font-weight: 500;
}

.nav-link:hover {
  color: #42b883;
  background-color: #f0f9f4;
}

.nav-link.router-link-active {
  color: #42b883;
  background-color: #ecfdf5;
}

.nav-icon {
  margin-right: 6px;
  font-size: 1.1rem;
}

/* 右側功能區 */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  position: relative;
}

.action-btn:hover {
  border-color: #42b883;
  color: #42b883;
}

.action-icon {
  margin-right: 4px;
}

/* 購物車徽章 */
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

/* 使用者下拉選單 */
.user-menu {
  position: relative;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f9fafb;
}

.dropdown-divider {
  margin: 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

/* 搜尋列 */
.search-bar {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #42b883;
}

.search-submit,
.search-close {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.search-submit:hover {
  border-color: #42b883;
  color: #42b883;
}

.search-close {
  background: #f3f4f6;
}

.search-close:hover {
  background: #e5e7eb;
}

/* 手機版選單按鈕 */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: #6b7280;
  margin: 2px 0;
  transition: 0.3s;
}

.mobile-menu-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(-45deg) translate(-4px, 4px);
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(45deg) translate(-4px, -4px);
}

/* 手機版選單 */
.mobile-menu {
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background-color: #f0f9f4;
  color: #42b883;
}

.mobile-divider {
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .main-nav,
  .nav-actions .search-btn,
  .nav-actions .user-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .nav-actions {
    gap: 0.25rem;
  }

  .action-btn {
    padding: 0.5rem;
    border: none;
  }

  .action-btn .action-icon {
    margin-right: 0;
  }

  .action-btn:not(.cart-btn) span:not(.action-icon) {
    display: none;
  }
}

@media (max-width: 640px) {
  .brand-name {
    display: none;
  }
}
</style>