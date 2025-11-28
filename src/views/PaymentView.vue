<template>
  <v-container>
    <!-- 頁面標題 -->
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 text-primary font-weight-bold mb-4">
          付費頁面
        </h1>
        <p class="text-h6 text-grey-darken-1">
          完成您的購買流程
        </p>
      </v-col>
    </v-row>

    <!-- 付費資訊卡片 -->
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4">
          <v-card-title class="bg-primary text-white">
            <v-icon class="mr-2">mdi-credit-card</v-icon>
            付款資訊
          </v-card-title>

          <v-card-text class="pa-6">
            <!-- 訂單摘要 -->
            <div class="mb-6">
              <h3 class="text-h6 mb-3">訂單摘要</h3>
              <v-divider class="mb-3" />

              <v-row class="mb-2">
                <v-col>商品小計</v-col>
                <v-col class="text-right">NT$ 1,200</v-col>
              </v-row>
              <v-row class="mb-2">
                <v-col>運費</v-col>
                <v-col class="text-right">NT$ 100</v-col>
              </v-row>
              <v-row class="mb-3">
                <v-col>折扣</v-col>
                <v-col class="text-right text-success">-NT$ 50</v-col>
              </v-row>

              <v-divider class="mb-3" />
              <v-row class="text-h6 font-weight-bold">
                <v-col>總計</v-col>
                <v-col class="text-right text-error">NT$ 1,250</v-col>
              </v-row>
            </div>

            <!-- 付款方式 -->
            <div class="mb-6">
              <h3 class="text-h6 mb-3">付款方式</h3>

              <v-radio-group 
                v-model="paymentMethod"
                @update:model-value="trackPaymentMethodChange"
              >
                <v-radio value="credit-card">
                  <template v-slot:label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-2">mdi-credit-card</v-icon>
                      信用卡/金融卡
                    </div>
                  </template>
                </v-radio>

                <v-radio value="bank-transfer">
                  <template v-slot:label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-2">mdi-bank</v-icon>
                      銀行轉帳
                    </div>
                  </template>
                </v-radio>

                <v-radio value="line-pay">
                  <template v-slot:label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-2">mdi-cellphone</v-icon>
                      LINE Pay
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>

            <!-- 信用卡資訊表單 -->
            <div v-if="paymentMethod === 'credit-card'" class="mb-6">
              <h3 class="text-h6 mb-3">信用卡資訊</h3>

              <v-form>
                <v-text-field
                  label="卡號"
                  placeholder="1234 5678 9012 3456"
                  prepend-inner-icon="mdi-credit-card"
                  variant="outlined"
                  class="mb-3"
                />

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="有效期限"
                      placeholder="MM/YY"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="安全碼"
                      placeholder="123"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>

                <v-text-field
                  label="持卡人姓名"
                  placeholder="請輸入持卡人姓名"
                  variant="outlined"
                />
              </v-form>
            </div>

            <!-- 轉帳資訊 -->
            <div v-if="paymentMethod === 'bank-transfer'" class="mb-6">
              <v-alert type="info" class="mb-3">
                <div class="text-h6 mb-2">轉帳資訊</div>
                <div>銀行：玉山銀行 (808)</div>
                <div>帳號：1234567890123</div>
                <div>戶名：MyApp 股份有限公司</div>
              </v-alert>
              <p class="text-caption">
                請於 3 個工作天內完成轉帳，並保留轉帳收據
              </p>
            </div>

            <!-- LINE Pay 資訊 -->
            <div v-if="paymentMethod === 'line-pay'" class="mb-6 text-center">
              <v-alert type="success" class="mb-3">
                點擊付款後將導向 LINE Pay 付款頁面
              </v-alert>
            </div>
          </v-card-text>

          <v-card-actions class="pa-6">
            <v-btn
              variant="outlined"
              color="secondary"
              size="large"
              @click="goBack"
            >
              <v-icon start>mdi-arrow-left</v-icon>
              返回
            </v-btn>

            <v-spacer />

            <v-btn
              color="primary"
              size="large"
              :loading="processing"
              @click="processPayment"
            >
              <v-icon start>mdi-check</v-icon>
              {{ paymentButtonText }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 安全提示 -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-alert type="info" variant="tonal">
          <v-icon start>mdi-shield-check</v-icon>
          您的付款資訊受到 SSL 加密保護，交易過程安全可靠
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { trackEvent } from '../utils/analytics'
import { PaymentEvents } from '../utils/trackingEvents'
import { useUTM } from '../composables/useUTM'

const router = useRouter()

// UTM 追蹤
const { utmInfo, hasUTMParams, isFromPaidCampaign, isFromSocialMedia } = useUTM()

// 響應式資料
const paymentMethod = ref('credit-card')
const processing = ref(false)

// 追蹤付費頁面瀏覽
onMounted(() => {
  trackEvent('payment-page-view', {
    has_utm: hasUTMParams.value,
    is_paid_traffic: isFromPaidCampaign.value,
    is_social_traffic: isFromSocialMedia.value,
    order_value: 1250,
    currency: 'TWD'
  })
})

// 計算屬性
const paymentButtonText = computed(() => {
  switch (paymentMethod.value) {
    case 'credit-card':
      return '確認付款'
    case 'bank-transfer':
      return '確認訂單'
    case 'line-pay':
      return '前往 LINE Pay'
    default:
      return '確認付款'
  }
})

// 方法
const goBack = () => {
  trackEvent(PaymentEvents.PAYMENT_BACK, {
    paymentMethod: paymentMethod.value
  })
  router.go(-1) // 返回上一頁
}

const processPayment = async () => {
  // 追蹤付款提交事件
  trackEvent(PaymentEvents.PAYMENT_SUBMIT, {
    paymentMethod: paymentMethod.value,
    amount: 1250,
    currency: 'TWD'
  })
  
  processing.value = true

  try {
    // 模擬付款處理
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 追蹤付款成功事件
    trackEvent(PaymentEvents.PAYMENT_SUCCESS, {
      paymentMethod: paymentMethod.value,
      amount: 1250,
      currency: 'TWD'
    })

    // 顯示成功訊息
    alert(`${paymentButtonText.value}成功！`)

    // 導向首頁或訂單確認頁
    router.push('/')
  } catch (error) {
    // 追蹤付款失敗事件
    trackEvent(PaymentEvents.PAYMENT_FAILED, {
      paymentMethod: paymentMethod.value,
      amount: 1250,
      currency: 'TWD',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    alert('付款處理失敗，請稍後再試')
  } finally {
    processing.value = false
  }
}

// 追蹤付款方式選擇
const trackPaymentMethodChange = (newMethod: string | null) => {
  if (newMethod) {
    trackEvent(PaymentEvents.PAYMENT_METHOD_SELECT, {
      previousMethod: paymentMethod.value,
      newMethod,
      amount: 1250,
      currency: 'TWD'
    })
  }
}
</script>
