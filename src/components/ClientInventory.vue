<style>
    

</style>

<template>
    <div class="container-fluid" id="main_div">
        <el-form class="container-fluid" :inline='true'>
            <el-form-item>
                <el-input
                    placeholder="search...">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                    v-model="picked_date"
                    type="daterange"
                    align="left"
                    placeholder="Pick a range"
                    :picker-options="pickerOptions"
                    style="width: 120%">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="margin-left: 38px;">Query</el-button>
            </el-form-item>
        </el-form>
        <br/>
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="false"
          element-loading-text="Loading...">
          <el-table-column
            prop="date"
            label="Date"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="Address">
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
      data() {
        return {
            tableData: [],
            pickerOptions: {
              shortcuts: [{
                text: 'Last week',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: 'Last month',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: 'Last 3 months',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            picked_date: '',
            tableLoading: true
        }
      }
    }

</script>