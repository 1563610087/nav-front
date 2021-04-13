<template>
  <div class="home-container">
    <div class="home-text">hello,大家好我是社会化</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
</style>
