<template>
  <div class="flex box">
    <h2 class="title is-6">Preview</h2>
    <div class="preview">
      <div v-html="html" class="preview-inner"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['html'])
  }
}
</script>
<style scoped lang="scss">
.preview {
  background-color: #fff;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), 
  linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
  background-size:60px 60px;
  background-position:0 0, 30px 30px;
  position: relative;
  overflow: auto;
  flex: 1;
  display: flex;
}
.preview-inner {
  display: flex;
  flex: 1;
  /deep/ > * {
    flex: 1;
  }
}
</style>
