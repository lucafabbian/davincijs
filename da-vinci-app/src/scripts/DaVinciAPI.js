import Axios from 'axios'

export default {
  install (Vue) {
    Vue.prototype.$DaVinciAPI = Axios.create({
      baseURL: 'http://www.liceodavinci.tv/api',
      timeout: 1000
    })
  }
}
