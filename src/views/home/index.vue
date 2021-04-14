<template>
  <div class="home-container">
    <div class="home-text">hello,接口测试</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    console.log(process.env)
  }
}
</script>

<style lang="scss" scoped>
</style>
