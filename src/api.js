import { API_BASE_URL } from '@/config.js'
import serialize from '@/functions/serializeQueryParams.js'

export default {
  async fetchApi(url, method = 'GET', data) {
    let params = {}

    if (data) {
      params = {
        method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: serialize.serializeQueryParams(data)
      }
    } else {
      params = {
        method
      }
    }
    let response = {}

    // setTimeout(async () => {
    response = await fetch(`${API_BASE_URL}/${url}`, params)
    // }, 10000)

    const json = await response.json()
    return json
  }
}
