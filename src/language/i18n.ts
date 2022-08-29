import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const i18n = createI18n({
  // https://blog.csdn.net/sinat_36728518/article/details/123661673
  legacy: false, // fix:SyntaxError: Not available in legacy mode
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
})

/**
 * @description: 创建一个 i18n 实例
 * @return {*}
 */
export const createSSRI18n = () => {
  return createI18n({
    // https://blog.csdn.net/sinat_36728518/article/details/123661673
    legacy: false, // fix:SyntaxError: Not available in legacy mode
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: {
      zh,
      en
    }
  })
}

export default i18n
