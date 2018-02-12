import Vue from 'vue'
import Vuex from 'vuex'
import keyframe from './keyframe'

Vue.use(Vuex)

const html = `\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.32 312.13"><defs><style>.a,.b{fill:none;stroke-miterlimit:10;stroke-width:15px;}.a{stroke:#fff;}.b{stroke:#c0392b;}</style></defs><title>logo</title><polygon class="a" points="135.16 303.48 7.5 229.77 7.5 82.36 135.16 8.66 262.82 82.36 262.82 229.77 135.16 303.48"/><polyline class="a" points="212.22 111.81 212.22 200.54 135.13 245.05"/><polyline class="a" points="57.87 200.54 57.87 111.43 135.13 66.82"/><line class="b" x1="185.21" y1="127.17" x2="84.99" y2="185.03"/></svg>
`

export default () => new Vuex.Store({
  state: {
    html,
  },
  modules: {
    keyframe
  },
  mutations: {
    updateHTML(state, html) {
      state.html = html
    }
  }
})
