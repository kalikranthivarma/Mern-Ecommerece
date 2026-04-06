export const apiBaseUrl =
  import.meta.env.VITE_API_URL || "http://localhost:2000/api"

export const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "")

export const getProductImageUrl = (imageId) =>
  `${apiOrigin}/api/product/image/${imageId}`
