import { createI18n } from 'vue-i18n'
import zh from './zh.js'
import en from './en.js'
export const i18n = createI18n({
    locale: 'zh',
    messages: {
        'zh': {...zh},
        'en': {...en}
    }
})