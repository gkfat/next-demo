<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { trackEvent } from '../utils/analytics'
import { CampaignEvents } from '../utils/trackingEvents'

const router = useRouter()

// 活動倒數計時
const eventEndDate = new Date('2024-12-31T23:59:59')
const timeLeft = ref('')

// 計算倒數計時
const updateCountdown = () => {
  const now = new Date()
  const difference = eventEndDate.getTime() - now.getTime()
  
  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)
    
    timeLeft.value = `${days}天 ${hours}時 ${minutes}分 ${seconds}秒`
  } else {
    timeLeft.value = '活動已結束'
  }
}

// 每秒更新倒數計時
setInterval(updateCountdown, 1000)
updateCountdown()

// 優惠商品
const campaignProducts = ref([
  {
    id: 1,
    name: '限時特價 - iPhone 15 Pro',
    originalPrice: 39900,
    campaignPrice: 35900,
    discount: '88折',
    image: 'https://via.placeholder.com/300x200/42b883/ffffff?text=iPhone+15+Pro',
    stock: 15
  },
  {
    id: 2,
    name: '買一送一 - AirPods Pro',
    originalPrice: 7990,
    campaignPrice: 7490,
    discount: '送一個',
    image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=AirPods+Pro',
    stock: 8
  },
  {
    id: 3,
    name: '早鳥優惠 - MacBook Air',
    originalPrice: 34900,
    campaignPrice: 29900,
    discount: '85折',
    image: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=MacBook+Air',
    stock: 3
  }
])

const goToPayment = () => {
  router.push('/payment')
}

const goToProducts = () => {
  router.push('/products')
}

// Tracking 函式
const trackHeroCTA = (buttonType: 'primary' | 'secondary') => {
  trackEvent(CampaignEvents.CAMPAIGN_HERO_CTA, {
    buttonType,
    buttonText: buttonType === 'primary' ? '立即搶購' : '查看所有商品',
    location: 'hero_section'
  })
}

const trackProductBuy = (product: any) => {
  trackEvent(CampaignEvents.CAMPAIGN_PRODUCT_BUY, {
    productId: product.id,
    productName: product.name,
    campaignPrice: product.campaignPrice,
    originalPrice: product.originalPrice,
    discount: product.discount,
    stock: product.stock
  })
}

const trackFinalCTA = () => {
  trackEvent(CampaignEvents.CAMPAIGN_FINAL_CTA, {
    buttonText: '馬上搶購',
    location: 'bottom_cta'
  })
}

const trackCountdownView = () => {
  trackEvent(CampaignEvents.CAMPAIGN_COUNTDOWN_VIEW, {
    timeLeft: timeLeft.value
  })
}

// 包裝原有函式加入追蹤
const goToPaymentWithTracking = (source: string, productData?: any) => {
  if (source === 'hero_primary') {
    trackHeroCTA('primary')
  } else if (source === 'product' && productData) {
    trackProductBuy(productData)
  } else if (source === 'final_cta') {
    trackFinalCTA()
  }
  goToPayment()
}

