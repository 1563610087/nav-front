<template>
  <div>
    <searchSite :classify-id="classifyId" :data="data" />
    <div v-for="item in data.list" :key="item.id" class="app-container">
      <webcontainer :data="item" />
    </div>
  </div>
</template>

<script>
import webcontainer from '@/components/Webcontainer'
import searchSite from '@/components/searchSite'
import { allSites } from '@/api/table'
export default {
  components: {
    webcontainer,
    searchSite
  },
  data() {
    return {
      classifyId: 7,
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
        classifyId: 7,
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
