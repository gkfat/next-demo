/**
 * Vuetify 配置
 */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#42b883', // Vue 綠色
          secondary: '#2c3e50',
          accent: '#e74c3c',
          error: '#dc3545',
          warning: '#ffc107',
          info: '#17a2b8',
          success: '#28a745',
        },
      },
      dark: {
        colors: {
          primary: '#42b883',
          secondary: '#34495e',
          accent: '#e74c3c',
        },
      },
    },
  },
  defaults: {
    global: {
      ripple: false,
    },
    VCard: {
      elevation: 2,
    },
    VBtn: {
      style: 'text-transform: none;',
    },
  },
})