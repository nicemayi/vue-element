<template>
<div>

    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleselect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
          <el-menu-item index="2-1" >选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">订单管理</el-menu-item>
    </el-menu>


<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit">
  <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送">
    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input-number v-model="num1" @change="handleChange"></el-input-number>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click.native.prevent="onSubmit">立即创建</el-button>
    <el-button @click.native.prevent>取消</el-button>
  </el-form-item>
</el-form>

      <el-checkbox-group v-model="checkList">
        <el-checkbox class="checkbox" label="复选框 A"></el-checkbox>
        <el-checkbox class="checkbox" label="复选框 B"></el-checkbox>
        <el-checkbox class="checkbox" label="复选框 C"></el-checkbox>
        <el-checkbox class="checkbox" label="禁用" disabled></el-checkbox>
        <el-checkbox class="checkbox" label="选中且禁用" disabled></el-checkbox>
      </el-checkbox-group>

    <el-time-select
      v-model="value_time"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30'
      }"
      placeholder="选择时间">
    </el-time-select>

    <el-switch
      v-model="value1"
      on-text=""
      off-text="">
    </el-switch>
    <el-switch
      v-model="value2"
      on-color="#13ce66"
      off-color="#ff4949">
    </el-switch>


<!-- Table -->
<el-button type="text" @click.native="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

<el-dialog title="收货地址" v-model="dialogTableVisible">
  <el-table
    :data="tableData"
    selection-mode="multiple"
    style="width: 100%"
    @selectionchange="">
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      inline-template
      label="日期"
      width="120">
      <div>{{ row.date }}</div>
    </el-table-column>
    <el-table-column
      property="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址"
      show-tooltip-when-overflow>
    </el-table-column>
  </el-table>
</el-dialog>




  </div>
</template>
<script>
  export default {
    data() {
      return {
          num1: 1,
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
        dialogTableVisible: false,
        value1: true,
        value2: false,
        checkList: ['选中且禁用','复选框 A'],
        value_time: new Date(),
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        console.log(this.form.name)
      },
      handleselect() {
        console.log("handleselect");
      },
      handleChange () {
        console.log(this.num1);
        // this.num ++;
      }
    }
  }
</script>