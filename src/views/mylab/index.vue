<!-- 我的实验 -->
<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-document-delete"></i> 待完成</span>
          <!--表格渲染-->
          <el-table ref="table" v-loading="crud.loading" :data="[{taskDesc: '1',id: '1'},{taskDesc: '2',id: '2'}]" size="small" style="width: 100%;">
            <el-table-column prop="taskDesc" label="课程解答描述" />
            <el-table-column prop="taskGrade" label="课程得分" />
            <el-table-column prop="teacherDesc" label="老师评语" />
            <el-table-column prop="taskTeacher" label="批改教师" />
            <el-table-column prop="createTime" label="开始时间" />
            <el-table-column prop="okTime" label="完成时间" />
            <el-table-column prop="teacherTime" label="批改时间" />
            <el-table-column prop="laboratoryId" label="实验室Id" />
            <el-table-column prop="taskStatus" label="状态" />
            <el-table-column label="操作" width="150px" align="center">
              <template slot-scope="scope">
                <udOperation
                  :data="scope.row"
                  :permission="permission"
                />
                <el-button type="primary" @click="editReport(scope.row.id)">开始</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-document-checked"></i> 已完成</span>
          <!--表格渲染-->
          <el-table ref="table" v-loading="crud.loading" :data="[{taskDesc: '1',id: '1'},{taskDesc: '2',id: '2'}]" size="small" style="width: 100%;">
            <el-table-column prop="taskDesc" label="课程解答描述" />
            <el-table-column prop="taskGrade" label="课程得分" />
            <el-table-column prop="teacherDesc" label="老师评语" />
            <el-table-column prop="taskTeacher" label="批改教师" />
            <el-table-column prop="createTime" label="开始时间" />
            <el-table-column prop="okTime" label="完成时间" />
            <el-table-column prop="teacherTime" label="批改时间" />
            <el-table-column prop="laboratoryId" label="实验室Id" />
            <el-table-column prop="taskStatus" label="状态" />
            <el-table-column label="操作" width="150px" align="center">
              <template slot-scope="scope">
                <udOperation
                  :data="scope.row"
                  :permission="permission"
                />
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
  }
}
</script>

<style scoped>

</style>
