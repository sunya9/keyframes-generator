<template>
  <div class="flex h-100 box">
    <h2 class="title is-6">Keyframes</h2>
    <div class="field is-grouped">
      <div class="control">
        <input class="input" placeholder="filter" type="search" v-model="filterText">
      </div>
      <div class="field has-addons">
        <div class="control">
          <button class="button">
            <i class="fa fa-play"></i>
          </button>
        </div>
        <div class="control">
          <button class="button" @click="addKeyframe()">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="keyframes-wrapper">
      <table class="table is-fullwidth keyframes" ref="keyframesWrapper">
        <thead>
          <tr>
            <th class="keyframes-header keyframes-header-keyframes" ref="label">keyframes</th>
            <th class="keyframes-header" ref="keyframes"
              :style="{
                width: `${maxWidth}px`
              }">
              <span
                v-for="label in timelineLabels"
                :key="label"
                class="keyframes-header-label"
                :style="{
                  left: `${label * 100}px`
                }"
              >
                {{label}}
              </span>
              
            </th>
          </tr>
        </thead>
        <tbody>
          <keyframe
            v-for="(keyframe, index) in keyframes"
            :key="index"
            :index="index"
            :keyframe="keyframe"
            :width="maxWidth"
            @updateScrollWidth="updateScrollWidth"
            />
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import keyframe from './keyframe.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      maxWidth: 0,
      filterText: ''
    }
  },
  computed: {
    ...mapState({
      keyframes: state => state.keyframe.keyframes
    }),
    timelineLabels() {
      return new Array(Math.floor(this.maxWidth / 100))
        .fill().map((_, i) => i)
    }
  },
  mounted() {
    this.updateScrollWidth()
    window.addEventListener('resize', () => this.$nextTick(this.updateScrollWidth))
  },
  methods: {
    ...mapMutations(['addKeyframe']),
    updateScrollWidth() {
      this.maxWidth = Math.max(this.$refs.keyframes.scrollWidth, this.$refs.keyframesWrapper.getBoundingClientRect().width) - this.$refs.label.getBoundingClientRect().width
    }
  },
  components: {
    keyframe
  }
}
</script>

<style scoped lang="scss">
@import '~bulma/sass/utilities/initial-variables';

.keyframes-wrapper {
  position: relative;
  overflow: scroll;
  height: 100%;
}
.keyframes {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex: 1;
  min-width: 100%;
  width: 100%;
  border-collapse: collapse;

  thead tr {
    border-bottom: none;
  }
  tbody {
  }
}
.keyframes-header {
  position: sticky;
  top: 0;
  background: $white;
  z-index: 2;
  border-bottom: $grey-lighter 2px solid;
}

.keyframes-header-keyframes {
  // width: 200px;
  width: 30%;
}
.left-0 {
  left: 0;
}

.keyframes-header-label {
  position: absolute;
}
</style>
