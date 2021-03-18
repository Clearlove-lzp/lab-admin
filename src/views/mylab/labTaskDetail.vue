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
            <p>得分：90</p>
            <p>评语：</p>
            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content grid-right grid-content-border">
            11
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  props: {},
  data () {
    return {
    };
  },
  components: {},
  computed: {
  },
  methods: {},
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
</style>