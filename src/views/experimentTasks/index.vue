<!-- 实验课题管理 -->
<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">课题名称</label>
        <el-input v-model="query.taskName" clearable placeholder="课题名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">状态</label>
        <el-select v-model="query.taskStatus" clearable style="width: 185px;"  class="filter-item">
          <el-option
            v-for="item in dict.task_status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="课题名称" prop="taskName">
            <el-input v-model="form.taskName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="描述" prop="taskDesc">
            <el-input v-model="form.taskDesc" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="状态" prop="taskStatus">
            <el-radio v-model="form.taskStatus" v-for="item in dict.task_status" :key="item.id" :label="item.value">{{ item.label }}</el-radio>
          </el-form-item>
          <el-form-item label="负责老师" prop="taskTeacher">
            <el-input v-model="form.taskTeacher" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="taskName" label="课题名称" />
        <el-table-column prop="taskDesc" :show-overflow-tooltip="true" label="描述" />
        <el-table-column prop="taskTeacher" label="负责老师" width="100px" />
        <el-table-column prop="taskStatus" label="状态" width="100px" >
          <template slot-scope="scope">
            {{ dict.label.task_status[scope.row.taskStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人" width="100px"/>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column v-if="checkPer(['admin','task:edit','task:del'])" label="操作" width="180px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
              style="display: inline-block"
            />
            <el-button type="primary" @click="showHandoutModalFunc(scope.row.id)">派发</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="reset" :visible.sync="handoutDialog" title="派发课题" width="500px">
        <el-form ref="handleForm" :model="handleForm" :rules="handleRules" size="small" label-width="80px">
          <el-form-item label="实验室" prop="room">
            <el-select v-model="handleForm.room" style="width: 370px;">
              <el-option
                v-for="item in labList"
                :key="item.id"
                :label="item.lName"
                :value="item.lName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="派发学生" prop="student">
            <el-select v-model="handleForm.student" multiple style="width: 370px;">
              <el-option
                v-for="item in studentList"
                :key="item.id"
                :label="item.lName"
                :value="item.lName">
              </el-option>
            </el-select>
            <el-input v-model="handleForm.student" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="reset">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="handleoutSubmit">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import crudTask from '@/api/experimentTasks'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { mapState } from 'vuex'
import { getLab } from '@/api/laboratory'
import { getUsersByRole } from '@/api/system/user'
import { issueTask } from '@/api/report'

const defaultForm = { id: null, taskName: null, taskCode: null, createTime: new Date(), createBy: null, updateTime: null, updateBy: null, taskStatus: '0', taskTeacher: null, taskDesc: null }
export default {
  name: 'Task',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['task_status'],
  cruds() {
    return CRUD({ title: 'task', url: 'api/task', idField: 'id', sort: 'id,desc', crudMethod: { ...crudTask }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'task:add'],
        edit: ['admin', 'task:edit'],
        del: ['admin', 'task:del']
      },
      rules: {
        taskName: [
          { required: true, message: '课题名称不能为空', trigger: 'blur' }
        ],
        taskStatus: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ],
        taskDesc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        taskTeacher: [
          { required: true, message: '负责老师不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'taskName', display_name: '课题名称' },
        { key: 'taskStatus', display_name: '课程状态 0：启用 1：禁用' }
      ],
      handoutDialog: false,
      handleForm: {
        room: "",
        student: []
      },
      handleRules: {
        room: [
          {required: true,  message: '实验室不能为空', trigger: 'change'}
        ],
        student: [
          {required: true, type: 'array',  message: '学生不能为空', trigger: 'change'}
        ]
      },
      labList: [],
      studentList: []
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user
    }),
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    // 关闭派发窗口
    reset() {
      this.handoutDialog = false;
      this.$refs.handleForm.resetFields();
    },
    // 打开派发窗口
    showHandoutModalFunc(id) {
      this.handoutDialog = true;
    },
    // 派发
    handleoutSubmit() {
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
          alert('submit!');
          // issueTask
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getLab() {
      let params = {
        page: 0,
        size: 100,
        sort: 'id,lDesc'
      }
      getLab(params).then(res => {
        if(res.content) {
          this.labList = res.content;
        }
      })
    },
    getStudent() {
      let params = {
        roleId: 2
      }
      getUsersByRole(params).then(res => {
        if(res.content) {
          this.studentList = res.content;
        }
      })
    }
  },
  mounted() {
    defaultForm.createBy = this.userInfo.user.username;
    this.getLab()
    this.getStudent()
  }
}
</script>

<style scoped>
</style>
