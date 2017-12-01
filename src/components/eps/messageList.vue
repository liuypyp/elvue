<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="info" plain >搜索</el-button>
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
            width="200">
          </el-table-column>
          <el-table-column
            prop="appId"
            label="appId"
            width="100">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
            width="100">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户id"
            width="75">
          </el-table-column>
          <el-table-column
            prop="thirdId"
            label="第三方消息id"
            width="150">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="50">
          </el-table-column>
          <el-table-column
            prop="message"
            label="消息">
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

  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
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
      requestData (pageNum, pageSize, sort, order) {
        let that = this
        postJSON('/eps/message/query.json', {
          'sort': !sort ? 'createDate' : sort,
          'order': !order ? 'desc' : order,
          pageNum: !pageNum ? 1 : pageNum,
          max: !pageSize ? 10 : pageSize
        }).then((res) => {
          that.tableData2 = res.data.datas
          that.totalCount = res.data.totalCount
          that.currentPage = res.data.pageNum
        }).catch((error) => {
          console.error(error)
        })
      }
    },
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData2: [],
        selectRowss: []
      }
    },

    created () {
      this.requestData(this.currentPage, this.pageSize)
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh : mm');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-table__body tr.current-row > td {
    background: #ffe48d !important;
  }
</style>
