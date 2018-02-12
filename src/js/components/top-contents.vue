<template>
  <div class="container margin flex">
    <div class="tabs">
      <ul>
        <li :class="active('html')"><a href="#" @click="toggleTab('html')">HTML</a></li>
        <li :class="active('preview')"><a href="#" @click="toggleTab('preview')">Preview</a></li>
        <li :class="active('output')"><a href="#" @click="toggleTab('output')">Output CSS</a></li>
      </ul>
    </div>
    <div class="tile is-ancestor is-vertical">
      <div class="tile top">
        <div class="tile is-parent" v-show="tabs.html">
          <html-input class="tile is-child" />
        </div>
        <div class="tile is-parent" v-show="tabs.preview">
          <preview class="tile is-child" />
        </div>
        <div class="tile is-parent" v-show="tabs.output">
          <output-css class="tile is-child" />
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child">
          <keyframes />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import htmlInput from './html-input'
import preview from './preview'
import keyframes from './keyframes'
import outputCss from './output-css'

export default {
  data() {
    return {
      tabs: {
        html: true,
        preview: true,
        output: false
      }
    }
  },
  methods: {
    toggleTab(name) {
      this.tabs[name] = !this.tabs[name]
    },
    active(name) {
      return {
        'is-active': this.tabs[name]
      }
    }
  },
  components: {
    htmlInput,
    preview,
    keyframes,
    outputCss
  }
}
</script>

<style scoped>
.margin {
  margin-bottom: 1.5rem;
}
</style>
