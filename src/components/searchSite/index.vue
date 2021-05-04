<template>
  <div class="app-top">
    <el-button
      type="success"
      size="medium"
      @click="addClass"
    >添加分类</el-button>
    <el-select
      v-model="keyWord"
      filterable
      placeholder="搜索网站"
      :remote-method="searchSite"
      size="medium"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- 添加分类或编辑分类   -->
    <el-dialog title="添加分类" :visible.sync="addClassVisible" width="400px">
      <el-form
        ref="ruleForm"
        :model="addData"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称:" prop="webName">
          <el-input
            v-model="addData.webName"
            size="medium"
            placeholder="请输入分类名称"
            clearable
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClass"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addWeb } from '@/api/table'
export default {
  props: {
    classifyId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      addClassVisible: false,
      keyWord: '',
      options: [],
      addData: {
        webName: ''
      },
      rules: {
        webName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20个字符', trigger: 'blur' }
        ] }
    }
  },
  watch: {},
  methods: {
    searchSite() {},
    // 添加分类
    addClass() {
      this.addClassVisible = true
    },
    handleClass() {
      const data = {
        classify_id: this.classifyId,
        web_name: this.addData.webName
      }
      addWeb(data).then(() => {
        this.addClassVisible = false
        this.$parent.getData()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-top {
  width: 85%;
  margin: 0 auto;
  padding: 15px 20px;

  button {
    margin-right: 10px;
  }
}
</style>
