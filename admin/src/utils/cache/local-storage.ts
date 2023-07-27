/** 统一处理 localStorage */

import CacheKey from "@/constants/cache-key"
import { type SidebarOpened, type SidebarClosed } from "@/constants/app-key"
import { type ThemeName } from "@/hooks/useTheme"

export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export const setSidebarStatus = (sidebarStatus: SidebarOpened | SidebarClosed) => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}

export const getActiveThemeName = () => {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName | null
}
export const setActiveThemeName = (themeName: ThemeName) => {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}

export const setAccessToken = (value: string) => {
  return localStorage.setItem(CacheKey.ACCESS_TOKEN, value)
}
export const getAccessToken = () => {
  return localStorage.getItem(CacheKey.ACCESS_TOKEN)
}

export const removeAccessToken = () => {
  return localStorage.removeItem(CacheKey.ACCESS_TOKEN)
}


export const setRefreshToken = (value: string) => {
  return localStorage.setItem(CacheKey.REFRESH_TOKEN, value)
}
export const getRefreshToken = () => {
  return localStorage.getItem(CacheKey.REFRESH_TOKEN)
}

export const removeRefreshToken = () => {
  return localStorage.removeItem(CacheKey.REFRESH_TOKEN)
}
