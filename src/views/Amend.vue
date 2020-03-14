<template>
  <div class="add">
    <!-- 添加账号页面 -->
    <div class="content">
      <!-- 标题 -->
      <h2 class="title">添加账号</h2>
      <!-- 账号输入框 -->
      <el-form ref="amendForm" :model="amendForm" label-width="80px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="amendForm.name"></el-input>
        </el-form-item>
        <!-- 用户选择框 -->
        <el-form-item label="用户组" prop="region">
          <el-select v-model="amendForm.region">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="amendBtn">添加</el-button>
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
      amendForm: {
        name: "", //账号
        region: "普通管理员", //用户组
        id: ""
      }
    };
  },
  mounted() {
    this.amendForm.id = parseInt(this.$route.query.id);
    axios
      .get(
        "http://work.08321.org/sell/users.php?a=readOne&id=" + this.amendForm.id
      )
      .then(res => {
        this.amendForm.name = res.data.data.account; //用户名
        this.amendForm.region = res.data.data.userGroup; //用户组
      });
  },
  methods: {
    //修改按钮
    amendBtn() {
      //收集数据
      var data = {
        account: this.amendForm.name,
        userGroup: this.amendForm.region,
        id: this.amendForm.id
      };
      //发送数据
      axios
        .post("http://work.08321.org/sell/users.php?a=edit", qs.stringify(data))
        .then(d => {
          if(d.data.code===0){
            this.$router.push('/home/Admin_list');//跳转到用户列表
            this.$message({
              //成功提示
              message:d.data.msg,
              type:"success"
            })
          }else{
            this.$message.error(d.data.msg);
          }
        });
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