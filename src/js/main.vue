<template>
  <div class="holygrail">
    <nav class="navbar" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <div class="navbar-item">
            <span class="title is-3">
              {{productName}}
            </span>
          </div>
        </div>
      </div>
    </nav>
    <div class="holygrail-body">
        <top-contents />
      </div>
    </div>
  </div>
</template>
<script>
import store from './store'
import { productName } from '../../package'
import topContents from './components/top-contents'

export default {
  store,
  data() {
    return {
      productName
    }
  },
  components: {
    topContents
  }
}
</script>
<style scoped>
.holygrail {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.holygrail-body {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.holygrail-body > div {
  width: 100%;
}
.top {
  max-height: 40vh;
}

</style>
