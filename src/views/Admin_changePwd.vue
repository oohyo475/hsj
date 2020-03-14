<template>
  <div class="changePwd">
    <!-- 修改密码页面 -->
    <div class="content">
      <!-- 标题 -->
      <h2 class="title">添加账号</h2>
      <!-- 原密码 -->
      <el-form ref="Pwdform" :model="Pwdform" label-width="80px" :rules="rules">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="Pwdform.oldPwd" show-password></el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="Pwdform.newPwd" show-password></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="Pwdform.confirmPwd" show-password></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="changePwd">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    //定义新密码验证规则
    var validateNewPass1 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能小于6位"));
      } else {
        callback();
      }
    };
    //定义确认密码的验证规则
    var validateNewPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.Pwdform.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      Pwdform: {
        oldPwd: "", //原密码
        newPwd: "", //新密码
        confirmPwd: "" //确认密码
      },
      rules: {
        // 设置自定义规则的验证
        newPwd: [{ validator: validateNewPass1, trigger: "blur" }],
        confirmPwd: [{ validator: validateNewPass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击按钮触发 验证
    changePwd() {
      this.$refs.Pwdform.validate(valid => {
        if (valid) {
          //获取数据
          var oldPassword = this.Pwdform.oldPwd;
          var newPassword = this.Pwdform.newPwd;
          var id = localStorage.getItem("id");
          var token = localStorage.getItem("token");
          console.log(oldPassword, newPassword, id, token);
          axios
            .post(
              "http://work.08321.org/sell/users.php?a=chgpwd",
              qs.stringify({ oldPassword, newPassword, id, token })
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$router.push("/Logout");
                this.$message({
                  //成功提示
                  message: res.data.msg,
                  type: "success"
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          this.$message.error("密码修改失败");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.Pwdform.resetFields();
    }
  }
};
</script>

<style>
.changePwd .el-form {
  width: 290px;
  margin-top: 20px;
  margin-left: 40px;
}
</style>