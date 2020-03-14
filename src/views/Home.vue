<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <asideMenu />
      </el-aside>
      <!-- 页面主体 -->
      <el-main>
        <!-- 顶部 -->
        <div class="header">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(v,i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 头像 -->
          <el-dropdown>
            <div class="el-dropdown-link">
              欢迎您,
              <span>{{username}}</span>
              <el-avatar :src="headerImg"></el-avatar>
              <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/home/admin_infor">管理员信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Logout">退出系统</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 页面主体 -->
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import asideMenu from "../components/asideMenu"; //引入侧边栏导航组件
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      headerImg: ""
    };
  },
  components: {
    asideMenu //侧边栏组件
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    }
  },
  created() {
    this.headerImg = localStorage.getItem("AdminImg"); //将存储在本地的头像地址赋值给headerImg;
    var id = parseInt(localStorage.getItem("id"));
    var token = localStorage.getItem("token");
    //验证是否为登陆后状态
    axios
      .get(
        `http://work.08321.org/sell/users.php?a=chklogin&id=${id}&token=${token}`
      )
      .then(res => {
        if (res.data.code === 0) {
          this.username = localStorage.getItem("name");
        } else {
          this.$message.error(res.data.msg);
          this.$router.push("/");
        }
      });
  }
};
</script>


<style>
.home,
.el-container {
  height: 100%;
}
.home .el-main {
  padding: 0;
}
.home .el-main {
  background-color: #f0f5f5;
}
/* 面包屑导航栏 */
.home .el-breadcrumb {
  line-height: 4;
  border-bottom: 1px solid #ecebeb;
  font-size: 14px;
  padding-left: 20px;
  background: #fff;
}
.home .header {
  display: flex;
  justify-content: space-between;
  /* width: 100%; */
  background: #fff;
}
.home .el-dropdown {
  margin-right: 20px;
}
.home .el-dropdown-link {
  align-items: center;
  display: flex;
  height: 56px;
}
.home .el-avatar {
  margin-left: 10px;
}
</style>
