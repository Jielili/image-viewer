// import { DAILY_CARD_WIDTH } from '@/constants/daily-card'
export function getImageUrl (file, size = 300) {
  if (file.type === 'image/svg+xml') {
    return file.url
  }
  // console.log(Number(file.size) / 1024 / 1024)
  if (file.type.indexOf('image') === 0 && Number(file.size) / 1024 / 1024 > 20) {
    return file.url
  }
  if (file.type.indexOf('image') === 0) {
    return `${file.url}?x-oss-process=image${file.type !== 'image/gif' ? '/format,jpg' : ''}/resize,w_${Math.min(file.width, size)}`
  }
  if (file.type.indexOf('video') === 0) {
    return `${file.url}?x-oss-process=video/snapshot,t_0,f_jpg,w_${Math.min(file.width, size)},h_0,m_fast,ar_auto`
  }
  return file.url
}

export function getFormatImageUrl (file) {
  if (file.type === 'image/svg+xml') {
    return file.url
  }
  return `${file.url}?x-oss-process=image${file.type !== 'image/gif' ? '/format,jpg' : ''}`
}

// export function getUrl ({ url, type, width, height }) {
//   let params = ''
//   if (type.indexOf('video') === 0 && width > DAILY_CARD_WIDTH) {
//     params = '?x-oss-process=video/snapshot,t_0,f_jpg,w_320,h_0,m_fast,ar_auto'
//   } else if (type.indexOf('video') === 0) {
//     params = '?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto'
//   } else if (width > DAILY_CARD_WIDTH && type.indexOf('tiff') >= 0) {
//     params = '?x-oss-process=image/resize,w_320/format,jpg'
//   } else if (type.indexOf('tiff') >= 0) {
//     params = '?x-oss-process=image/format,jpg'
//   } else if (width > DAILY_CARD_WIDTH && type.indexOf('jp2') < 0) {
//     params = '?x-oss-process=image/resize,w_320'
//   }
//   return url + params
// }
