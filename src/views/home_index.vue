<template>
  <div class="index">
    <!-- 顶部 -->
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <i class="el-icon-document" style="color:#2aa0df"></i>
            <div>
              <p>总订单</p>
              <span>102,400</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <i class="el-icon-coin" style="color:#d4247b"></i>
            <div>
              <p>总销售额</p>
              <span>102,400</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <i class="el-icon-shopping-bag-1" style="color:#1296db"></i>
            <div>
              <p>今日订单数</p>
              <span>102,400</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <i class="el-icon-edit-outline" style="color:#42fb4b"></i>
            <div>
              <p>今日销售额</p>
              <span>102,400</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width:100%;height:400px;"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      ydata: [], //数据
      xdata: [] //日期
    };
  },
  mounted() {
    this.getInfo();
  },

  methods: {
    //请求数据
    getInfo() {
      axios
        .get("http://work.08321.org/sell/counter.php?a=users&field=date")
        .then(res => {
          //遍历
          res.data.data.forEach(v => {
            this.xdata.push(v.ctime); //日期
            this.ydata.push(parseInt(v.num)); //数据
          });
          //调用 eacharts方法
          this.show();
        });
    },
    //echarts
    show() {
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单", "销售额", "注册人数", "管理人员"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xdata
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "管理人员",
            type: "line",
            stack: "",
            data: this.ydata
          }
        ]
      });
    }
  }
};
</script>
<style>
.index .grid-content {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
.index .grid-content i {
  font-size: 50px;
}
.index .grid-content > div {
  width: 50%;
  color: #ccc;
  line-height: 23px;
  text-align: center;
}
.index .grid-content > div > span {
  color: #000;
}
.index .el-row {
  margin-left: 8px !important;
  margin-right: 8px !important;
  margin-top: 20px;
}
.index .content {
  padding-top: 20px;
}
</style>