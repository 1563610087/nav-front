<template>
  <div class="app-top">
    <el-button
      type="success"
      size="medium"
      @click="addClass"
    >添加分类</el-button>
    <el-button
      type="warning"
      size="medium"
      @click="editClass"
    >编辑分类</el-button>
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
            @keyup.native.enter="handleClass"
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
    <el-dialog title="编辑分类" :visible.sync="editClassVisible" width="400px">
      <el-form
        ref="edit"
        :model="editData"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="选择分类:" prop="id">
          <el-select
            v-model="editData.id"
            filterable
            placeholder="选择要编辑的分类"
            size="medium"
            clearable
          >
            <el-option
              v-for="item in webData.list"
              :key="item.website_id"
              :label="item.web_name"
              :value="item.website_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称:" prop="webName">
          <el-input
            v-model="editData.webName"
            size="medium"
            placeholder="请输入分类名称"
            clearable
            @keyup.native.enter="_updateClass"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editClassVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="_updateClass"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addWeb, updateClass } from '@/api/table'
export default {
  props: {
    classifyId: {
      type: Number,
      required: true
    },
    webData: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      addClassVisible: false,
      editClassVisible: false,
      keyWord: '',
      options: [],
      addData: {
        webName: ''
      },
      editData: {
        website_id: '',
        webName: ''
      },
      rules: {
        website_id: { required: true, message: '请输入分类名称', trigger: 'onchange' },
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
        classifyId: this.classifyId,
        webName: this.addData.webName
      }
      addWeb(data).then(() => {
        this.addClassVisible = false
        this.$parent.getData()
      })
    },
    editClass() {
      this.editClassVisible = true
    },
    _updateClass() {
      this.$refs.edit.validate((valid) => {
        if (valid) {
          updateClass(this.editData).then(data => {
            this.$message.success(data.message)
          })
        } else {
          return false
        }
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
