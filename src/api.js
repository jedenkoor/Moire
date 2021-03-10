import { API_BASE_URL } from '@/config.js'

export default {
  async fetchApi(url, method = 'GET', data) {
    let params = {}

    if (data) {
      params = {
        method,
        body: JSON.stringify(data)
      }
    } else {
      params = {
        method
      }
    }

    const response = await fetch(`${API_BASE_URL}/${url}`, params)
    const json = await response.json()
    return json
  }
}
