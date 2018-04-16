<template>
  <div class="addNews">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="党支部">
        <el-input v-model="form.title" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="头图">
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
      <el-form-item label="分类排序">
        <el-input-number v-model="form.num"  :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postForm" v-if="this.$route.name=='党支部添加页'">添加</el-button>
        <el-button type="primary" @click="updateForm" v-if="this.$route.name=='党支部编辑页'">保存并添加</el-button>
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
          title: '',
          img: '',
          num: ''
        },
        token: ''
      }
    },
    methods: {
      getMsg() {
        let id = this.$route.query.id;
        let params = {id};
        this.$axios.post('getBlong', params).then(res => {
          this.form = res.data[0];
        })
      },
      postForm() {
        let params = this.form;
        this.$axios.post('addBlong', params).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '你提交成功',
              type: 'success'
            });
            setTimeout( ()=> {
              this.$router.push('/blong')
            }, 1000)
          }
          else{
            this.$message.error('提交失败');
          }
        });
      },
      updateForm() {
        let id = this.$route.query.id;
        let params = {
          ...this.form,
          id
        };

        this.$axios.post('updateBlong', params).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '你修改成功',
              type: 'success'
            });
            setTimeout( ()=> {
              this.$router.push('/blong')
            }, 1000)
          }
          else{
            this.$message.error('修改失败');
          }
        });
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
      if (this.$route.name == "党支部编辑页") {
        this.getToken();
        this.getMsg()
      } else {
        this.getToken()
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
