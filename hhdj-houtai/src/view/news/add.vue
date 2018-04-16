<template>
  <div class="addNews">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="新闻标题">
        <el-input v-model="form.title" style="width:80%;"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.type" placeholder="请选择类型" >
          <el-option :label='item.title' :value="item.title" v-for="(item,index) in arr" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻头图">
        <el-upload
          class="avatar-uploader"
          action="https://upload-z1.qiniup.com"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="{token:token}">
          <img v-if="form.img" :src="this.form.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="主体内容">
        <editor @getText="getText" v-model="form.content"></editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postForm" v-if="this.$route.name=='新闻添加页'">添加</el-button>
        <el-button type="primary" @click="updateForm" v-if="this.$route.name=='新闻编辑页'">保存并添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import editor from '../../components/editor'

  export default {
    name: "add",
    components: {
      editor
    },
    data() {
      return {
        form: {
          title: '',
          img: '',
          type: '',
          contentText: '',
          content: ''
        },
        token: '',
        arr: []
      }
    },
    methods: {
      getType() {
        this.$axios.post('getNewsType').then(res => {
          this.arr = res.data;
        })
      },
      getMsg() {
        let id = this.$route.query.id;
        let params = {id};
        this.$axios.post('getNews', params).then(res => {
          this.form = res.data[0];
        })
      },
      postForm() {
        let params = this.form;
        this.$axios.post('addNews', params).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              } else {
                this.$message.error('添加失败');
              }
        });
        this.$router.push('/news')
      },
      updateForm() {
        let id = this.$route.query.id;
        let params = {
          ...this.form,
          id
        }

        this.$axios.post('updateNews', params).then(res => {

        });
        this.$router.push('/news')
      },
      getText(val) {
        this.form.contentText = val;
        // console.log(this.form.contentText)
        // console.log(this.form.content)
      },
      handleAvatarSuccess(res) {
        this.form.img = "http://image.yaojunrong.com/" + res.key;

      },
      getToken() {
        this.$axios.qiniuGet().then(res => {
          this.token = res.data;
        })
      }
    },
    watch: {
      $route() {
        this.form = {
          title: '',
          img: '',
          type: '',
          contentText: '',
          content: ''
        }
      },
    },
    mounted() {
      if (this.$route.name == "新闻编辑页") {
        this.getToken();
        this.getType();
        this.getMsg();
      } else {
        this.getToken();
        this.getType()
      }

    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
