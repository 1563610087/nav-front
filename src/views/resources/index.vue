<template>
  <div>
    <SearchSite :classify-id="classifyId" :data="data" />
    <div v-for="item in data.list" :key="item.id" class="app-container">
      <Webcontainer :data="item" />
    </div>
    <GoTop />
  </div>
</template>

<script>
import Webcontainer from '@/components/Webcontainer'
import SearchSite from '@/components/searchSite'
import GoTop from '@/components/goTop'
import { allSites } from '@/api/table'
export default {
  components: {
    Webcontainer,
    SearchSite,
    GoTop
  },
  data() {
    return {
      classifyId: 3,
      data: {

      }
    }
  },
  watch: {},
  created() {
    this.getData()
  },

  methods: {
    getData() {
      const param = {
        classifyId: 3,
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
