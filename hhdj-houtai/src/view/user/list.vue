<template>
  <div class="userList">
    <el-select v-model="type" placeholder="请选择类型" class="top">
      <el-option :label="item.title" :value="item.title" v-for="(item,index) in arr" :key="index"></el-option>
    </el-select>
    <el-table
      :data="tableData"
      @select="select"
      @select-all="selectAll"
      border
      style="width: 90%;margin: 0 auto;">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="身份证号"
        width="100">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="pwd"-->
      <!--label="密码"-->
      <!--width="80">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="createTime"
        label="入党时间"
        width="100">
      </el-table-column>
      <el-table-column
        label="性别"
        width="50">
        <template slot-scope="scope">
          <p v-if="scope.row.sex==1">男</p>
          <p v-if="scope.row.sex==2">女</p>
        </template>
      </el-table-column>
      <el-table-column
        label="等级"
        width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.type==1">团员</p>
          <p v-if="scope.row.type==2">积极分子</p>
          <p v-if="scope.row.type==3">党员</p>
        </template>
      </el-table-column>
      <el-table-column
        label="党支部"
        prop="blong"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.logging===false" @click="startUse(scope.row._id,scope.row.logging)">
            启用
          </el-button>
          <el-button type="danger" v-if="scope.row.logging===true" @click="startUse(scope.row._id,scope.row.logging)">
            禁止
          </el-button>
          <el-button type="warning">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" class="btn" :disabled="plenty.length===0" @click="rePwd">批量重置密码</el-button>
  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        tableData: [],
        arr: [],
        type: '0',
        plenty: []
      }
    },
    methods: {
      startUse(a, b) {
        let logging = !b;
        let _id = a;
        let params = {_id, logging};
        this.$axios.post('loggingUser', params).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          } else {
            this.$message.error('修改失败');
            return
          }
        })
        this.getMsg()
      },
      selectAll(val) {
        if (val.length > 0) {
          this.plenty = [];
          for (let i = 0; i < val.length; i++) {
            this.plenty[i] = val[i]._id
          }
        } else {
          this.plenty = [];
        }
      },
      select(a, b) {
        if (a.length > this.plenty.length) {
          this.plenty.push(b._id);
          // console.log(this.plenty)
        } else if (a.length < this.plenty.length) {
          for (let i = 0; i < this.plenty.length; i++) {
            if (this.plenty[i] == b._id) {
              this.plenty.splice(i, 1);
              break;
            }
          }
          // console.log(this.plenty)
        }
      },
      getMsg() {
        let blong = this.type;
        let params = {blong}
        this.$axios.post('getUser', params).then(res => {
          this.tableData = res.data;
        });
      },
      getUser() {
        this.$axios.post('getBlong').then(res => {
          this.arr = res.data;
          this.type = res.data[0].title
        })
      },
      rePwd() {
        let id = this.plenty;
        let params = {id};
        this.$axios.post('delUser', params).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '批量重置成功',
              type: 'success'
            });
          } else {
            this.$message.error('批量重置失败');
          }
        })
      }
    },
    mounted() {
      this.getUser()
    },
    watch: {
      type() {
        this.getMsg()
      }
    }
  }
</script>

<style scoped>
  .userList img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .btn {
    display: block;
    margin: 20px auto 50px;
  }
</style>
<style>
  .top {
    display: block;
    width: 30%;
    margin: 20px auto;

  }
</style>

