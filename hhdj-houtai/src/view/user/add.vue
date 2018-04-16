<template>
  <div class="userAdd">
    <h1>这是用户添加页</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.userId" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="form.homeAddress" style="width:40%;"></el-input>
      </el-form-item>
      <el-form-item label="工作住址">
        <el-input v-model="form.workAddress" style="width:40%;"></el-input>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="form.nation" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="form.weixin" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="form.qq" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <template>
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="最高学历">
        <el-input v-model="form.highestDeg" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="form.title" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="薪资水平">
        <el-input v-model="form.wage" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="入党时间">
        <el-input v-model="form.createTime" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="党费最后缴纳时间">
        <el-input v-model="form.lastTime" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="当前身份">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="团员" value="1"></el-option>
          <el-option label="入党积极分子" value="2"></el-option>
          <el-option label="党员" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属党支部">
        <el-select v-model="form.blong" placeholder="请选择类型">
          <el-option :label="item.title" :value="item.title" v-for="(item,index) in arr" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postForm" v-if="this.$route.name=='用户添加页'">添加</el-button>
        <el-button type="primary" @click="updateForm" v-if="this.$route.name=='用户编辑页'">保存并添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "add",
    data() {
      return {
        form: {
          img: '',
          name: '',
          userId: '',
          homeAddress: '',
          workAddress: '',
          nation: '',
          weixin: '',
          qq: '',
          sex: '1',
          highestDeg: '',
          title: '',
          wage: '',
          createTime: (new Date()).toLocaleString(),
          lastTime: '',
          type: '1',
          blong: ''
        },
        arr:[]
      }
    },
    methods: {
      getblong(){
        this.$axios.post("getBlong").then(res => {
          this.arr = res.data;
          this.form.blong=res.data[0].title
        });
      },
      postForm() {
        let params = this.form;
        this.$axios.post('addUser', params).then(res => {
          if (res.code == 200) {
            this.$router.push('/user')
          }
        })
      }
    },
    mounted(){
      this.getblong()
    }
  }
</script>

<style scoped>
  .userAdd h1 {
    text-align: center;
    padding: 0 0 20px;
    font-size: 18px;
    font-weight: 500;
  }

</style>
