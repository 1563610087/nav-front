<template>
  <div>
    <vueLive2d
      style=""
      :model="[1, 53]"
      direction="right"
      :size="size"
    />
  </div>
</template>
<script>
import vueLive2d from 'vue-live2d'
export default {
  components: {
    vueLive2d
  },
  data() {
    return {
      size: 350
    }
  }
}
</script>
<style scoped>
</style>
