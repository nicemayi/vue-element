<style>
</style>

<template>
  <div>
    <el-input
      placeholder="Type in the client name you are looking for..."
      v-model="searchText">
    </el-input>

    <el-table
      :data="filteredTableData"
      selection-mode="single"
      @cellclick="handleSelectionChange"
      border
      style="width: 100%">
      <el-table-column
        property="client_id"
        label="Client ID"
        sortable>
      </el-table-column>
      <el-table-column
        property="SST"
        label="SST"
        sortable>
      </el-table-column>
      <el-table-column
        property="EDTA"
        label="EDTA"
        sortable>
      </el-table-column>
      <el-table-column
        property="Plasma"
        label="Plasma"
        sortable>
      </el-table-column>
      <el-table-column
        property="Urine"
        label="Urine"
        sortable>
      </el-table-column>
      <el-table-column
        property="big_box"
        label="Big Box"
        sortable>
      </el-table-column>
      <el-table-column
        property="regular_box"
        label="Regular Box"
        sortable>
      </el-table-column>
      <el-table-column
        property="req"
        label="Requisition Form"
        sortable>
      </el-table-column>
      <el-table-column
        property="last_update_time"
        label="Last Update Time"
        sortable>
      </el-table-column>
    </el-table>

    <el-dialog id="client_order_modal" title="Edit Client Order" v-model="dialogFormVisible">
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
    </el-dialog>
  </div>
</template>

<script>
  export default {
    computed: {
      ifValidOrder(){
        return false;
      },
      filteredTableData: function () {
        var self = this;
        return self.tableData.filter(function (eachRow) {
          let row_str = [
            eachRow.EDTA,
            eachRow.ESR,
            eachRow.Plasma,
            eachRow.SST,
            eachRow.Urine,
            eachRow.big_box,
            eachRow.client_id,
            eachRow.last_update_time,
            eachRow.regular_box,
            eachRow.req
          ].join(' ');
          return row_str.includes(self.searchText);
        })
      },
    },
    data() {
      return {
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
        },
        dialogFormVisible: false,
        searchText: '',
        tableData: [
          {
            "EDTA": 0,
            "ESR": 0,
            "Plasma": 0,
            "SST": 0,
            "Urine": 0,
            "big_box": 0,
            "client_id": 0,
            "create_time": "2016-10-11 11:5726",
            "index": 2075,
            "is_active": "YES",
            "last_update_time": "",
            "modified_comments": "",
            "modified_time": "",
            "regular_box": 0,
            "req": 0
          },
          {
            "EDTA": 0,
            "ESR": 0,
            "Plasma": 0,
            "SST": 0,
            "Urine": 0,
            "big_box": 0,
            "client_id": 1001,
            "create_time": "2016-10-11 11:5726",
            "index": 2076,
            "is_active": "YES",
            "last_update_time": "",
            "modified_comments": "",
            "modified_time": "",
            "regular_box": 0,
            "req": 0
          },
          {
            "EDTA": -18,
            "ESR": 0,
            "Plasma": 0,
            "SST": -45,
            "Urine": 0,
            "big_box": 0,
            "client_id": 1003,
            "create_time": "2016-10-11 11:5726",
            "index": 2077,
            "is_active": "YES",
            "last_update_time": "2016-10-22 19:28:13",
            "modified_comments": "",
            "modified_time": "",
            "regular_box": 0,
            "req": -20
        },
        {
            "EDTA": 0,
            "ESR": 0,
            "Plasma": 0,
            "SST": 0,
            "Urine": 0,
            "big_box": 0,
            "client_id": 1004,
            "create_time": "2016-10-11 11:5726",
            "index": 2078,
            "is_active": "YES",
            "last_update_time": "",
            "modified_comments": "",
            "modified_time": "",
            "regular_box": 0,
            "req": 0
        }
        ]
      }
    },
    methods: {
      formatter(row, column) {
        return row.client_id;
      },
      onSubmit(){
        console.log("on submit!");
      },
      handleSelectionChange(row) {
        this.singleSelection = row;
        console.log(row.client_id);
         console.log("now this.dialogFormVisible is: ", this.dialogFormVisible)
        this.openModal(row)
        delete this.singleSelection;
      },
      handleSelection(row) {
        console.log(row.client_id);
         console.log("now this.dialogFormVisible is: ", this.dialogFormVisible)
        // this.openModal(row)
      },
      openModal(row) {
        // console.log("now this.dialogFormVisible is: ", this.dialogFormVisible)
        this.dialogFormVisible = !this.dialogFormVisible;
        console.log("in this openModal func");
        delete this.singleSelection;
      }
      // querySearchAsync(queryString) {
      //   console.log(queryString);
      //   var tableData = this.tableData;
      //   var results = queryString ? tableData.filter(this.createStateFilter(queryString)) : tableData;
      // },
      // createStateFilter(queryString) {
      //   return (state) => {
      //     return (state.value.indexOf(queryString.toLowerCase()) === 0);
      //   };
      // }
      }
    }
</script>