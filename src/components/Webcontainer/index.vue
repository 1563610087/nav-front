<template>
  <div class="web-container">
    <div class="title">
      <div>
        <i class="el-icon-star-off" />
        {{ data.web_name }}
      </div>
      <div v-if="settingStatus">
        <el-button type="primary" size="small" round @click="changeStatus">设置</el-button>
      </div>
      <div v-else>
        <el-button
          type="primary"
          size="small"
          round
          class="el-icon-plus"
          @click="handleSite"
        >添加网站</el-button>
        <el-button type="success" size="small" round>排序</el-button>
        <el-button
          type="warning"
          size="small"
          round
          icon="el-icon-edit"
          @click="getIcon('edit')"
        >编辑</el-button>
        <el-button
          type="danger"
          size="small"
          round
          icon="el-icon-delete"
          @click="getIcon('delete')"
        >删除</el-button>
        <el-button
          type="info"
          size="small"
          round
          @click="changeStatus"
        >完成</el-button>
      </div>
    </div>
    <div class="websites">
      <div v-for="item in data.list" :key="item.id" class="item">
        <a :href="item.site_url" target="blank">
          <div class="item-wraper">
            <div>
              <!-- <img :src="item.site_url + '/favicon.ico'" /> -->
              <!-- <img src='../../../public/favicon.ico'> -->
              {{ item.site_name }}
            </div>
            <div>{{ item.site_describe }}</div>
          </div>
        </a>
        <!-- 图标 -->
        <span
          v-if="showIcon"
          :class="iconStatus === 'delete' ? 'el-icon-error' : 'el-icon-edit'"
          class="delete"
          @click="handleStatus(item)"
        />
      </div>
    </div>
    <!-- 添加网站或更新网站 -->
    <el-dialog
      :title="iconStatus === 'edit' ? '编辑网站' : '添加网站'"
      :visible.sync="addSiteDialog"
      width="400px"
    >
      <el-form
        ref="ruleForm"
        :model="addSite"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="网站名称:" prop="siteName">
          <el-input
            v-model="addSite.siteName"
            size="medium"
            placeholder="请输入网站名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="网站地址:" prop="siteUrl">
          <el-input
            v-model="addSite.siteUrl"
            size="medium"
            placeholder="请输入网站地址"
            clearable
          />
        </el-form-item>
        <el-form-item label="网站描述:">
          <el-input
            v-model="addSite.siteDescribe"
            size="medium"
            placeholder="请输入网站描述"
            clearable
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="medium"
          @click="addSiteDialog = false"
        >取 消</el-button>
        <el-button
          size="medium"
          type="primary"
          @click="addSite2('ruleForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除网站 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="400px">
      <span>确定要删除该网站吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSite">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 回到顶部 -->
  </div>
</template>

<script>
import { addSite, delSite, updateSite } from '@/api/table'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      settingStatus: true,
      settingVisible: false,
      addSiteDialog: false, // 添加网站
      showIcon: false,
      iconStatus: 'delete',
      editSiteVisible: false,
      deleteVisible: false,
      currentItem: {},
      addSite: {
        siteName: '',
        siteUrl: '',
        websiteId: this.data.website_id,
        siteDescribe: '',
        siteId: ''
      },
      rules: {
        siteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20个字符', trigger: 'blur' }
        ],
        siteUrl: [
          { required: true, message: '请输入网站地址', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},

  methods: {
    handleDialog() {
      this.settingVisible = true
    },
    changeStatus() {
      this.settingStatus = !this.settingStatus
      this.showIcon = false
    },
    // 设置添加网站状态
    handleSite() {
      this.addSiteDialog = true
      this.editSiteVisible = false
    },
    getIcon(type) {
      this.showIcon = !this.showIcon
      this.iconStatus = type
    },
    // 图标编辑状态或者删除状态
    handleStatus(item) {
      this.currentItem = item
      if (this.iconStatus === 'edit') {
        this.addSite = {
          siteName: item.site_name,
          siteUrl: item.site_url,
          websiteId: item.website_id,
          siteDescribe: item.site_describe,
          siteId: item.site_id
        }
        this.addSiteDialog = true
        this.editSiteVisible = true
      } else {
        this.deleteVisible = true
      }
    },
    // 重置数据
    resetData() {
      this.addSite = {
        siteName: '',
        siteUrl: '',
        websiteId: this.data.website_id,
        siteDescribe: '',
        siteId: ''
      }
    },
    // 添加或者编辑网站
    addSite2(formName) {
      const getdata = this.editSiteVisible ? updateSite : addSite
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getdata(this.addSite).then(() => {
            this.addSiteDialog = false
            this.$parent.getData()
            this.resetData()
          })
        } else {
          return false
        }
      })
    },
    // 删除网站
    deleteSite() {
      delSite({ siteId: this.currentItem.site_id }).then(() => {
        this.deleteVisible = false
        this.$parent.getData()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.web-container {
  width: 85%;
  margin: 0 auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  .title {
    flex: 0 0 50px;
    display: flex;
    font-size: 16px;
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #eaeaea;

    div:nth-child(1) {
      flex: 0 0 150px;

      i {
        color: #f56c6c;
        font-weight: 600;
      }
    }

    div:nth-child(2) {
      flex: 1;
      text-align: right;
    }
  }
}

.websites {
  margin-left: 1%;
  padding: 10px 0;
  font-size: 14px;
  color: #262729;
  display: flex;
  flex-flow: row wrap;

  .item {
    width: 16.5%;
    padding: 10px;
    cursor: pointer;
    position: relative;

    .item-wraper {
      height: 74px;
      padding: 5px 10px;
      background: #fafafa;

      &:hover {
        background: #6b7184;
        box-shadow: 2px 4px 15px 8px rgba(107, 113, 132, 0.3);
        transform: translateY(-6px);
        transition: all 0.3s ease;
      }

      &:hover div:nth-child(1) {
        color: white;
      }
      &:hover div:nth-child(2) {
        color: #f4f8fd;
      }

      div:nth-child(1) {
        color: #5e616b;
        font-weight: 700;

        img {
          width: 30px;
          height: 30px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 10px;
          vertical-align: middle;
        }
      }

      div:nth-child(2) {
        color: #a1a7b7;
        height: 34px;
        font-size: 12px;
        line-height: 14px;
        padding-top: 6px;
        overflow: hidden;
      }
    }

    .delete {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 18px;
      color: #bf4444;
    }
  }
}
</style>
