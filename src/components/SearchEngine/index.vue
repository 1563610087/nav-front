<template>
  <div class="box flex-center">
    <div class="content">
      <div class="classify flex-center">
        <span
          v-for="item in classify"
          :key="item.id"
          class="cursor"
          :class="{active:item.id===currentItem.id}"
          @click="setItem(item)"
        >
          {{ item.type }}</span>
      </div>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="input"
        clearable
        @keyup.native.enter="submit"
      >
        <el-button slot="append" icon="el-icon-search" @click="submit" />
      </el-input>
      <div class="search flex-center">
        <span
          v-for="item in currentItem.searchList"
          :key="item.id"
          class="cursor"
          :class="{active:item.id===searchType.id}"
          :href="item.url"
          @click="chooseType(item)"
        >{{ item.searchName }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { searchCategory } from '@/common/js/searchCategory'
export default {
  name: 'SearchEngine',
  data() {
    return {
      input: '',
      classify: searchCategory,
      currentItem: searchCategory[0],
      searchType: searchCategory[0].searchList[0]
    }
  },
  watch: {},
  methods: {
    submit() {
      if (this.input !== '') {
        const url = `${this.searchType.url}${this.input}`
        window.open(url)
      }
    },
    setItem(item) {
      this.currentItem = item
      this.searchType = item.searchList[0]
    },
    chooseType(item) {
      this.searchType = item
    }
  }
}
</script>
<style lang='scss' scoped>
.box {
  height: 300px;
  color: #8896B3;

  .classify {
    height: 80px;
    font-size: 18px;

    span {
      padding: 10px;
    }
  }

  .content {
    height: 200px;
    width: 700px;
  }

  .search {
    height: 80px;

    span {
      padding: 10px;
    }
  }
}

</style>
