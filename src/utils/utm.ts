/**
 * UTM 參數解析工具
 * 用於追蹤和分析流量來源、媒介、活動等資訊
 */

// UTM 參數類型定義
export interface UTMParameters {
  utm_source?: string      // 流量來源 (google, facebook, newsletter)
  utm_medium?: string      // 流量媒介 (cpc, banner, email)
  utm_campaign?: string    // 活動名稱 (summer_sale, product_launch)
  utm_term?: string        // 關鍵字 (用於付費搜尋)
  utm_content?: string     // 廣告內容 (logolink, textlink)
}

// 完整的 UTM 資訊類型
export interface UTMInfo extends UTMParameters {
  hasUTMParams: boolean
  referrer: string
  timestamp: string
  userAgent: string
  sessionId: string
}

// UTM 參數預設值
const UTM_DEFAULTS = {
  utm_source: 'direct',
  utm_medium: 'none',
  utm_campaign: 'unknown',
  utm_term: '',
  utm_content: ''
}

// 常見的 UTM 來源對應
const COMMON_SOURCES = {
  'google': 'google',
  'facebook': 'facebook', 
  'instagram': 'instagram',
  'twitter': 'twitter',
  'linkedin': 'linkedin',
  'youtube': 'youtube',
  'line': 'line',
  'tiktok': 'tiktok',
  'newsletter': 'email',
  'edm': 'email'
}

// 常見的 UTM 媒介對應
const COMMON_MEDIUMS = {
  'cpc': '付費點擊',
  'cpm': '付費展示',
  'email': '電子郵件',
  'social': '社群媒體',
  'organic': '自然搜尋',
  'referral': '推薦連結',
  'display': '展示廣告',
  'banner': '橫幅廣告',
  'affiliate': '聯盟行銷',
  'direct': '直接流量'
}

/**
 * 從 URL 解析 UTM 參數
 * @param url 要解析的 URL，預設為當前頁面 URL
 * @returns UTM 參數物件
 */
export function parseUTMFromURL(url?: string): UTMParameters {
  const targetURL = url || (typeof window !== 'undefined' ? window.location.href : '')
  
  if (!targetURL) {
    return {}
  }

  try {
    const urlObj = new URL(targetURL)
    const params = urlObj.searchParams

    const utmParams: UTMParameters = {}

    // 解析標準 UTM 參數
    const utmKeys: (keyof UTMParameters)[] = [
      'utm_source',
      'utm_medium', 
      'utm_campaign',
      'utm_term',
      'utm_content'
    ]

    utmKeys.forEach(key => {
      const value = params.get(key)
      if (value) {
        utmParams[key] = decodeURIComponent(value).trim()
      }
    })

    return utmParams
  } catch (error) {
    console.warn('UTM 解析錯誤:', error)
    return {}
  }
}

/**
 * 從 Referrer 推測流量來源
 * @param referrer 來源網址
 * @returns 推測的來源資訊
 */
export function inferSourceFromReferrer(referrer: string): Partial<UTMParameters> {
  if (!referrer) {
    return {
      utm_source: 'direct',
      utm_medium: 'none'
    }
  }

  try {
    const referrerURL = new URL(referrer)
    const domain = referrerURL.hostname.toLowerCase()

    // 搜尋引擎判斷
    if (domain.includes('google')) {
      return {
        utm_source: 'google',
        utm_medium: 'organic'
      }
    }
    
    if (domain.includes('bing')) {
      return {
        utm_source: 'bing',
        utm_medium: 'organic'
      }
    }

    if (domain.includes('yahoo')) {
      return {
        utm_source: 'yahoo',
        utm_medium: 'organic'
      }
    }

    // 社群媒體判斷
    if (domain.includes('facebook') || domain.includes('fb')) {
      return {
        utm_source: 'facebook',
        utm_medium: 'social'
      }
    }

    if (domain.includes('instagram')) {
      return {
        utm_source: 'instagram',
        utm_medium: 'social'
      }
    }

    if (domain.includes('twitter') || domain.includes('t.co')) {
      return {
        utm_source: 'twitter',
        utm_medium: 'social'
      }
    }

    if (domain.includes('linkedin')) {
      return {
        utm_source: 'linkedin',
        utm_medium: 'social'
      }
    }

    if (domain.includes('line')) {
      return {
        utm_source: 'line',
        utm_medium: 'social'
      }
    }

    // 其他推薦流量
    return {
      utm_source: domain,
      utm_medium: 'referral'
    }

  } catch (error) {
    return {
      utm_source: 'unknown',
      utm_medium: 'referral'
    }
  }
}

