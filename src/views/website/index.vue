<template>
  <div>
    <SearchSite :classify-id="classifyId" :data="data" />
    <div v-for="item in data.list" :key="item.id" class="app-container">
      <WebContainer :data="item" />
    </div>
    <GoTop />
  </div>
</template>

<script>
import WebContainer from '@/components/Webcontainer'
import GoTop from '@/components/goTop'
import SearchSite from '@/components/searchSite'
import { allSites } from '@/api/table'
export default {
  components: {
    WebContainer,
    SearchSite,
    GoTop
  },
  data() {
    return {
      classifyId: 1,
      data: {

      }
    }
  },
  watch: {
    $route: {
      immediate: true, // 一旦监听到路由的变化立即执行
      handler(to, from) {
        this.classifyId = to.meta.id
      }
    }

  },
  created() {
    this.getData()
  },

  methods: {
    getData(id) {
      const param = {
        classifyId: this.classifyId,
        classifyType: '1'
      }
      allSites(param).then(({ data }) => {
        // 深拷贝
        this.data = data
      })
    }
  }
}
</script>
<style scoped>
.app-container {
  background: #f2f2f2;
}
</style>
