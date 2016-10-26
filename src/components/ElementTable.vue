<template>
  <div id="app">

    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleselect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">订单管理</el-menu-item>
    </el-menu>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        property="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址">
      </el-table-column>
    </el-table>

    <div class="block">
      <span class="demonstration">默认显示颜色</span>
      <span class="wrapper">
        <el-button type="success">成功按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
        <el-button type="info">信息按钮</el-button>
      </span>
    </div>

    <div class="block">
      <span class="demonstration">hover 显示颜色</span>
      <span class="wrapper">
        <el-button :plain="true" type="success">成功按钮</el-button>
        <el-button :plain="true" type="warning">警告按钮</el-button>
        <el-button :plain="true" type="danger">危险按钮</el-button>
        <el-button :plain="true" type="info">信息按钮</el-button>
      </span>
      <el-button type="primary" icon="edit"></el-button>
      <el-button type="primary" icon="share"></el-button>
      <el-button type="primary" icon="delete"></el-button>
      <el-button type="primary" icon="search">搜索</el-button>
      <el-button type="primary">上传<i class="el-icon-upload el-icon-right"></i></el-button>
      <el-button type="primary" :loading="true">加载中</el-button>
      <el-button type="primary" size="large">大型按钮</el-button>
      <el-button type="primary">正常按钮</el-button>
      <el-button type="primary" size="small">小型按钮</el-button>
      <el-button type="primary" size="mini">超小按钮</el-button>
      <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
      <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
    </div>

    <!-- <template> -->
      <el-checkbox-group v-model="checkList">
        <el-checkbox class="checkbox" label="复选框 A"></el-checkbox>
        <el-checkbox class="checkbox" label="复选框 B"></el-checkbox>
        <el-checkbox class="checkbox" label="复选框 C"></el-checkbox>
        <el-checkbox class="checkbox" label="禁用" disabled></el-checkbox>
        <el-checkbox class="checkbox" label="选中且禁用" disabled></el-checkbox>
      </el-checkbox-group>
    <!-- </template> -->
    <el-input
      placeholder="请输入内容"
      :number="true"
      v-model="input">
    </el-input>

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

    <el-time-select
      v-model="value_time"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30'
      }"
      placeholder="选择时间">
    </el-time-select>

  </div>
</template>

<script>
  export default {

    data() {
      return {
        value_time: new Date(2016, 9, 10, 18, 40),
        value1: false,
        value2: false,
        input: '',
        checkList: ['选中且禁用','复选框 A'],
        radio: '',
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
        }]
      }
    },

    watch: {
      "value_time": function(val1, val2) {
        console.log("val1: ", val1);
      }
    }

  }

</script>