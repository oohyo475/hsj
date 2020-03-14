<template>
  <div class="list">
    <div class="content">
      <!-- 标题 -->
      <h2 class="title">账号列表</h2>
      <!-- 列表 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" width="160">
          <template slot-scope="scope">{{ scope.row.account}}</template>
        </el-table-column>
        <el-table-column prop="group" label="用户组" width="160">
          <template slot-scope="scope">{{ scope.row.userGroup}}</template>
        </el-table-column>
        <el-table-column label="创建日期" width="200">
          <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10,15, 20]"
          :page-size="pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 按钮 -->
      <div style="margin-top: 20px" class="towBtn">
        <el-button type="danger">批量删除</el-button>
        <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      total: 0,
      pageNum: 10
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleEdit(id) {
      this.$router.push({
        path: "/home/Amend",
        query: {
          id
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      //一页显示多少条
      this.pageNum = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      axios
        .get(
          `http://work.08321.org/sell/users.php?a=list&currentPage=${this.page}&pageSize=${this.pageNum}`
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = parseInt(res.data.total); //总条数
        });
    }
  }
};
</script>

<style>
.list .el-table {
  padding-left: 10px;
}
.list .el-pagination {
  padding-left: 20px;
  margin-top: 10px;
}
.list .towBtn {
  margin-left: 20px;
}
</style>