const goToProductsWithTracking = () => {
  trackHeroCTA('secondary')
  goToProducts()
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <v-container fluid class="bg-gradient pa-0">
      <v-container class="py-16">
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center text-white">
            <v-chip
              color="error"
              variant="elevated"
              size="large"
              class="mb-4"
            >
              <v-icon start>mdi-fire</v-icon>
              限時優惠活動
            </v-chip>
            
            <h1 class="text-h2 font-weight-bold mb-4">
              年終大促銷
            </h1>
            <h2 class="text-h4 mb-6">
              全館商品最高 5 折優惠
            </h2>
            
            <!-- 倒數計時 -->
            <v-card
              class="mx-auto mb-6 pa-4"
              max-width="400"
              color="rgba(255,255,255,0.1)"
              variant="outlined"
            >
              <div class="text-h6 mb-2">活動倒數</div>
              <div class="text-h4 font-weight-bold text-error">
                {{ timeLeft }}
              </div>
            </v-card>
            
            <div class="d-flex justify-center gap-4 flex-wrap">
              <v-btn
                color="error"
                size="large"
                variant="elevated"
                @click="goToPaymentWithTracking('hero_primary')"
              >
                <v-icon start>mdi-lightning-bolt</v-icon>
                立即搶購
              </v-btn>
              
              <v-btn
                color="white"
                size="large"
                variant="outlined"
                @click="goToProductsWithTracking"
              >
                <v-icon start>mdi-package-variant</v-icon>
                查看所有商品
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- 活動商品區 -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold text-primary mb-4">
            熱門活動商品
          </h2>
          <p class="text-h6 text-grey-darken-1">
            數量有限，售完為止
          </p>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col
          v-for="product in campaignProducts"
          :key="product.id"
          cols="12"
          md="4"
        >
          <v-card elevation="4" class="h-100">
            <!-- 商品圖片 -->
            <div class="position-relative">
              <v-img
                :src="product.image"
                :alt="product.name"
                height="200"
                cover
              />
              
              <!-- 折扣標籤 -->
              <v-chip
                color="error"
                variant="elevated"
                class="position-absolute"
                style="top: 12px; right: 12px;"
              >
                {{ product.discount }}
              </v-chip>
              
              <!-- 庫存警告 -->
              <v-chip
                v-if="product.stock <= 5"
                color="warning"
                variant="elevated"
                class="position-absolute"
                style="bottom: 12px; left: 12px;"
              >
                <v-icon start>mdi-alert</v-icon>
                剩餘 {{ product.stock }} 件
              </v-chip>
            </div>
            
            <v-card-text>
              <v-card-title class="pa-0 mb-3">
                {{ product.name }}
              </v-card-title>
              
              <!-- 價格資訊 -->
              <div class="mb-4">
                <div class="d-flex align-center gap-3">
                  <span class="text-h5 text-error font-weight-bold">
                    NT$ {{ product.campaignPrice.toLocaleString() }}
                  </span>
                  <span class="text-decoration-line-through text-grey">
                    NT$ {{ product.originalPrice.toLocaleString() }}
                  </span>
                </div>
                <div class="text-success font-weight-bold">
                  省下 NT$ {{ (product.originalPrice - product.campaignPrice).toLocaleString() }}
                </div>
              </div>
              
              <!-- 進度條 (模擬搶購進度) -->
              <div class="mb-3">
                <div class="d-flex justify-space-between text-caption mb-1">
                  <span>已搶購進度</span>
                  <span>{{ 100 - (product.stock * 10) }}%</span>
                </div>
                <v-progress-linear
                  :model-value="100 - (product.stock * 10)"
                  color="error"
                  height="8"
                  rounded
                />
              </div>
            </v-card-text>
            
            <v-card-actions class="pa-4">
              <v-btn
                color="primary"
                variant="elevated"
                block
                size="large"
                :disabled="product.stock === 0"
                @click="goToPaymentWithTracking('product', product)"
              >
                <v-icon start>mdi-cart-plus</v-icon>
                {{ product.stock === 0 ? '已售完' : '立即購買' }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 活動條款 -->
    <v-container class="py-8">
      <v-row>
        <v-col cols="12">
          <v-card variant="outlined">
            <v-card-title>
              <v-icon class="mr-2">mdi-information</v-icon>
              活動條款與細則
            </v-card-title>
            <v-card-text>
              <v-list density="compact">
                <v-list-item>
                  <v-list-item-title>活動期間：2024/01/01 - 2024/12/31</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>優惠商品數量有限，售完為止</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>本活動不與其他優惠同時使用</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>MyApp 保留活動最終解釋權</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>限時優惠價格僅適用於活動期間</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Call-to-Action -->
    <v-container fluid class="bg-primary py-12">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center text-white">
            <h3 class="text-h4 font-weight-bold mb-4">
              不要錯過這次機會！
            </h3>
            <p class="text-h6 mb-6">
              立即行動，享受超值優惠
            </p>
            <v-btn
              color="error"
              size="x-large"
              variant="elevated"
              @click="goToPaymentWithTracking('final_cta')"
            >
              <v-icon start>mdi-rocket-launch</v-icon>
              馬上搶購
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>