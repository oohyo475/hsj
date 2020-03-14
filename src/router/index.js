import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children:[
      {path:'/home/home_index',component:()=>import('../views/home_index.vue'),meta:["后台首页"]},
      {path:'/home/admin_add',component:()=>import('../views/Admin_add.vue'),meta:["账号管理","添加账号"]},
      {path:'/home/Amend',component:()=>import('../views/Amend.vue'),meta:["账号管理","修改账号"]},
      {path:'/home/admin_list',component:()=>import('../views/Admin_list.vue'),meta:["账号管理","账号列表"]},
      {path:'/home/admin_changePwd',component:()=>import('../views/Admin_changePwd.vue'),meta:["账号管理","修改密码"]},
      {path:'/home/admin_infor',component:()=>import('../views/Admin_infor.vue'),meta:["管理员系统","管理员信息"]},
      {path:'/home/admin_addgoods',component:()=>import('../views/Admin_addGoods.vue'),meta:["商品管理","添加商品"]},
      {path:'/home/admin_goodslist',component:()=>import('../views/Admin_goodsList.vue'),meta:["商品管理","商品列表"]},
      {path:'/home/admin_order',component:()=>import('../views/Admin_order.vue'),meta:["订单管理"]},
      {path:'/home/orders_received',component:()=>import('../views/Orders_received'),meta:["销售统计","订单统计"]},
      {path:'/home/goods_received',component:()=>import('../views/Goods_received'),meta:["销售统计","商品统计"]}
    ]
  },
  {
    path:'/logout',
    component:()=>import('../views/Logout.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
