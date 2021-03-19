<!-- 报告详情 -->
<template>
  <div class="app-container">
    <div class="head-container">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="grid-content-border flex-item">
            <p class="lab-title">标题</p>
            <p>内容</p>
          </div>
          <div class="grid-content-border flex-item">
            <el-form :model="formItem" :rules="rulesItem" ref="ruleForm" label-width="70px" class="demo-ruleForm">
              <el-form-item label="评分" prop="score">
                <el-input v-model="formItem.score"></el-input>
              </el-form-item>
              <el-form-item label="评语" prop="desc">
                <el-input type="textarea" v-model="formItem.desc" :rows="6"></el-input>
              </el-form-item>
            </el-form>
            <div class="editSubmit">
              <el-button type="primary" @click="submit">提交</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content grid-right grid-content-border">
            学生填写的报告
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { edit } from '@/api/report'

export default {
  props: {},
  data () {
    return {
      formItem: {
        score: "",
        desc: ""
      },
      rulesItem: {
        score: [
          {required: true, message: '评分不能为空', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '评语不能为空', trigger: 'blur'}
        ],
      }
    };
  },
  components: {},
  computed: {
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  watch: {},
  mounted() {
  },
  created() {},
}
</script>

<style scoped lang="scss">
.grid-content{
  height: calc(100vh - 160px);
  padding: 0 10px;
  overflow: auto;
}

.grid-content-border{
  border: 2px solid #eee;
  border-radius: 10px;
}

.lab-title{
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}

.grid-right{
  padding-top: 10px;
  padding-bottom: 10px;
}

.flexbox{
  display: flex;
  flex-direction: column;
}
.flex-item{
  height: calc(50vh - 85px);
  padding: 0 5px;
  overflow: auto;
  &:nth-of-type(2) {
    margin-top: 10px;
  }
}

.demo-ruleForm{
  margin-top: 10px;
  margin-right: 10px;
}

.editSubmit{
  text-align: center;
}
</style>