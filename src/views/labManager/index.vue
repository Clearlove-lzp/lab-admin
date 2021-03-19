<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
          <el-form-item label="实验室名称" prop="lName">
            <el-input v-model="form.lName" style="width: 400px;" />
          </el-form-item>
          <el-form-item label="实验室编号" prop="lCode">
            <el-input v-model="form.lCode" style="width: 400px;" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model.number="form.lIndex" style="width: 400px;" />
          </el-form-item>
          <el-form-item label="仪器型号和数量" prop="lDesc">
            <el-input v-model="form.lDesc" style="width: 400px;" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio v-for="item in dict.lab_status" :key="item.id" v-model="form.lStatus" :label="item.value">{{ item.label }}</el-radio>
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
        <el-table-column prop="lIndex" label="排序"  width="65" />
        <el-table-column prop="lName" label="实验室名称" />
        <el-table-column prop="lCode" label="实验室编号" />
        <el-table-column prop="lDesc" label="仪器型号和数量" />
        <el-table-column prop="lStatus" label="状态">
          <template slot-scope="scope">
            <span class="dot" :class="{'green': scope.row.lStatus === '1', 'yellow': scope.row.lStatus === '2', 'red': scope.row.lStatus === '3'}"></span>
            <span>{{scope.row.lStatus === '1' ? '空闲' : scope.row.lStatus === '2' ? '使用中' : '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"  width="145" />
        <el-table-column prop="createUser" label="创建人" />
        <!-- <el-table-column prop="teacher" label="使用教师" /> -->
        <el-table-column v-if="checkPer(['admin','laboratory:edit','laboratory:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudLaboratory from '@/api/laboratory'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { mapState } from 'vuex'

const defaultForm = { id: null, lName: null, lIndex: 999, createTime: new Date(), createUser: null, lCode: null, lDesc: null, lStatus: '1', teacher: null }
export default {
  name: 'Laboratory',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'laboraty', url: 'api/laboratory', idField: 'id', sort: 'id,lDesc', crudMethod: { ...crudLaboratory }})
  },
  dicts: ['lab_status'],
  data() {
    return {
      permission: {
        add: ['admin', 'laboratory:add'],
        edit: ['admin', 'laboratory:edit'],
        del: ['admin', 'laboratory:del']
      },
      rules: {
        lName: [
          { required: true, message: '实验室名称不能为空', trigger: 'blur' }
        ],
        lCode: [
          { required: true, message: '实验室编号不能为空', trigger: 'blur' }
        ],
        lDesc: [
          { required: true, message: '仪器型号及数量不能为空', trigger: 'blur' }
        ]
      }}
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user
    }),
  },
  mounted() {
    defaultForm.createUser = this.userInfo.user.username
  }
}
</script>

<style scoped lang="scss">
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
