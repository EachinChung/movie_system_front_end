<template>
  <div class="login">
    <el-row type="flex" justify="center">
      <div class="user-login">
        <div class="login-header">
          <h2>电影信息展示平台</h2>
          <p>v1.0.0</p>
        </div>
        <el-form ref="loginForm" :model="form" :rules="rules">

          <el-form-item v-if="isErr">
            <el-alert
              :title="err"
              :closable="false"
              type="error"
              show-icon
            >
            </el-alert>
          </el-form-item>

          <!-- 输入框 -->
          <el-form-item prop="nickname">
            <el-input
              placeholder="用户名"
              v-model="form.nickname"
              clearable
            />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              placeholder="邮箱"
              v-model="form.email"
              clearable
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              v-model="form.password"
              show-password
            />
          </el-form-item>

          <el-form-item prop="passwordConfirm">
            <el-input
              placeholder="确认密码"
              v-model="form.passwordConfirm"
              show-password
            />
          </el-form-item>

          <el-form-item prop="sex">
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="0">女</el-radio>
          </el-form-item>

          <el-form-item>
            <el-button class="login-button" type="primary" :loading="loading" @click="submitLogin">注册</el-button>
          </el-form-item>

        </el-form>
        <div class="login-footer">
          <p>© {{ year }} 毕业设计</p>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import {reactive, ref} from 'vue'
import axios from "axios";


export default {
  name: 'SignUp',
  setup() {
    const form = reactive({email: "", password: "", passwordConfirm: "", nickname: "", sex: "1"})
    const loginForm = ref(null)
    const loading = ref(false)
    const isErr = ref(false)
    const err = ref("")

    const submitLogin = () => {
      loginForm.value.validate(async (valid) => {
        if (valid) {
          loading.value = true
          const {data} = await axios.post("/api/users", form)
          console.log(data)
          if (data.code !== "0000") {
            isErr.value = true
            err.value = data.message
          } else {
            location.href = "/#/login"
          }
          loading.value = false
        } else {
          return false;
        }
      });
    }

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (form.passwordConfirm !== '') {
          loginForm.value.validateField('passwordConfirm');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      form, loginForm, loading, submitLogin, isErr, err,
      year: new Date().getFullYear(),
      rules: {
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        passwordConfirm: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
      }
    }
  },
}
</script>

<style lang="less" scoped>
.el-alert {
  padding: 0 16px;
  border-radius: 4px;
  border: 1px solid #ffccc7;;
}

.login {
  background-color: #f2f2f2;
  background-size: 100%;
  height: 100vh;
}

.user-login {
  width: 335px;
  padding: 110px 0;
  min-height: 100%;
  box-sizing: border-box;
}

.login-header {
  text-align: center;
  padding: 20px;

  h2 {
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 30px;
    color: #000;
  }

  p {
    font-weight: 300;
    color: #999;
  }
}

.login-button {
  width: 100%;
}

.login-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 30px;
  padding: 15px;
  text-align: center;
  color: rgba(0, 0, 0, .5);
  font-size: 14px;
  box-sizing: border-box;
  background-color: #f2f2f2;
}
</style>
