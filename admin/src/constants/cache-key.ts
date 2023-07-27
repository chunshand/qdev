const SYSTEM_NAME = "v3-admin-vite"

/** 缓存数据时用到的 Key */
class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
  static readonly ACCESS_TOKEN = `${SYSTEM_NAME}-access-token`
  static readonly REFRESH_TOKEN = `${SYSTEM_NAME}-refresh-token`
  static readonly ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name`
}

export default CacheKey
