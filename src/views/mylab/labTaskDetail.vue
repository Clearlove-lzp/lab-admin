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
            <p>得分：{{reportInfo.taskGrade}}</p>
            <p>评语：</p>
            <p>{{reportInfo.teacherDesc}}</p>
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
import { getReport } from '@/api/report'
export default {
  props: {},
  data () {
    return {
      reportInfo: {}
    };
  },
  components: {},
  computed: {
  },
  methods: {
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
</style>