/**
 * UTM 追蹤 Composable
 * 用於在 Vue 元件中方便地使用 UTM 功能
 */
import { ref, onMounted, computed } from 'vue'
import { getUTMInfo, saveUTMInfo, loadUTMInfo, clearUTMParams, getUTMDescription } from '../utils/utm'
import type { UTMInfo } from '../utils/utm'
import { trackEvent } from '../utils/analytics'

export function useUTM() {
  const utmInfo = ref<UTMInfo | null>(null)
  const isLoaded = ref(false)

  // 計算屬性
  const hasUTMParams = computed(() => utmInfo.value?.hasUTMParams || false)
  const utmDescription = computed(() => 
    utmInfo.value ? getUTMDescription(utmInfo.value) : ''
  )
  
  const isFromPaidCampaign = computed(() => {
    if (!utmInfo.value) return false
    const medium = utmInfo.value.utm_medium?.toLowerCase()
    return ['cpc', 'cpm', 'paid', 'ppc', 'display'].includes(medium || '')
  })

  const isFromSocialMedia = computed(() => {
    if (!utmInfo.value) return false
    const medium = utmInfo.value.utm_medium?.toLowerCase()
    const source = utmInfo.value.utm_source?.toLowerCase()
    return medium === 'social' || 
           ['facebook', 'instagram', 'twitter', 'linkedin', 'line', 'tiktok'].includes(source || '')
  })

  const isFromEmail = computed(() => {
    if (!utmInfo.value) return false
    const medium = utmInfo.value.utm_medium?.toLowerCase()
    const source = utmInfo.value.utm_source?.toLowerCase()
    return medium === 'email' || source === 'newsletter' || source === 'edm'
  })

  /**
   * 初始化 UTM 追蹤
   */
  const initUTM = () => {
    try {
      // 首先嘗試從 localStorage 載入
      let loadedUTM = loadUTMInfo()
      
      // 如果沒有儲存的資料，或者當前 URL 有新的 UTM 參數，則重新解析
      const currentUTM = getUTMInfo()
      if (!loadedUTM || currentUTM.hasUTMParams) {
        loadedUTM = currentUTM
        // 儲存新的 UTM 資訊
        saveUTMInfo(loadedUTM)
        
        // 追蹤 UTM 著陸事件
        if (loadedUTM.hasUTMParams) {
          trackEvent('utm-landing', {
            utm_source: loadedUTM.utm_source,
            utm_medium: loadedUTM.utm_medium,
            utm_campaign: loadedUTM.utm_campaign,
            utm_term: loadedUTM.utm_term,
            utm_content: loadedUTM.utm_content,
            page: window.location.pathname
          })
        }
      }
      
      utmInfo.value = loadedUTM
      isLoaded.value = true
      
    } catch (error) {
      console.warn('UTM 初始化失敗:', error)
      isLoaded.value = true
    }
  }

  /**
   * 清除 UTM 資訊
   */
  const clearUTM = () => {
    clearUTMParams(true)
    utmInfo.value = null
    
    // 追蹤清除事件
    trackEvent('utm-cleared')
  }

  /**
   * 手動更新 UTM 資訊
   */
  const refreshUTM = () => {
    const newUTM = getUTMInfo()
    utmInfo.value = newUTM
    saveUTMInfo(newUTM)
    
    if (newUTM.hasUTMParams) {
      trackEvent('utm-refreshed', {
        utm_source: newUTM.utm_source,
        utm_medium: newUTM.utm_medium,
        utm_campaign: newUTM.utm_campaign
      })
    }
  }

  /**
   * 獲取 UTM 資訊用於追蹤
   */
  const getTrackingData = () => {
    if (!utmInfo.value) return {}
    
    return {
      utm_source: utmInfo.value.utm_source,
      utm_medium: utmInfo.value.utm_medium,
      utm_campaign: utmInfo.value.utm_campaign,
      utm_term: utmInfo.value.utm_term,
      utm_content: utmInfo.value.utm_content,
      sessionId: utmInfo.value.sessionId
    }
  }

  // 元件掛載時初始化
  onMounted(() => {
    initUTM()
  })

  return {
    // 資料
    utmInfo,
    isLoaded,
    
    // 計算屬性
    hasUTMParams,
    utmDescription,
    isFromPaidCampaign,
    isFromSocialMedia,
    isFromEmail,
    
    // 方法
    initUTM,
    clearUTM,
    refreshUTM,
    getTrackingData
  }
}