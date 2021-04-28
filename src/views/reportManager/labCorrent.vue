<!-- 报告详情 -->
<template>
  <div class="app-container">
    <div class="head-container">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="grid-content-border flex-item">
            <p class="lab-title">{{reportInfo.taskName}}</p>
            <p>{{reportInfo.tDesc}}</p>
          </div>
          <div class="grid-content-border flex-item">
            <el-form :model="formItem" :rules="rulesItem" ref="ruleForm" label-width="70px" class="demo-ruleForm">
              <el-form-item label="评分" prop="score">
                <el-input v-model.number="formItem.score"></el-input>
              </el-form-item>
              <el-form-item label="评语" prop="desc">
                <el-input type="textarea" v-model="formItem.desc" :rows="6"></el-input>
              </el-form-item>
            </el-form>
            <div class="editSubmit">
              <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content grid-right grid-content-border" v-html="reportInfo.taskDesc">
            
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getReport, edit } from '@/api/report'
import moment from 'moment';

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
      },
      reportInfo: {},
      loading: false
    };
  },
  components: {},
  computed: {
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            id: this.$route.query.reportId,
            taskGrade: this.formItem.score,
            teacherDesc: this.formItem.desc,
            taskStatus: 3,
            teacherTime: moment().format('YYYY-MM-DD HH:mm:ss')
          }
          this.loading = true;
          edit(params).then(res => {
            this.loading = false;
            this.$router.push({
              path: '/reportManager/index'
            })
            this.$message.success('批改成功')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    getReportById() {
      let params = {
        id: this.$route.query.reportId
      }
      getReport(params).then(res => {
        if(res.content && res.content.length) {
          this.reportInfo = res.content[0]
        }else{
          this.reportInfo = {}
        }
      })
    }
  },
  watch: {},
  mounted() {
    this.getReportById()
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