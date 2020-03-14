<template>
  <div class="add">
    <!-- 添加账号页面 -->
    <div class="content">
      <!-- 标题 -->
      <h2 class="title">添加账号</h2>
      <!-- 账号输入框 -->
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="rules">
        <el-form-item label="账号" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="addForm.pwd" show-password></el-input>
        </el-form-item>
        <!-- 用户选择框 -->
        <el-form-item label="用户组" prop="region">
          <el-select v-model="addForm.region">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="addBtn">添加</el-button>
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
    return {
      addForm: {
        name: "", //账号
        pwd: "", //密码
        region: "普通管理员" //用户组
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, message: "长度不能小于3个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度不能小于6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addBtn() {
      var that=this;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          var data = {
            account: this.addForm.name,
            password: this.addForm.pwd,
            userGroup: this.addForm.region
          };
          axios
            .post(
              "http://work.08321.org/sell/users.php?a=add",
              qs.stringify(data)
            )
            .then(function(res) {
              
              if (res.data.code === 0) {
                //跳转至账号列表
                that.$router.push('/home/Admin_list');
                that.$message({
                  //成功提示
                  message:res.data.msg,
                  type: "success"
                });
              } else {
                //错误提示
                that.$message.error(res.data.msg)
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    }
  }
};
</script>

<style>
.add .content {
  width: 96% !important;
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: -4px 0px 5px #e2dede;
  background-color: #fff;
  padding-bottom: 20px;
}
.add .content .title {
  line-height: 36px;
  border-bottom: 1px solid #f3f3f3;
  text-indent: 1em;
}
.add .el-form {
  width: 290px;
  margin-top: 20px;
  margin-left: 40px;
}
</style>