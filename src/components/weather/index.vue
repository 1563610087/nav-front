<template>
  <div class="weather">
    <div id="he-plugin-simple" />
  </div>
</template>
<script>
export default {
  mounted() {
    // 天气插件配置
    window.WIDGET = {
      CONFIG: {
        modules: '01234',
        background: '5',
        tmpColor: '434343',
        tmpSize: '16',
        cityColor: '434343',
        citySize: '16',
        aqiColor: '434343',
        aqiSize: '16',
        weatherIconSize: '24',
        alertIconSize: '18',
        padding: '10px 10px 10px 10px',
        shadow: '0',
        language: 'auto',
        fixed: 'false',
        vertical: 'center',
        horizontal: 'center',
        key: 'f93661a60e52408d9ffa4b8ad15b5b9b'
      }
    }
    // 引入天气插件
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'
    document.body.appendChild(s)
  }
}
</script>
<style lang='scss' scoped>
.weather {
  margin-left:50px;
  width: 160px;
  height: 50px;
  padding-top: 2px;
  position: relative;
  z-index: 1003;
}
</style>
