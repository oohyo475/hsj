<template>
  <div class="asideNav">
    <h2 class="boosCenter">
      <i class="el-icon-platform-eleme logo"></i>
      <span>外卖商家中心</span>
    </h2>
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home/home_index">
        <i class="el-icon-house"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-menu-item index="/home/admin_order">
        <i class="el-icon-document"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-shopping-cart-2"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/admin_goodslist">商品列表</el-menu-item>
          <el-menu-item index="/home/admin_addgoods">添加商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-s-shop"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/admin_list">账号列表</el-menu-item>
          <el-menu-item index="/home/admin_add">添加账号</el-menu-item>
          <el-menu-item index="/home/admin_changePwd">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-pie-chart"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/goods_received">商品统计</el-menu-item>
          <el-menu-item index="/home/orders_received">订单统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.asideNav,
.el-aside {
  height: 100%;
  background-color: rgb(125, 152, 179);
}
.asideNav .boosCenter {
  text-align: center;
  font-size: 20px;
  color: #fff;
  line-height: 40px;
}
.asideNav .el-submenu__title,
.asideNav .el-menu-vertical-demo li {
  background-color: rgb(125, 152, 179) !important;
}
.asideNav .el-menu {
  border-right: none !important;
}
.asideNav .el-menu-item i,
.asideNav .el-submenu__title i {
  color: #fff !important;
}
.asideNav .boosCenter{
  position:relative;
  margin-left:10px;
}
.asideNav .logo {
  font-size: 32px;
  position: absolute;
  top: 6px;
  left: 0px;
  color: white;
}
</style>