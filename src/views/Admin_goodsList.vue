<template>
  <div class="goodsList">
    <div class="content">
      <h2 class="title">商品列表</h2>
      <!-- 商品列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.goodsname }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>
                  <img :src="props.row.imgUrl" width="100" />
                </span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsdesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="goodsname"></el-table-column>
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" alt width="100" />
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="goodsdesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15,20]"
        :current-page="page"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageNum"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      pageSize: 5, //每页条数
      page: 1, //当前页码
      pageNum: 0 //总条数,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    //数据
    getData() {
      axios
        .get(
          `http://work.08321.org/sell/goods.php?a=list&currentPage=${this.page}&pageSize=${this.pageSize}`
        )
        .then(res => {
          this.tableData = res.data.data;
          this.pageNum = parseInt(res.data.total);
        });
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style>
.el-pagination {
  margin-top: 20px;
  margin-left: 16px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
