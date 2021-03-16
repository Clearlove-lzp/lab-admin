<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="id" prop="id">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="实验室名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.index" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建人id" prop="createUser">
            <el-input v-model="form.createUser" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="实验室编号">
            <el-input v-model="form.code" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.desc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="1:空闲 2:使用中 3结束">
            <el-input v-model="form.status" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="使用教师">
            <el-input v-model="form.teacher" style="width: 370px;" />
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
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="实验室名称" />
        <el-table-column prop="index" label="排序" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="createUser" label="创建人id" />
        <el-table-column prop="code" label="实验室编号" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="status" label="1:空闲 2:使用中 3结束" />
        <el-table-column prop="teacher" label="使用教师" />
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

const defaultForm = { id: null, name: null, index: null, createTime: null, createUser: null, code: null, desc: null, status: null, teacher: null }
export default {
  name: 'Laboratory',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'laboraty', url: 'api/laboratory', idField: 'id', sort: 'id,desc', crudMethod: { ...crudLaboratory }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'laboratory:add'],
        edit: ['admin', 'laboratory:edit'],
        del: ['admin', 'laboratory:del']
      },
      rules: {
        id: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '实验室名称不能为空', trigger: 'blur' }
        ],
        createUser: [
          { required: true, message: '创建人id不能为空', trigger: 'blur' }
        ]
      }}
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
