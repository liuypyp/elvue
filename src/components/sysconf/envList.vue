<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" plain @click="dialogVisible = true">添加</el-button>
        <el-button type="success" plain @click="showModifyForm">修改</el-button>
        <el-button type="info" plain @click="removeRecord">删除</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="envGrid"
          highlight-current-row
          @row-click="selectRow"
          :data="tableData2"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="主键"
            width="250">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="uniqueName"
            label="标识">
          </el-table-column>
          <el-table-column
            prop="url"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="description"
            label="备注">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10,50,100]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog
      title="环境信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="唯一名称" prop="uniqueName">
          <el-input v-model="form.uniqueName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import {MessageBox} from 'element-ui'
  import {postJSON} from '../../util/util'

  export default {
    components: {
      ElCol,
      ElRow
    },
    methods: {
      selectRow (row) {
        console.log(this.selectRows)
        this.$refs.envGrid.setCurrentRow(row)
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.requestData(this.currentPage, val)
      },
      handleCurrentChange (val) {
        this.requestData(val, 10)
      },
      showModifyForm () {
        let that = this
        let row = that.$refs.envGrid.getCurrentRow()
        console.log(row)
      },
      removeRecord () {
        console.log('---')
      },
      requestData (pageNum, pageSize, sort, order) {
        let that = this
        postJSON('/envservice/appEnv/query.json', {
          'sort': !sort ? 'id' : sort,
          'order': !order ? 'asc' : order,
          pageNum: !pageNum ? 1 : pageNum,
          max: !pageSize ? 10 : pageSize
        }).then((res) => {
          that.tableData2 = res.data.datas
          that.totalCount = res.data.totalCount
          that.currentPage = res.data.pageNum
        }).catch((error) => {
          console.error(error)
        })
      },
      submitForm (formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url2 = ''
            if (that.form.id) {
              url2 = '/envservice/appEnv/update.json'
            } else {
              url2 = '/envservice/appEnv/add.json'
            }
            postJSON(url2, that.form).then((res) => {
              if (res.data.success) {
                that.resetForm('form')
                that.dialogVisible = false
                that.requestData(that.currentPage, that.pageSize)
              } else {
                MessageBox.alert(res.data.errorMsg, {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'error',
                  center: true
                })
              }
            }).catch((error) => {
              console.error(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      handleClose (done) {
        this.$refs['form'].resetFields()
        done()
      }
    },
    data () {
      return {
        form: {
          id: '',
          uniqueName: '',
          name: '',
          url: '',
          description: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          uniqueName: [
            {required: true, message: '请输入标识', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '请输入地址', trigger: 'blur'},
            {required: true, type: 'url', message: '请输入正确格式', trigger: 'blur'}
          ]
        },
        dialogVisible: false,
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData2: [],
        selectRowss: []
      }
    },

    created () {
      this.requestData(this.currentPage, this.pageSize)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-table__body tr.current-row > td {
    background: #ffe48d !important;
  }
</style>
