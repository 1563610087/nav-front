<template>
  <div>
    <el-upload
      v-show="imageUrl.length < config.maxNum"
      :data="dataObj"
      :disabled="disabled"
      list-type="picture-card"
      accept="image/png, image/jpeg, image/jpg, video/mp4"
      action=""
      :auto-upload="true"
      :show-file-list="false"
      :on-change="handleCrop"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <div v-if="config.type !== 'text'" class="image-preview">
      <div v-show="imageUrl.length > 0">
        <div v-for="(url, index) in imageUrl" :key="index" class="image-preview-wrapper">
          <el-image
            v-if="option.outputType!=='mp4'"
            :src="imgBaseUrl + url + '?x-oss-process=style/small300x300'"
            :preview-src-list="[imgBaseUrl + url + '?x-oss-process=style/small300x300']"
          />
          <video
            v-else
            :src="imgBaseUrl + url + '?x-oss-process=style/small300x300'"
            :preview-src-list="[imgBaseUrl + url + '?x-oss-process=style/small300x300']"
          />
          <p v-if="!disabled" class="image-preview-action">
            <span @click="rmImage(url)">删除</span>
          </p>
        </div>
      </div>
    </div>
    <el-dialog
      title="图片裁切"
      class="cropper-dialog"
      :close-on-click-modal="false"
      :visible="dialogVisible"
      :append-to-body="true"
      :fullscreen="true"
      center
      style="width: 3000px;
      height: 1500px;
      transform: scale(0.4) translate(-50%, -1000px);"
      @close="close"
    >
      <div class="cropper-wrap">
        <div
          class="cropper-box"
          :style="{ width: config.width + 'px', height: config.height + 'px', 'min-height': '600px', 'min-width': '500px'}"
        >
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :fixed="fixed"
            :fixed-number="(config.width && config.height) ? [config.width, config.height] : fixedNumber"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="config.width || option.autoCropWidth"
            :auto-crop-height="config.height || option.autoCropHeight"
            :center-box="option.centerBox"
            :high="option.high"
            mode="container"
            :max-img-size="option.max"
            @realTime="realTime"
          />
        </div>
        <div class="preview-box">
          <div class="preview-title">
            <!-- <span>预览</span> -->
            <span class="preveiw-upload" @click="upload">重新上传</span>
          </div>
          <input
            ref="upload"
            type="file"
            style="position:absolute; clip:rect(0 0 0 0);"
            accept="image/png, image/jpeg, image/jpg, video/mp4"
            @change="uploadImg"
          >
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="finish">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OSS from 'ali-oss'
const client = new OSS({
  // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
  region: 'oss-cn-qingdao',
  // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
  accessKeyId: 'LTAI5tFxE7u7QqdPiDvWV2vy',
  accessKeySecret: '2VVHV4WqfXlREiV98PqN73muiXnFjp',
  bucket: process.env.VUE_APP_IMG_BUCKET
})
import { VueCropper } from 'vue-cropper'
export default {
  name: 'ImageCropper',
  components: {
    VueCropper
  },
  props: {
    config: {
      type: Object,
      default: () => { return {} }
    },
    value: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      propsVal: this.value,
      tempUrl: '',
      dataObj: { token: '', key: '' },
      canCropper: false,
      option: {
        img: '',
        size: 0.9,
        full: false,
        outputType: 'jpeg',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 1080,
        autoCropHeight: 1190,
        centerBox: true,
        high: false,
        max: 99999
      },
      show: true,
      fixed: true,
      fixedNumber: [1080, 1190],
      // 防止重复提交
      loading: false,
      preview: {},
      previewStyle: {},
      dialogVisible: false,
      cropperOption: {
        img: null
      },
      cropperStyle: {},
      fileSize: 10,
      // 裁剪预览图片缩放比例
      zoom: 1
    }
  },
  computed: {
    ...mapGetters([
      'imgBaseUrl'
    ]),
    imageUrl: {
      // getter
      get: function() {
        let result = []
        console.log(this.propsVal, this.value, '111') // 802165933611242515252-w-300-h-225.jpeg,8021659336124568698368-w-300-h-225.jpeg
        if (this.value) {
          if (Object.prototype.toString.call(this.value) === '[object Array]') {
            result = this.value
          } else {
            const arr = this.value.split(',')
            arr.map(item => {
              result.push(item)
            })
          }
        }
        return result
      },
      // setter
      set: function(newValue) {
        console.log(newValue, '222')
        this.propsVal = newValue
      }
    }
  },
  methods: {
    rmImage(url) {
      const arr = [...this.imageUrl]
      const index = arr.indexOf(url)
      console.log(url, index, '333')
      if (index > -1) {
        arr.splice(index, 1)
      }
      console.log(arr, '444')
      this.imageUrl = arr
      this.emitInput(arr.join(','))
    },
    handleImageSuccess(file) {
      console.log(file, '4442')
      this.emitInput(file.files.file)
    },
    uploadFile(params) {
      // const that = this
      const file = params.file
      console.log(file, '555')
    },
    handleCrop(file) {
      // 点击弹出剪裁框
      this.$nextTick(() => {
        if (this.canCropper) {
          this.cropperOption.img = window.URL.createObjectURL(file.raw) // 将图片转化为路径
          this.option = Object.assign(this.option, this.cropperOption)
          this.dialogVisible = this.canCropper
        }
      })
    },
    beforeAvatarUpload(file) {
      // 上传前校验
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'video/mp4'
      // const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传文件只能是 JPG/PNG/mp4 格式!')
      }
      let numLimit = true
      if (this.imageUrl.length === this.config.maxNum) {
        numLimit = false
        this.$message.error('最多上传上传' + this.config.maxNum + '张图片/视频!')
      }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 10 MB!')
      // }
      // console.log(isJPG && isLt2M)
      // 校验通过后显示裁剪框
      this.canCropper = isJPG && numLimit
      return false
    },
    upload() { // 点击上传
      this.$refs.upload.value = null
      this.$refs.upload.click()
    },
    uploadImg(e) { // 上传图片
      const file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG|mp4)$/.test(e.target.value)) {
        this.$message.error(file.name + '不是图片/视频格式文件')
        return false
      }
      if (file.size > 1024 * 1024 * this.fileSize) { // 图片不大于2M
        this.$message.error(`请上传小于${this.fileSize}M的图片/视频`)
        return false
      }
      const reader = new FileReader()
      // 转化为blob
      reader.readAsArrayBuffer(file)
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.$set(this.option, 'img', data)
      }
    },
    realTime(preview) { // 实时预览
      this.preview = preview
      this.previewStyle = {
        width: preview.w + 'px',
        height: preview.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: this.zoom
      }
    },
    // 将base64转换为文件
    dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let len = bstr.length
      const u8arr = new Uint8Array(len)
      while (len--) {
        u8arr[len] = bstr.charCodeAt(len)
      }
      return new File([u8arr], filename, { type: mime })
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    // 将base64转换为png文件图片
    finish() {
      const that = this
      this.$refs.cropper.getCropData(data => {
        const file = this.dataURLtoFile(data, 'images.jpeg')
        console.log(file, '666') // data为转的大串编码 File则是{name: 'images.jpeg', lastModified: 1659336618393, webkitRelativePath: '', size: 13493...
        // this.close()
        const reader = new FileReader()
        reader.onload = function(evt) {
          const nameArr = file.name.split('.')
          var suffix = '.' + nameArr[nameArr.length - 1] // 获取文件后缀名
          var filename = that.prefix + new Date().getTime() + Math.floor(Math.random() * 999999) + '-w-' + this.width + '-h-' + this.height + suffix // 为文件命名
          console.log(file.size, filename, that.config.width, that.config.height, that.config.maxSize) // 13493 '802165933661839679165-w-300-h-225.jpeg' 400 300 5
          if (that.config.maxSize) {
            const isLtSize = file.size / 1024 / 1024 > that.config.maxSize
            if (isLtSize) {
              let maxSizeForShow = that.config.maxSize + 'MB'
              if (that.config.maxSize < 1) {
                maxSizeForShow = that.config.maxSize * 1024 + 'KB'
              }
              that.$notify({
                title: '提示',
                type: 'error',
                message: '请不要上传大于' + maxSizeForShow + '的图片文件',
                duration: 2000
              })
              return
            }
          }
          // if ((this.width === that.config.width) && (this.height === that.config.height)) {
          client.put(filename, file).then((result) => {
            console.log(result, '888') // {name: '802165933661839679165-w-300-h-225.jpeg', url: 'http://cls-res-devtest.oss-cn-qingdao.aliyuncs.com/802165933661839679165-w-300-h-225.jpeg', res: {…}}
            that.imageUrl.push(result.name)
            that.emitInput(that.imageUrl.join(','))
            that.dialogVisible = false
            if (that.config.type === 'text') {
              that.$emit('submitData')
            }
          }).catch((err) => {
            console.log(err)
          })
          // image.src = evt.target.result
        }
        reader.readAsDataURL(file)
      })
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.cropper-dialog  {
  & ::v-deep .el-dialog{
    width: max-content;
    margin-top: 0;
  }
  & ::v-deep .el-dialog__body {
    padding: 20px;
  }
  & ::v-deep .el-button {
    width: 145px;
  }
  & ::v-deep .el-dialog__title {
    font-size: 45px;
    line-height: 48px;
  }
  & ::v-deep .el-dialog__footer {
    transform: scale(2.5);
    margin-top: 40px;
    padding: 20px 20px 0px;
  }
  & ::v-deep .el-dialog__close {
    font-size: 40px;
  }
  & ::v-deep .crop-info {
    transform: scale(2.5);
    left: 48px;
    top: 14px !important;
  }
}
.cropper-wrap{
  display: flex;
  .cropper-box{
    margin-top: 33px;
    margin-right: 20px;
    width: 1080px;
    height: 1190px;
  }
  .preview-box{
    .preview-title {
      span {
        font-size: 35px;
      }
      margin-top: 30px;
      display: flex;
      min-width: 100px;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      color: rgba(30,35,48,1);
      font-family: PingFangSC-Medium;
      .preveiw-upload {
        color: #0067ED;
        cursor: pointer;
      }
    }
    .preview-img{
      border-radius: 2px;
    }
  }
}
.image-preview {
  .image-preview-wrapper {
    width: 145px;
    height: 145px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-top: 22px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .image-preview-action {
    // position: absolute;
    // width: 100%;
    // height: 100%;
    // left: 0;
    // top: 0;
    // cursor: default;
    // text-align: center;
    // color: #fff;
    // opacity: 0;
    // font-size: 20px;
    // background-color: rgba(0, 0, 0, .5);
    // transition: opacity .3s;
    // cursor: pointer;
    // text-align: center;
    // line-height: 145px;
    // .el-icon-delete {
    //   font-size: 36px;
    // }
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 0;
    left: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    transition: opacity .3s;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    background-color: rgba($color: #000000, $alpha: 0.4);
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
  &:hover {
    .image-preview-action {
      opacity: 1;
    }
  }
}
.fun-btn{
  margin-top: 16px;
  i{
    margin-right: 16px;
    font-size: 18px;
    color: #8c8c8c;
    cursor: pointer;
    &:hover{
      color: #0067ED;
    }
  }
  .reUpload{
    margin-right: 16px;
  }
}
</style>
