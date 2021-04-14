import { API_BASE_URL } from '@/config.js'
import serialize from '@/functions/serializeQueryParams.js'

export default {
  async fetchApi(url, method = 'GET', data) {
    const params = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: data ? serialize.serializeQueryParams(data) : undefined
    }

    const response = await fetch(`${API_BASE_URL}/${url}`, params)
    const json = await response.json()

    if (!response.ok) {
      const e = new Error()
      e.message = json.error.message
      e.code = json.error.code
      throw e
    }

    return json
  }
}
