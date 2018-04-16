<template>
  <div class="summarizesList">

    <div class="type">
      <h1>心得总结列表</h1>
    </div>

    <el-table
      :data="tableData"
      border
      size="mini"
      style="width: 90% ;margin: 0 auto">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="user.name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态"
        width="100">
        <template slot-scope="scope">
          <el-tag size="medium" v-if="scope.row.state===0"  type="info">审核中</el-tag>
          <el-tag size="medium" v-if="scope.row.state===1" type="primary">通过</el-tag>
          <el-tag size="medium" v-if="scope.row.state===2" type="danger">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="passTime"
        label="时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="reason"
        label="原因"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scoped">
          <el-popover
            ref="popover"
            :value="false"
            placement="right"
            width="800"
            trigger="click">
            <div>
              <img :src="scoped.row.img" class="img">
              <div id="content">
                <el-radio v-model="scoped.row.state" :label='1'>通过</el-radio>
                <el-radio v-model="scoped.row.state" :label='2' id="radio">不通过</el-radio>
                <el-input v-model="scoped.row.reason" placeholder="请输入原因" class="input"></el-input>
                <el-button type="primary" @click="updateMsg(scoped.row._id,scoped.row.state,scoped.row.reason)">提交</el-button>
              </div>
            </div>
          </el-popover>

          <el-button v-popover:popover type="primary">查看</el-button>
          <!--<el-button type="primary" @click="delNews(scoped.row._id)">查看</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="num" class="footer">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        tableData: [],
        num: 0,
        rows: 5,
        page: 1
      };
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getMsg();
      },
      handleSizeChange(size) {
        this.rows = size;
        this.getMsg();
      },
      updateMsg(a,b,c) {
        let id=[a];
        let params={id,state:b,reason:c}
        console.log(params);
        this.$axios.post("updateSummarizes", params).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.getMsg()
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          } else {
            this.$message.error('修改失败');
          }
        });
      },
      getMsg() {
        let page = this.page;
        let rows = this.rows;
        let param = {page, rows};
        this.$axios.post("getSummarizes", param).then(res => {
          this.tableData = res.data;
          console.log(res);
          this.num = res.num;
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

  .titleImg {
    width: 80px;
    height: 50px;
  }

  .footer {
    text-align: center;
  }

  .img {
    display: block;
    width: 90px;
    height: 90px;
    margin: 0 auto;
  }

  #content {
    width: 60%;
    margin: 20px auto;
  }

  .input {
    width: 200px;
    height: 30px;
    padding: 0;
    margin-left: 10px;
  }

  #radio {
    margin-left: 10px;
  }
</style>
