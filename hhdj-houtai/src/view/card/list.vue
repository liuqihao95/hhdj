<template>
  <div class="newsList">

    <div class="type">
      <h1>帖子列表</h1>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 70% ;margin: 0 auto">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论"
        width="300">
      </el-table-column>
      <el-table-column
        label="用户名"
        width="100">
        <template slot-scope="scope">
          <p>{{scope.row.user.name}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="账户"
        width="90">
        <template slot-scope="scope">
          <p>{{scope.row.user.userId}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="90">
        <template slot-scope="scope">
          <p v-if="scope.row.type==1">公开</p>
          <p v-if="scope.row.type==0">私密</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scoped">
          <el-button type="danger" @click="delNews(scoped.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="num">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        tableData: [],
        num:0,
        rows:5,
        page:1
      };
    },
    methods: {
      handleCurrentChange(val){
        this.page=val;
        this.getMsg();
      },
      handleSizeChange(size){
        this.rows=size;
        this.getMsg();
      },
      delNews(val) {
        let params = {_id: val};
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("delCard", params).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else {
              this.$message.error('删除失败');
            }
          });
          this.getMsg();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getMsg() {
        let page=this.page;
        let rows=this.rows;
        let param={page,rows}
        this.$axios.post("getCard",param).then(res => {
          this.tableData = res.data;
          this.num=res.num;
        });
      }
    },
    mounted() {
      this.getMsg();
    }
  };
</script>

<style scoped>
  h1 {
    height: 40px;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 40px;
  }

  .type {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    padding-bottom: 20px;
  }

  .newsList {
    text-align: center;
  }

  .titleImg {
    width: 80px;
    height: 50px;
  }
</style>
