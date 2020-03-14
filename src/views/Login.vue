<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <!-- 标题 -->
          <h1 class="title">系统登陆</h1>
          <!-- 表单 -->
          <el-form ref="loginForm" :model="loginForm" :rules="rules">
            <!-- 登陆名 -->
            <el-form-item prop="name">
              <el-input
                prefix-icon="el-icon-user-solid"
                v-model="loginForm.name"
                placeholder="请输入登陆名"
              ></el-input>
            </el-form-item>
            <!-- 登录密码 -->
            <el-form-item prop="pwd">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                v-model="loginForm.pwd"
                show-password
              ></el-input>
            </el-form-item>
            <!-- 登陆按钮 -->
            <el-button type="primary" @click="loginBtn('loginForm')">登陆</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      loginForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入登陆名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "登陆名长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度在6到18个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    loginBtn(from) {
      var that = this;
      this.$refs[from].validate(function(result) {
        if (result) {
          var data = {
            account: that.loginForm.name,
            password: that.loginForm.pwd
          };
          axios
            .post(
              "http://work.08321.org/sell/users.php?a=login",
              qs.stringify(data)
            )
            .then(res => {
              if (res.data.code === 0) {
                that.$message({
                  //成功提示
                  message: res.data.msg,
                  type: "success"
                });
                that.$router.push("/home/home_index"); //跳转至首页
                localStorage.setItem('ctime',res.data.data.ctime);//将创建时间保存在本地;
                localStorage.setItem("token", res.data.token);//保存token
                localStorage.setItem("id", res.data.data.id);//保存id
                localStorage.setItem('group',res.data.data.userGroup);//用户组
                localStorage.setItem('name',res.data.data.account);//将登录名存储在本地
                localStorage.setItem("AdminImg",res.data.data.imgUrl);//将头像保存在本地
              } else {
                //失败提示
                that.$message.error(res.data.msg);
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
}
.login form {
  width: 300px;
  margin: 0 auto;
}
.login .grid-content {
  margin-top: 160px;
}
.login .el-button {
  width: 300px;
}
.login .title {
  text-align: center;
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
}
</style>