<template>
  <div class="home-container">
    <SearchEngine />
    <!-- <VueLive2d
      style="position: fixed; bottom: 0; right: 0;"
      :model="[1, 53]"
      direction="right"
      size="350"
    /> -->
  </div>

</template>

<script>
import SearchEngine from '@/components/SearchEngine'
// import VueLive2d from '@/components/vueLive2d'
export default {
  name: 'Home',
  components: {
    SearchEngine
    // VueLive2d
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
