import axios from 'axios'
import { API_BASE_URL, ENABLE_PROXY, SITE_URL } from 'common/config/env'

const BASE_URL = ENABLE_PROXY ? `${SITE_URL}/apiProxy` : API_BASE_URL

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
})
