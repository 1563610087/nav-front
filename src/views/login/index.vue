<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">哈哈哈</h3>
      </div>

      <el-form-item prop="userName">
        <el-input
          ref="username"
          v-model="loginForm.userName"
          placeholder="Username"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="Password"
          name="password"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.code"
          placeholder="验证码"
        />
        <div class="code" @click="_getCode" v-html="code" />
        <span class="text" @click="_getCode">验证码</span>
      </el-form-item>

      <el-button
        :loading="loading"
        style="width: 100%; margin-bottom: 20px; color: white"
        @click.native.prevent="handleLogin"
      >登录</el-button>
      <div class="footer">
        <span>忘记密码</span>
        <span>短信登录</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: '',
        code: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
        code: [{ required: true, trigger: 'blur' }]
      },
      code: '',
      loading: false,
      redirect: undefined
    }
  },
  created() {
    this._getCode()
  },
  methods: {
    _getCode() {
      getCode().then(res => {
        if (res.error_code === 0) {
          this.code = res.data.code
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          login(this.loginForm)
            .then((res) => {
              if (res.error_code === 0) {
                const user = decodeURIComponent(escape(window.atob(res.data.token.split('.')[1])))
                this.$store.commit('user/SET_NAME', user)
                localStorage.setItem('token', res.data.token)
                this.$router.push({ path: '/' })
              } else {
                this.$message.error(res.message)
              }
            }).finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url("../../../static/image/wallhaven-8ogod1.jpg");
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 60%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #2f6c7f;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    background-color: rgba(247, 226, 226, 0.5);
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px;
    margin: 160px auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .el-button {
    background-color: $light_gray;
  }
  .text {
    color: white;
  }

  .code{
    display: inline-block;
    width: 110px;
    text-align: center;
  }

  .footer{
    width: 100%;
    display: flex;
    color: #2f6c7f;
    justify-content: space-between;
  }
}
</style>
