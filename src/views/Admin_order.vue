<template>
  <div class="order">
    <div class="content">
      <h2 class="title">订单管理</h2>
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item label="订单号">
          <el-input v-model="form.number" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="form.person" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.Tel" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.region" placeholder="订单状态">
            <el-option label="状态一" value="shanghai"></el-option>
            <el-option label="状态二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="number" label="订单号" width="150"></el-table-column>
        <el-table-column fixed prop="date" label="下单时间" width="150"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="name" label="收货人" width="120"></el-table-column>
        <el-table-column prop="address" label="配送地址" width="300"></el-table-column>
        <el-table-column fixed prop="finishTime" label="送达时间" width="150"></el-table-column>
        <el-table-column prop="remark" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="sum" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="state" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[4, 4, 4, 4]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        number: "",
        person: "",
        Tel: "",
        region: ""
      },
      date1: [
        {
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change"
        }
      ],
      date2: [
        {
          type: "date",
          required: true,
          message: "请选择时间",
          trigger: "change"
        }
      ],
      tableData: [
        {
          number: "123321",
          date: "2016-05-02",
          finishTime: "2020-02-13",
          phone: "123456789",
          name: "王小虎",
          remark: "微辣",
          sum: "20.00",
          state: "已完成",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          number: "123321",
          date: "2016-05-04",
          finishTime: "2020-02-13",
          phone: "123456789",
          name: "王小虎",
          remark: "微辣",
          sum: "20.00",
          state: "已完成",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          number: "123321",
          date: "2016-05-01",
          finishTime: "2020-02-13",
          phone: "123456789",
          name: "王小虎",
          remark: "微辣",
          sum: "20.00",
          state: "已完成",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          number: "123321",
          date: "2016-05-03",
          finishTime: "2020-02-13",
          phone: "123456789",
          name: "王小虎",
          remark: "微辣",
          sum: "20.00",
          state: "已完成",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style>
.order .el-form {
  margin-top: 20px;
}
.order .el-pagination {
  margin-top: 20px;
  left: 10px;
}
</style>