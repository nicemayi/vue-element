<template>
  <div>

  <el-tabs>
    <el-tab-pane label="Pending Order">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          property="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          property="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="Completed Order">

      <el-table
        :data="tableData3"
        border
        style="width: 100%">
        <el-table-column
          property="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          property="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
      </el-table>


    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData3: [{
          date: '2016-05-02',
          name: '王小虎111',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎111',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '111王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '111王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
  }
</script>