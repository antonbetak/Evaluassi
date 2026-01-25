let supportPreviewLogged = false

export const isSupportPreviewEnabled = () => {
  const flag = import.meta.env.VITE_SUPPORT_PREVIEW
<<<<<<< ours
  return import.meta.env.DEV && (flag === '1' || flag === 'true')
=======
  const normalized = String(flag ?? '').trim().toLowerCase()
  return import.meta.env.DEV && (normalized === '1' || normalized === 'true')
>>>>>>> theirs
}

export const logSupportPreviewOnce = () => {
  if (isSupportPreviewEnabled() && !supportPreviewLogged) {
    console.log('[DEV] Support preview enabled')
    supportPreviewLogged = true
  }
}
