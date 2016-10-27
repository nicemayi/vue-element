<style>
  #client_order_modal {
    /*margin-top: 100;*/
    /*padding-top: 100;*/
  }
/*  #tube_sets_modal {
    margin-top:0;
    padding-top:0;
  }*/
</style>

<template>
  <div>
    <el-input
      placeholder="Type in the client name you are looking for..."
      v-model="searchText">
    </el-input>

    <el-table
      :data="filteredTableData"
      @cellclick="cellClicked"
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

    <el-dialog top= "5%" v-model="dialogFormVisible" size="large"><h1 align="center">{{modal_client_id}}</h1>
      <el-form id="client_order_modal" ref="form" :model="form" label-width="0px" @submit.prevent="onSubmit">
<!--       <el-form-item>
        <div class="text">Client Internal Identify Number</div>
        <el-input v-model="form.client_id"></el-input>
      </el-form-item> -->
<!--         <el-form-item>
          <h2>Client Information</h2>
          <el-row class="inline-input border-grid">
            <el-col :span="8">
              <el-tag type="primary">Client Internal Identify Number</el-tag>
              <el-input v-model="form.client_id"></el-input>
            </el-col>
            <el-col :span="8">
              <el-tag type="primary">Physician Name</el-tag>
              <el-input v-model="form.physician_name"></el-input>
            </el-col>
            <el-col :span="8">
              <el-tag type="primary">Client Name</el-tag>
              <el-input v-model="form.client_name"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
 -->

          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="7">
              <h4>Tube Sets</h4>
              <el-tag type="gray">Serum tube only</el-tag>
              <el-input-number v-model="form.client_tube_set_sst"></el-input-number>
              <el-tag type="gray">Serun and EDTA tube</el-tag>
              <el-input-number v-model="form.client_tube_set_sst_and_edta"></el-input-number>
              <el-tag type="gray">Standard</el-tag>
              <el-input-number v-model="form.client_tube_set_standard"></el-input-number>
              <el-tag type="gray">All</el-tag>
              <el-input-number v-model="form.client_tube_set_all"></el-input-number>
            </el-col>

            <el-col :span="7">
              <h4>Box Sets</h4>
              <el-tag type="success">Regular cooler</el-tag>
              <el-input-number v-model="form.regular_cooler"></el-input-number>
              <el-tag type="success">Larger cooler</el-tag>
              <el-input-number v-model="form.larger_cooler"></el-input-number>
              <h4>Requisition Form</h4>
              <el-tag type="danger">Requisition forms</el-tag>
              <el-input-number v-model="form.req_forms"></el-input-number>
            </el-col>

            <el-col :span="7">
              <h4>Shipping Methods</h4>
              <el-tag type="success">Regular cooler</el-tag>
              <el-select v-model="form.shipping_method" placeholder='Please choose shipping method'>
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <h4>Comments</h4>
              <el-tag type="success">Regular cooler</el-tag>
              <el-input type="textarea" rows="4" v-model="form.comments"></el-input>
            </el-col>

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">Cancel</el-button>
        <el-button id="submit_btn" :disable="ifValidOrder" @click.native.prevent="onSubmit" type="primary" @click.native="dialogFormVisible = false">Create</el-button>
      </span>
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
        modal_client_id: '12',
        options: [{
          value: 'ground',
          label: 'Ground'
        }, {
          value: 'two day',
          label: 'Two-day'
        }, {
          value: 'standard overnight',
          label: 'Standard overnight'
        }, {
          value: 'priority overnight',
          label: 'Priority overnight'
        }],
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
      cellClicked(row) {
        this.modal_client_id = row.client_id;
        this.openModal(row)
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