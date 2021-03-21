<!-- 我的实验 -->
<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-document-delete"></i> 待完成
            <el-badge :value="willData.length" class="item" />
          </span>
          <!--表格渲染-->
          <el-table ref="table" v-loading="crud.loading" :data="willData" size="small" style="width: 100%;">
            <el-table-column prop="taskName" label="课题名称" />
            <el-table-column prop="tDesc" :show-overflow-tooltip="true" label="课题描述" />
            <el-table-column prop="taskTeacher" label="负责老师" />
            <el-table-column prop="createTime" label="派发时间" />
            <el-table-column label="操作" width="150px" align="center">
              <template slot-scope="scope">
                <!-- <udOperation
                  :data="scope.row"
                  :permission="permission"/> -->
                <el-button type="primary" @click="editReport(scope.row.id)">开始</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-document-checked"></i> 已完成
            <el-badge :value="hasData.length" class="item" />
          </span>
          <!--表格渲染-->
          <el-table ref="table" v-loading="crud.loading" :data="hasData" size="small" style="width: 100%;">
            <el-table-column prop="taskName" label="课题名称" />
            <el-table-column prop="tDesc" :show-overflow-tooltip="true" label="课题描述" />
            <el-table-column prop="taskTeacher" label="负责老师" />
            <el-table-column prop="taskGrade" label="得分" />
            <el-table-column prop="teacherDesc" label="评语" />
            <el-table-column prop="okTime" label="完成时间" />
            <el-table-column prop="teacherTime" label="批改时间" />
            <el-table-column prop="taskStatus" label="状态">
              <template slot-scope="scope">
                <span class="dot" :class="{'yellow': scope.row.taskStatus === '2', 'green': scope.row.taskStatus === '3'}"></span>
                <span>{{scope.row.taskStatus === '2' ? '待批阅' : '已批阅'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" align="center">
              <template slot-scope="scope">
                <!-- <udOperation
                  :data="scope.row"
                  :permission="permission"
                /> -->
                <el-button type="primary" @click="detailReport(scope.row.id)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import crudReport from '@/api/report'
import CRUD, { presenter, header, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { mapState } from 'vuex'

export default {
  name: 'Mylab',
  components: { pagination, rrOperation, udOperation },
  mixins: [presenter(), header(), crud()],
  cruds() {
    return CRUD({ title: 'report', url: 'api/report', idField: 'id', sort: 'id,desc', crudMethod: { ...crudReport }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'report:add'],
        edit: ['admin', 'report:edit'],
        del: ['admin', 'report:del']
      },
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      this.crud.query.stuId = this.userInfo.user.id;
      return true
    },
    editReport(id) {
      this.$router.push({
        path: '/labTaskEdit',
        query: {
          reportId: id
        }
      })
    },
    detailReport(id) {
      this.$router.push({
        path: '/labTaskDetail',
        query: {
          reportId: id
        }
      })
    }
  },
  computed: {
    willData() {
      let arr = [];
      if(this.crud.data && this.crud.data instanceof Array) {
        arr = this.crud.data
      }
      arr = arr.filter(x => {
        return x.taskStatus === '1'
      })
      return arr
    },
    hasData() {
      let arr = [];
      if(this.crud.data && this.crud.data instanceof Array) {
        arr = this.crud.data
      }
      arr = arr.filter(x => {
        return x.taskStatus === '2' || x.taskStatus === '3'
      })
      return arr
    },
    ...mapState({
      userInfo: state => state.user
    }),
  }
}
</script>

<style scoped>
.dot{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 3px;
}
.red{
  background-color: red;
}
.yellow{
  background-color: yellow;
}
.green{
  background-color: green;
}
</style>
