import { createStore } from 'vuex'
const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
export default createStore({ modules })

/**
 * 在vuex以外使用vuex需加上'文件名/'
 */
