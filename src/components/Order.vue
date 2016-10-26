<style>
  #orderMain {
    margin-top: 20px;
  }
</style>

<template>
  <div id="orderMain">
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit">

<!--       <el-form-item>
        <div class="text">Client Internal Identify Number</div>
        <el-input v-model="form.client_id"></el-input>
      </el-form-item> -->

      <el-form-item>
        <el-row class="inline-input border-grid">

          <el-col :span="4" class="tac">
            <div class="text">Client Internal Identify Number</div>
            <el-input v-model="form.client_id"></el-input>
          </el-col>

          <el-col :span="4" class="tac">
            <span>dsad</span>
          </el-col>

          <el-col :span="7" class="tac">
            <div class="text">Physician Name</div>
            <el-input
              v-model="form.physician_name"
            ></el-input>
          </el-col>
          <el-col :span="2" class="tac">
            <span><p>adsadasdsa</p></span>
          </el-col>
          <el-col :span="7" class="tac">
            <div class="text">Client Name</div>
            <el-input
              v-model="form.client_name"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="Tube Sets">

        <el-row class="inline-input border-grid">

          <el-col :span="6" class="tac">
            <el-tag>Serum tube only</el-tag>
            <el-input-number v-model="form.client_tube_set_sst"></el-input-number>
          </el-col>

          <el-col :span="6" class="tac">
            <el-tag type="gray">Serun and EDTA tube</el-tag>
            <el-input-number v-model="form.client_tube_set_sst_and_edta"></el-input-number>
          </el-col>

          <el-col :span="6" class="tac">
            <el-tag type="primary">Standard</el-tag>
            <el-input-number v-model="form.client_tube_set_standard"></el-input-number>
          </el-col>

          <el-col :span="6" class="tac">
            <el-tag type="success">All</el-tag>
            <el-input-number v-model="form.client_tube_set_all"></el-input-number>
          </el-col>

        </el-row>

      </el-form-item>

      <el-form-item label="Box Sets">

        <el-row class="inline-input border-grid">

          <el-col :span="12">
            <el-tag type="gray">Regular cooler</el-tag>
            <el-input-number v-model="form.regular_cooler"></el-input-number>
          </el-col>

          <el-col :span="12">
            <el-tag type="gray">Larger cooler</el-tag>
            <el-input-number v-model="form.larger_cooler"></el-input-number>
          </el-col>

        </el-row>

      </el-form-item>

      <el-form-item label="Requisition Form">

        <el-row class="inline-input border-grid">

          <el-col :span="24">
            <el-tag type="gray">Requisition forms</el-tag>
            <el-input-number v-model="form.req_forms"></el-input-number>
          </el-col>

        </el-row>

      </el-form-item>

      <el-form-item label="Shipping Methods">
        <el-radio-group v-model="form.shipping_method">
          <el-radio :label="1">Ground</el-radio>
          <el-radio :label="2">Two-Day</el-radio>
          <el-radio :label="3">Standard Overnight</el-radio>
          <el-radio :label="4">Priority Overnight</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Comments">
        <el-input type="textarea" v-model="form.comments"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button id="submit_btn" type="primary" :disabled="ifValidOrder" @click.native.prevent="onSubmit">Create Order</el-button>
      </el-form-item>

</el-form>

  </div>
</template>
<script>
  export default {
    computed: {
      ifValidOrder(){
        return false;
      }
    },
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
        // dialogTableVisible: false,
        // value1: true,
        // value2: false,
        // checkList: ['选中且禁用','复选框 A'],
        // value_time: new Date(),
        form: {
          client_id: '',
          physician_name: '',
          client_name: '',
          client_tube_set_sst: 0,
          client_tube_set_sst_and_edta: 0,
          client_tube_set_standard: 0,
          client_tube_set_all: 0,
          regular_cooler: 0,
          larger_cooler: 0,
          req_forms: 0,
          shipping_method: '',
          resource: '',
          comments: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        console.log(this.form.client_tube_set_sst_and_edta)
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