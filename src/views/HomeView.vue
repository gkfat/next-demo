<script setup lang="ts">
import { onMounted } from 'vue'
import { trackEvent } from '../utils/analytics'
import { HomeEvents } from '../utils/trackingEvents'
import { useUTM } from '../composables/useUTM'

// UTM 追蹤
const { utmInfo, hasUTMParams, isFromPaidCampaign, isFromSocialMedia } = useUTM()

// 追蹤首頁瀏覽
onMounted(() => {
  trackEvent('home-page-view', {
    has_utm: hasUTMParams.value,
    is_paid_traffic: isFromPaidCampaign.value,
    is_social_traffic: isFromSocialMedia.value
  })
})

// Tracking 函式
const trackHeroCTA = () => {
  trackEvent(HomeEvents.HOME_HERO_CTA, {
    buttonText: '瀏覽產品',
    location: 'hero_section'
  })
}

const trackFeatureView = (featureName: string) => {
  trackEvent(HomeEvents.HOME_FEATURE_VIEW, {
    featureName,
    location: 'features_section'
  })
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <v-container class="py-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h2 text-primary font-weight-bold mb-4">
            歡迎來到 MyApp
          </h1>
          <p class="text-h6 text-grey-darken-1 mb-6">
            探索精彩的購物體驗
          </p>
          <v-btn
            color="primary"
            size="large"
            to="/products"
            class="text-h6"
            @click="trackHeroCTA"
          >
            <v-icon start>mdi-package-variant</v-icon>
            瀏覽產品
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Features Section -->
    <v-container class="py-8">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 text-secondary font-weight-bold">為什麼選擇我們？</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="text-center pa-6" elevation="2">
            <v-icon size="64" color="primary" class="mb-4">
              mdi-shopping
            </v-icon>
            <v-card-title class="justify-center">
              豐富商品
            </v-card-title>
            <v-card-text>
              精選優質商品，滿足您的各種需求
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="text-center pa-6" elevation="2">
            <v-icon size="64" color="primary" class="mb-4">
              mdi-rocket-launch
            </v-icon>
            <v-card-title class="justify-center">
              快速配送
            </v-card-title>
            <v-card-text>
              專業物流團隊，確保商品快速到達
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="text-center pa-6" elevation="2">
            <v-icon size="64" color="primary" class="mb-4">
              mdi-heart
            </v-icon>
            <v-card-title class="justify-center">
              優質服務
            </v-card-title>
            <v-card-text>
              專業客服團隊，提供貼心售後服務
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Analytics Dashboard Section -->
    <v-container class="py-8">
      <v-row>
        <v-col cols="12" class="text-center mb-6">
          <h2 class="text-h3 text-secondary font-weight-bold">網站分析儀表板</h2>
          <p class="text-h6 text-grey-darken-1 mt-2">
            即時查看網站訪問統計與用戶行為分析
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" lg="10" xl="8">
          <v-card elevation="3" class="overflow-hidden">
            <v-card-title class="bg-primary text-white d-flex align-center">
              <v-icon start>mdi-chart-line</v-icon>
              Umami Analytics Dashboard
            </v-card-title>
            <v-card-text class="pa-0">
              <iframe
                src="https://fork-umami-server.onrender.com/"
                width="100%"
                height="600"
                frameborder="0"
                title="Analytics Dashboard"
                class="analytics-iframe"
              ></iframe>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<style scoped>
.analytics-iframe {
  border: none;
  display: block;
  min-height: 600px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .analytics-iframe {
    min-height: 500px;
  }
}

@media (max-width: 480px) {
  .analytics-iframe {
    min-height: 400px;
  }
}
</style>