/**
 * 生成 Session ID
 * @returns 唯一的 session ID
 */
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 獲取完整的 UTM 資訊
 * @param url 可選的 URL，預設為當前頁面
 * @returns 完整的 UTM 資訊
 */
export function getUTMInfo(url?: string): UTMInfo {
  const utmParams = parseUTMFromURL(url)
  const hasUTMParams = Object.keys(utmParams).length > 0
  
  // 如果沒有 UTM 參數，嘗試從 referrer 推測
  let finalParams = utmParams
  if (!hasUTMParams && typeof window !== 'undefined') {
    const inferredParams = inferSourceFromReferrer(document.referrer)
    finalParams = { ...inferredParams, ...utmParams }
  }

  // 填入預設值
  const completeParams = { ...UTM_DEFAULTS, ...finalParams }

  return {
    ...completeParams,
    hasUTMParams,
    referrer: typeof window !== 'undefined' ? document.referrer : '',
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
    sessionId: generateSessionId()
  }
}

/**
 * 儲存 UTM 資訊到 localStorage
 * @param utmInfo UTM 資訊
 * @param key 儲存的 key，預設為 'utm_info'
 */
export function saveUTMInfo(utmInfo?: UTMInfo, key: string = 'utm_info'): void {
  if (typeof window === 'undefined') return

  try {
    const info = utmInfo || getUTMInfo()
    localStorage.setItem(key, JSON.stringify(info))
  } catch (error) {
    console.warn('儲存 UTM 資訊失敗:', error)
  }
}

/**
 * 從 localStorage 讀取 UTM 資訊
 * @param key 讀取的 key，預設為 'utm_info'
 * @returns UTM 資訊或 null
 */
export function loadUTMInfo(key: string = 'utm_info'): UTMInfo | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.warn('讀取 UTM 資訊失敗:', error)
  }
  
  return null
}

/**
 * 獲取 UTM 參數的可讀描述
 * @param utmParams UTM 參數
 * @returns 可讀的描述文字
 */
export function getUTMDescription(utmParams: UTMParameters): string {
  const source = utmParams.utm_source || 'unknown'
  const medium = utmParams.utm_medium || 'unknown'
  
  const sourceDesc = COMMON_SOURCES[source as keyof typeof COMMON_SOURCES] || source
  const mediumDesc = COMMON_MEDIUMS[medium as keyof typeof COMMON_MEDIUMS] || medium
  
  let description = `來源: ${sourceDesc}`
  
  if (medium !== 'none') {
    description += ` | 媒介: ${mediumDesc}`
  }
  
  if (utmParams.utm_campaign) {
    description += ` | 活動: ${utmParams.utm_campaign}`
  }
  
  if (utmParams.utm_term) {
    description += ` | 關鍵字: ${utmParams.utm_term}`
  }
  
  return description
}

/**
 * 建立帶有 UTM 參數的 URL
 * @param baseURL 基礎 URL
 * @param utmParams UTM 參數
 * @returns 包含 UTM 參數的完整 URL
 */
export function buildUTMUrl(baseURL: string, utmParams: Partial<UTMParameters>): string {
  try {
    const url = new URL(baseURL)
    
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, encodeURIComponent(value))
      }
    })
    
    return url.toString()
  } catch (error) {
    console.warn('建立 UTM URL 失敗:', error)
    return baseURL
  }
}

/**
 * 清除 UTM 參數（從 URL 和 localStorage）
 * @param replaceHistory 是否替換瀏覽器歷史記錄
 */
export function clearUTMParams(replaceHistory: boolean = true): void {
  if (typeof window === 'undefined') return

  try {
    // 清除 localStorage
    localStorage.removeItem('utm_info')
    
    // 清除 URL 中的 UTM 參數
    const url = new URL(window.location.href)
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    
    let hasUTMParams = false
    utmKeys.forEach(key => {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key)
        hasUTMParams = true
      }
    })
    
    if (hasUTMParams && replaceHistory) {
      window.history.replaceState({}, document.title, url.toString())
    }
  } catch (error) {
    console.warn('清除 UTM 參數失敗:', error)
  }
}