<template>
  <div class="newsList">

    <div class="type">
      <el-button class="addNews" type="primary" @click="addNews">添加新闻分类</el-button>
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
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="头图"
        width="100">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="titleImg">
        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scoped">
          <el-button type="primary" @click="updateNews(scoped.row._id)">编辑</el-button>
          <el-button type="danger" @click="delNews(scoped.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        tableData: []
      };
    },
    methods: {
      addNews() {
        this.$router.push('/newsType/add')
      },
      delNews(val) {
        let params = {_id: val};
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("delNewsType", params).then(res => {
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
      updateNews(val) {
        this.$router.push({path: "/newsType/editor", query: {id: val}});
      },
      getMsg() {
        this.$axios.post("getNewsType").then(res => {
          this.tableData = res.data;
        });
      }
    },
    mounted() {
      this.getMsg();
    }
  };
</script>

<style scoped>
  .addNews {
    float: right;
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
  }
</style>
