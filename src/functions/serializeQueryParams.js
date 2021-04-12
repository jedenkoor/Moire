import serialize from '@/functions/serializeQueryParams.js'

export default {
  serializeQueryParams(obj, prefix) {
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value) && !value.length) {
        delete obj[key]
      } else if (Array.isArray(value) && value.length) {
        const newKey = `${key}[]`
        obj[newKey] = obj[key]
        delete obj[key]
      }
    }

    const str = []
    for (const p in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
        const k = prefix || p
        const v = obj[p]
        str.push(
          v !== null && typeof v === 'object'
            ? serialize.serializeQueryParams(v, k)
            : k + '=' + v
        )
      }
    }
    return str.join('&')
  }
}
