<template>
  <div class="top">
    <el-button v-if="visible" type="info" icon="el-icon-top" circle @click="toTop" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.showBtn, true)
  },
  destroyed() {
    window.removeEventListener('scroll', this.showBtn)
  },
  methods: {
    toTop() {
      const that = this
      const timer = setInterval(() => {
        const ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    showBtn() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > 0) {
        this.visible = true
      } else {
        this.visible = false
      }
    }
  }
}
</script>
<style scoped>
.top {
    position: fixed;
    bottom: 20px;
    right: 50px;
    opacity:0.5
}
</style>
