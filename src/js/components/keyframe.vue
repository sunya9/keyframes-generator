<template>
  <tr class="keyframe-wrapper">
    <td class="keyframe-info">
      <div class="field">
        <button class="button is-text w-100 flex-start" @click="show = !show">
          <span class="icon is-small">
            <i class="fa" :class="{
              'fa-caret-right': !show,
              'fa-caret-down': show
            }"></i>
          </span>
          {{keyframe.selector || `keyframe${index}`}}
        </button>
      </div>
      <div v-if="show">
        <div class="field">
          <div class="control has-icons-left">
            <input type="text"
            :id="id('selector')"
            class="input is-small"
            placeholder="selector"
            :value="keyframe.selector"
            @input="updateKeyframe({ index, keyframe: { selector: $event.target.value } })">
            <span class="icon is-left">
              <i class="fa fa-dollar"></i>
            </span>
          </div>
        </div>
        <div class="field has-addons">
          <div class="control has-icons-left is-expanded">
            <input type="number"
            :id="id('duration')"
            class="input is-small has-text-right"
            step="0.01"
            min="0"
            placeholder="duration"
            :value="keyframe.duration"
            @input="updateKeyframe({ index, keyframe: { duration: +$event.target.value } })">
            <span class="icon is-left">
              <i class="fa fa-clock-o"></i>
            </span>
          </div>
          <div class="control"><button class="button is-static is-small">s</button></div>
        </div>
        <div class="field has-addons">
          <div class="control has-icons-left is-expanded">
            <input type="number"
            :id="id('delay')"
            class="input is-small has-text-right"
            min="0"
            step="0.01"
            placeholder="delay"
            :value="keyframe.delay"
            @input="updateKeyframe({ index, keyframe: { delay: +$event.target.value } })">
            <span class="icon is-left">
              <i class="fa fa-arrow-right"></i>
            </span>
          </div>
          <div class="control"><button class="button is-static is-small">s</button></div>
        </div>
        <button class="button" @click="removeKeyframe(index)">
          <div class="icon">
            <i class="fa fa-trash"></i>
          </div>
        </button>
      </div>
    </td>
    <td class="">
      <div class="timeline" :style="{
        width: `${width}px`
      }" @click="move">
        <div class="keyframe"
          v-show="keyframe.duration"
          @click.prevent
          @mousedown="bindMove"
          @mouseup="unbindMove"
          :style="{
            width: `${keyframe.duration * 100}px`,
            left: `${keyframe.delay * 100}px`
          }">
          <div class="keyframe-handle handle-left"
            @mousedown.stop
          ></div>
          <div class="keyframe-handle handle-right"
          ></div>
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    keyframe: Object,
    index: Number,
    width: {
      type: Number
    }
  },
  data() {
    return {
      start: 0,
      show: false
    }
  },
  computed: {
  },
  watch: {
    keyframe: {
      deep: true,
      handler(kf) {
        this.$emit('updateScrollWidth')
      }
    }
  },
  methods: {
    ...mapMutations(['updateKeyframe', 'removeKeyframe']),
    id(name) {
      return `keyframe-${this.index}-${name}`
    },
    disableDrag(e) {
      e.preventDefault()
    },
    bindMove(e) {
      window.addEventListener('mousemove', this.move)
      window.addEventListener('mouseup', this.unbindMove)
      window.addEventListener('selectstart', this.disableDrag)
      this.start = e.pageX
    },
    unbindMove(e) {
      window.removeEventListener('mousemove', this.move)
      window.removeEventListener('mouseup', this.unbindMove)
      window.removeEventListener('selectstart', this.disableDrag)
    },
    
    move(e) {
      const diff = (e.pageX - this.start) * 0.01
      const delay = this.keyframe.delay + diff < 0
        ? 0
        : +((this.keyframe.delay + diff).toFixed(2))
      this.start = e.pageX
      this.updateKeyframe({
        index: this.index,
        keyframe: {
          delay
        }
      })
    },
    bindStretch(e) {
      this.start = e.pageX
      window.addEventListener('mousemove', this.stretch)
      window.addEventListener('mouseup', this.unbindStretch)
    },
    unbindStretch(e) {
      window.removeEventListener('mousemove', this.stretch)
      window.removeEventListener('mouseup', this.unbindStretch)
    },
    stretch(e) {

    }
  }
}
</script>

<style scoped lang="scss">
@import '~bulma/sass/utilities/initial-variables';

td {
  border-bottom: 0;
  padding: 1px 0;
}

.keyframe-info {
  position: sticky;
  left: 0;
  background: rgba($white, .5);
}
.field-label {
  flex-grow: 4;
}
.timeline {
  background-image: linear-gradient(90deg,
    #ccc 0, #ccc 1px,
    transparent 1px, transparent 10px,
    #eee 10px, #eee 11px,
    transparent 11px, transparent 20px,
    #eee 20px, #eee 21px,
    transparent 21px, transparent 30px,
    #eee 30px, #eee 31px,
    transparent 31px, transparent 40px,
    #eee 40px, #eee 41px,
    transparent 41px, transparent 50px,
    #ddd 50px, #ddd 51px,
    transparent 11px, transparent 60px,
    #eee 60px, #eee 61px,
    transparent 21px, transparent 70px,
    #eee 70px, #eee 71px,
    transparent 31px, transparent 80px,
    #eee 80px, #eee 81px,
    transparent 41px, transparent 90px,
    #eee 90px, #eee 91px,
    transparent 91px, transparent 100px
  );
  background-clip: border-box;
  background-size: 100px 100%;
  min-width: calc(100%  - 10px);
  display: flex;
  flex-direction: column;
  height: 100%;
}
.keyframe {
  flex: 1;
  box-sizing: border-box;
  position: relative;
  background: $green;
  border: 5px solid darken($green, 5%);
  margin: 1px 0;
  opacity: .7;
  cursor: move;
  .keyframe-handle {
    position: absolute;
    content: '';
    cursor:  ew-resize;
    width: 5px;
    top: -5px;
    height: calc(100% + 10px);
  }
  .handle-left {
    left: -5px;
  }
  .handle-right {
    right: -5px;
  }
}
details {
  .input, .button {
    height: auto;
    // width: auto;
  }
  .control {
    margin-right: 1rem;
  }
}
</style>
