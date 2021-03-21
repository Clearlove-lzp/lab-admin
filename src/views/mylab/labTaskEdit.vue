<!-- 报告编辑 -->
<template>
  <div class="app-container">
    <div class="head-container">
      <el-row :gutter="5">
        <el-col :span="6">
          <div class="grid-content">
            <p class="lab-title">{{reportInfo.taskName}}</p>
            <p>{{reportInfo.tDesc}}</p>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content grid-right">
            <div ref="editor" class="text" />
            <div class="editSubmit">
              <el-button type="primary" :loading="loading" @click="submit">提交</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { upload } from '@/utils/upload'
import E from 'wangeditor'
import { edit, getReport } from '@/api/report'
import moment from 'moment';

export default {
  props: {},
  data () {
    return {
      editorContent: "",
      reportInfo: {},
      loading: false,
    };
  },
  components: {},
  computed: {
    ...mapGetters([
      'imagesUploadApi',
      'baseApi'
    ])
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
    },
    submit() {
      if(!this.editorContent || !this.editorContent.trim()) {
        return this.$message.error("请填写报告")
      }
      let params = {
        id: this.$route.query.reportId,
        taskDesc: this.editorContent,
        taskStatus: '2',
        okTime: moment().format('YYYY-MM-DD HH:mm:ss')
      }
      this.loading = true;
      edit(params).then(res => {
        this.loading = false;
        this.$router.push({
          path: '/mylab/index'
        })
        this.$message.success('提交成功')
      })
    }
  },
  watch: {},
  mounted() {
    const _this = this
    var editor = new E(this.$refs.editor)
    // 自定义菜单配置
    editor.customConfig.zIndex = 10
    // 文件上传
    editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      files.forEach(image => {
        upload(_this.imagesUploadApi, image).then(res => {
          const data = res.data
          const url = _this.baseApi + '/file/' + data.type + '/' + data.realName
          insert(url)
        })
      })
    }
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
    // 初始化数据
    editor.txt.html(this.editorContent)

    this.getReportById()
  },
  created() {},
}
</script>

<style scoped>
.grid-content{
  height: calc(100vh - 160px);
  border: 2px solid #eee;
  border-radius: 10px;
  padding: 0 10px;
  overflow: auto;
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

.text {
  text-align:left;
  height: calc(100vh - 230px) !important;
}

::v-deep .w-e-text-container {
  height: calc(100% - 50px) !important;
}

.editSubmit{
  text-align: center;
}
</style>