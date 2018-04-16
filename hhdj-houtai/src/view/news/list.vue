<template>
  <div class="newsList">

    <div class="type">
      <el-select v-model="type" placeholder="请选择类型">
        <el-option :label="item.title" :value="item.title" v-for="(item,index) in arr" :key="index"></el-option>
      </el-select>
      <el-button class="addNews" type="primary" @click="addNews">添加新闻</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 90% ;margin: 0 auto">
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
        prop="type"
        label="类型"
        width="50">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="updateTime"-->
        <!--label="更新时间"-->
        <!--width="100">-->
      <!--</el-table-column>-->
      <el-table-column
        label="操作">
        <template slot-scope="scoped">
          <el-button type="primary" @click="updateNews(scoped.row._id)">编辑</el-button>
          <el-button type="danger" @click="delNews(scoped.row._id)">删除</el-button>
          <el-button type="danger" @click="addLunbo(scoped.row._id,scoped.row.title,scoped.row.img)">生成轮播图</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        :current-page.sync="currentPage"
        layout="prev, pager, next, jumper"
        :total="num">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        tableData: [],
        type:'2',
        arr:[],
        num:1,
        currentPage :1
      };
    },
    methods: {
      addLunbo(a,b,c){
        let params={newsId:a,title:b,img:c};
        this.$axios.post('addLunbo',params).then(res=>{
         if(res.code==200){
           this.$message({
             showClose: true,
             message: '轮播图生成成功',
             type: 'success'
           });
           this.$router.push('/lunbo')
         }else{
           this.$message({
             showClose: true,
             message: '轮播图生成失败',
             type: 'error'
           });
         }
        })
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.getMsg()
      },
      // post(){
      //   return new Promise(() => {
      //     this.$axios.post('getNewsType').then(res => {
      //       this.arr = res.data;
      //       this.type=this.arr[0].title
      //     }).then(() => {
      //       this.getMsg();
      //     }).catch((err) => {
      //       console.log(err)
      //       reject(err)
      //     })
      //   })
      // },
      getType(){
        this.$axios.post('getNewsType').then(res => {
          this.arr = res.data;
          this.type=this.arr[0].title
        })
      },
      addNews(){
        this.$router.push('/news/add')
      },
      delNews(val) {
        let params = {_id: val};
        this.$axios.post("delNews", params).then(res => {
          console.log(res);
        });
        this.getMsg();
      },
      updateNews(val) {
        this.$router.push({path: "/news/editor", query: {id: val}});
      },
      getMsg() {
          let type=this.type;
          let page=this.currentPage ;
          let params={type,page};
          this.$axios.post("getNews",params).then(res => {
            this.tableData = res.data;
            this.num=res.num;
          });
      }
    },
    watch:{
      type(){
        this.getMsg();
      }
    },
    created(){
      this.getType();
    },
    // mounted() {
    //   // this.getMsg();
    //   this.post()
    // }
  };
</script>

<style scoped>
  .addNews{
    float: right;
  }
  .type{
    width: 90%;
    padding-bottom: 20px;
  }
  .newsList {
    text-align: center;
  }

  .titleImg {
    width: 80px;
  }
</style>
