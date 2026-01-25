let supportPreviewLogged = false

export const isSupportPreviewEnabled = () => {
  const flag = import.meta.env.VITE_SUPPORT_PREVIEW
  return import.meta.env.DEV && (flag === '1' || flag === 'true')
}

export const logSupportPreviewOnce = () => {
  if (isSupportPreviewEnabled() && !supportPreviewLogged) {
    console.log('[DEV] Support preview enabled')
    supportPreviewLogged = true
  }
}
