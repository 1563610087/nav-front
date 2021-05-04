<template>
  <div class="home-container">
    <SearchEngine />
  </div>
</template>

<script>
import SearchEngine from '@/components/SearchEngine'

export default {
  name: 'Home',
  components: {
    SearchEngine
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
