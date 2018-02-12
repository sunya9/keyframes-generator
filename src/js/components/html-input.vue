<template>
  <div class="flex box">
    <h2 class="title is-6">HTML</h2>
    <textarea class="flex-1 textarea" @blur="format" v-model="text"></textarea>
  </div>
</template>

<script>
import pretty from 'pretty'

export default {
  mounted() {
    this.format()
  },
  methods: {
    format() {
      this.text = pretty(this.text)
    }
  },
  computed: {
    text: {
      get() {
        return this.$store.state.html
      },
      set(html) {
        this.$store.commit('updateHTML', html)
      }
    }
  }
}
</script>

