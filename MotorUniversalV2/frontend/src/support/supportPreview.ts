let supportPreviewLogged = false

export const isSupportPreviewEnabled = () => {
  const flag = import.meta.env.VITE_SUPPORT_PREVIEW
  const normalized = String(flag ?? '').trim().toLowerCase()
  return import.meta.env.DEV && (normalized === '1' || normalized === 'true')
}

export const logSupportPreviewOnce = () => {
  if (isSupportPreviewEnabled() && !supportPreviewLogged) {
    console.log('[DEV] Support preview enabled')
    supportPreviewLogged = true
  }
}
