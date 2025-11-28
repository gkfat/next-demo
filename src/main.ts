import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { getUTMInfo, saveUTMInfo } from './utils/utm'
import { trackEvent } from './utils/analytics'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

// 全局 UTM 追蹤初始化
if (typeof window !== 'undefined') {
  // 頁面載入時處理 UTM 參數
  const utmInfo = getUTMInfo()
  
  // 如果有 UTM 參數，儲存並追蹤
  if (utmInfo.hasUTMParams) {
    saveUTMInfo(utmInfo)
    
    // 追蹤首次 UTM 著陸
    trackEvent('app-utm-landing', {
      utm_source: utmInfo.utm_source,
      utm_medium: utmInfo.utm_medium,
      utm_campaign: utmInfo.utm_campaign,
      utm_term: utmInfo.utm_term,
      utm_content: utmInfo.utm_content,
      landing_page: window.location.pathname,
      is_first_visit: !localStorage.getItem('utm_info')
    })
  }
  
  // 追蹤應用程式啟動
  trackEvent('app-start', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  })
}

app.mount('#app')
