import Vue from 'vue'

const keyframes = [
  {
    selector: '#foo',
    delay: 1,
    duration: 2,
    easing: 'ease'
  }
]

export default {
  state: {
    // keyframes: [],
    keyframes,
  },
  getters: {
    sortedKeyframes(state) {
      return [...state.keyframes].sort((a, b) => true)
    },
    outputCSS(state) {
      return state.keyframes.map((kf, i) => {
        const animName = `kf-gen-${i}`
        return `${kf.selector} {
  animation: ${animName} ${kf.duration}s ${kf.delay}s ${kf.easing};
}

@keyframes ${animName} {
}
`
      }).join('\n')
    }
  },
  mutations: {
    addKeyframe(state, keyframe = {}) {
      keyframe = {
        duration: 1,
        delay: 0,
        ...keyframe
      }
      state.keyframes.push(keyframe)
    },
    removeKeyframe(state, index) {
      state.keyframes.splice(index, 1)
    },
    updateKeyframe(state, { index, keyframe }) {
      Vue.set(state.keyframes, index, {
        ...state.keyframes[index],
        ...keyframe
      })
    }
  }
}