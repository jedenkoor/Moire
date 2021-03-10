import serialize from '@/functions/serializeQueryParams.js'

export default {
  serializeQueryParams(obj, prefix) {
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
