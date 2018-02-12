<template>
  <div class="flex box">
    <h2 class="title is-6">Output CSS</h2>
    <textarea
      class="textarea flex-1"
      :value="outputCSS"
      readonly></textarea>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['outputCSS'])
  }
}
</script>

