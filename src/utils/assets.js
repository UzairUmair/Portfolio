export function publicAsset(path) {
  return path.startsWith('/') ? path : `/${path}`
}

export function isExternalUrl(value) {
  return /^https?:\/\//i.test(value)
}
