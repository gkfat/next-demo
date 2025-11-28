<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="home-view">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">歡迎來到 MyApp</h1>
        <p class="hero-subtitle">探索我們精選的產品系列</p>
        <div class="hero-actions">
          <RouterLink to="/products" class="btn btn-primary">
            瀏覽產品
          </RouterLink>
        </div>
      </div>
      <div class="hero-image">
        <img src="@/assets/logo.svg" alt="Vue logo" width="200" height="200" />
      </div>
    </div>

    <div class="features-section">
      <div class="container">
        <h2 class="section-title">為什麼選擇我們？</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>快速配送</h3>
            <p>24小時內快速出貨，讓您迅速收到心愛的商品</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>品質保證</h3>
            <p>嚴格品質把關，提供最優質的產品體驗</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>精選商品</h3>
            <p>專業團隊精心挑選，只為您推薦最好的產品</p>
          </div>
        </div>
      </div>
    </div>

    <TheWelcome />
  </div>
</template>

<style scoped>
.home-view {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;
  padding: 2rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  flex: 1;
  max-width: 500px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-actions {
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background: #42b883;
  color: white;
  box-shadow: 0 4px 15px rgba(66, 184, 131, 0.4);
}

.btn-primary:hover {
  background: #369870;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 184, 131, 0.6);
}

.hero-image {
  flex: 1;
  text-align: center;
  padding-left: 2rem;
}

.hero-image img {
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Features Section */
.features-section {
  background: white;
  color: #2c3e50;
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    padding: 2rem 1rem;
    text-align: center;
  }

  .hero-image {
    padding-left: 0;
    margin-top: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
