<template>
  <div class="infor">
    <div class="content">
      <!-- 标题 -->
      <h2 class="title">管理员信息</h2>
      <p class="ID">
        管理员ID：
        <span>{{this.id}}</span>
      </p>
      <p class="account">
        账号：
        <span>{{this.account}}</span>
      </p>
      <p class="group">
        用户组：
        <span>{{this.group}}</span>
      </p>
      <p class="createTime">
        创建时间：
        <span>{{this.ctime}}</span>
      </p>
      <p class="adminImg">
        管理员头像：
        <el-upload
          class="avatar-uploader"
          action="http://work.08321.org/sell/goods.php?a=uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      id: "",
      account: "",
      group: "",
      ctime: "",
      imageUrl: ""
    };
  },
  created() {
    this.id = localStorage.getItem("id"); //渲染id
    this.account = localStorage.getItem("name"); //渲染用户名
    this.group = localStorage.getItem("group"); //渲染用户组
    this.ctime = localStorage.getItem("ctime"); //渲染创建时间
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = "http://work.08321.org" + res.data;
      var data = { id: this.id, imgUrl: this.imageUrl };
      axios
        .post(
          "http://work.08321.org/sell/users.php?a=chgImg",
          qs.stringify(data)
        )
        .then(d => {
          if (d.data.code === 0) {
            this.$message({
              //成功提示
              message: d.data.msg,
              type: "success"
            });
            localStorage.setItem("AdminImg", this.imageUrl); //将头像地址存储在本地
          } else {
            //失败提示
            this.$message.error(d.data.msg);
          }
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt1M;
    }
  }
};
</script>

<style>
.content p {
  border-bottom: 1px solid #ebeef5;
  font-size: 14px;
  line-height: 50px;
  margin-left: 16px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>