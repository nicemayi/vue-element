<style>
</style>

<template>
  <div class="container-fluid" id="main_div" align="center">
    <el-tabs style="width: 100%;">
      <el-tab-pane label="Pending Orders">
        <div id="search_div" class="container-fluid" align="left">
          <el-input id="search_client"
            placeholder="search..."
            v-model="searchText"
            style="width: 10%;">
          </el-input>
        </div>
        <br/>
        <el-table
          :data="filteredPendingTableData"
          @select="selectOneRowPending"
          @select-all="selectAllRowPending"
          height="620">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Tag"
            width="100"
            :filters="[{ text: 'Packed', value: 'Packed' }, { text: 'Unpacked', value: 'Unpacked' }]"
            :filter-method="filterTag"
            inline-template>
            <el-tag :type="row.tag === 'Packed' ? 'primary' : 'success'" close-transition>{{row.tag}}</el-tag>
          </el-table-column>
          <el-table-column
            property="po_number"
            label="PO Number"
            sortable>
          </el-table-column>
          <el-table-column
            property="client_id"
            label="Client ID">
          </el-table-column>
          <el-table-column
            property="client_name"
            label="Client Name">
          </el-table-column>
          <el-table-column
            property="client_practice_name"
            label="Client Practice Name">
          </el-table-column>
          <el-table-column
            property="po_create_time"
            label="PO Created Time">
          </el-table-column>
          <el-table-column
            property="po_create_by"
            label="PO Created By">
          </el-table-column>
          <el-table-column
            property="shipping_method"
            label="Shipping Method">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Check Order Detail"
            inline-template>
            <el-button type="primary" icon="edit" size="small" @click="clickCheckOrderCell(row)">Check Order</el-button>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Delete Order"
            inline-template>
            <el-button type="danger" icon="delete" size="small" @click="clickDeleteOrderCell(row)">Delete Order</el-button>
          </el-table-column>
        </el-table>

        <hr/>
        <div class="block" align="left">
          <span class="wrapper">
            <el-button type="success" :disabled="multipleSelection.length == 0" @click="packOrder">Pack Order</el-button>
            <el-button type="warning" :disabled="multipleSelection.length == 0">Verify Order</el-button>
            <el-button type="danger" :disabled="multipleSelection.length == 0">Print Order Details</el-button>
          </span>
        </div>

      </el-tab-pane>
      <el-tab-pane label="Completed Order">
        <div class="container-fluid" align="left">
          <el-input id="search_client"
            placeholder="search..."
            v-model="searchText"
            style="width: 10%;">
          </el-input>
        </div>
        <br/>
        <el-table
          :data="tableData3"
          @select="selectOneRowCompleted"
          @select-all="selectAllRowCompleted">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            property="po_number"
            label="PO Number"
            sortable>
          </el-table-column>
          <el-table-column
            property="client_id"
            label="Client ID">
          </el-table-column>
          <el-table-column
            property="client_name"
            label="Client Name">
          </el-table-column>
          <el-table-column
            property="po_created_time"
            label="PO Created Time">
          </el-table-column>
          <el-table-column
            property="po_created_by"
            label="PO Created By">
          </el-table-column>
          <el-table-column
            property="req"
            label="Requisition Form">
          </el-table-column>
          <el-table-column
            property="shipping_method"
            label="Shipping Method">
          </el-table-column>
        </el-table>

        <hr/>
        <div class="block" align="left">
          <span class="wrapper">
            <el-button type="danger" :disabled="multipleSelectionComplete.length == 0">Print Order Details</el-button>
          </span>
        </div>

      </el-tab-pane>
    </el-tabs>



    <el-dialog top= "5%" title="Order Details" v-model="dialogCheckOrder">
      <div align="left">
        <table class="table">
          <tbody>
            <tr>
              <td><b>PO Number</b></td>
              <td>{{this.selectedRow.po_number}}</td>
            </tr>
            <tr>
              <td><b>Client ID</b></td>
              <td>{{this.selectedRow.client_id}}</td>
            </tr>
            <tr>
              <td><b>Client Name</b></td>
              <td>{{this.selectedRow.client_name}}</td>
            </tr>
            <tr>
              <td><b>Client Practice Name</b></td>
              <td>{{this.selectedRow.client_practice_name}}</td>
            </tr>
            <tr>
              <td><b>Client Address</b></td>
              <td>{{this.selectedRow.client_address}}</td>
            </tr>
            <tr>
              <td><b>Shipping Method</b></td>
              <td>{{this.selectedRow.shipping_method}}</td>
            </tr>
            <tr>
              <td><b>Serum Tube Only</b></td>
              <td>{{this.selectedRow.serum_tube_only}}</td>
            </tr>
            <tr>
              <td><b>Serum and EDTA Tube</b></td>
              <td>{{this.selectedRow.serum_and_EDTA_tube}}</td>
            </tr>
            <tr>
              <td><b>Standard Package</b></td>
              <td>{{this.selectedRow.standard}}</td>
            </tr>
            <tr>
              <td><b>All-Tube Package</b></td>
              <td>{{this.selectedRow.all_tube}}</td>
            </tr>
            <tr>
              <td><b>Regular Box</b></td>
              <td>{{this.selectedRow.regular_box}}</td>
            </tr>
            <tr>
              <td><b>Big Box</b></td>
              <td>{{this.selectedRow.big_box}}</td>
            </tr>
            <tr>
              <td><b>Plasma</b></td>
              <td>2</td>
            </tr>
            <tr>
              <td><b>PO Create By</b></td>
              <td>{{this.selectedRow.po_created_by}}</td>
            </tr>
            <tr>
              <td><b>Is packed already</b></td>
              <td>{{this.selectedRow.tag}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>

    <el-dialog title="Warning" v-model="dialogDeleteOrder" size="tiny">
      <span>Are you sure you want to delete order with PO. number 999999 ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="dialogDeleteOrder = false">Cancel</el-button>
        <el-button type="primary" @click.native="deleteMe">Confirm</el-button>
      </span>
    </el-dialog>

  </div>



</template>

<script>

  import {printer} from '../qz/printer.js'

  export default {
    beforeMount: function() {
      var self = this;

      self.$http.get('/who/').then(function(res){
        self.current_loggin_user = JSON.parse(res.data);
      }, function(err){
        console.log(err)
      });

      self.$http.get('/shipping-order-status/').then(function(res){
        self.tableData = JSON.parse(res.data);
      }, function(err){
        console.log(err)
      });
    },
    computed: {
      filteredPendingTableData: function () {
        var self = this;
        let pending_table_data = self.tableData.filter(function(eachRow) {
          return (!eachRow.po_verified_time) && (!eachRow.po_verified_by) && (!eachRow.po_delete_time) && (!eachRow.po_delete_by)
        });
        return pending_table_data.filter(function (eachRow) {
          let row_str = [
            eachRow.po_number,
            eachRow.client_id,
            eachRow.client_name,
            eachRow.client_practice_name,
            eachRow.client_address,
            eachRow.po_create_time,
            eachRow.po_create_by,
            eachRow.shipping_method,
          ].join(' ');
          return row_str.includes(self.searchText);
        })
      },
    },
    data() {
      return {
        current_loggin_user: '',
        searchText: '',
        multipleSelection: [],
        multipleSelectionComplete: [],
        dialogCheckOrder: false,
        dialogDeleteOrder: false,
        selectedRow: {},
        tableData: [],
        tableData3: [
          {
            po_number: '111111',
            client_id: '1003',
            client_name: 'haha',
            po_created_time: '10/21/05 18:30:00',
            po_created_by: 'zhe',
            is_packed: false,
            is_verified: false,
            client_address: "123, main st, Cupertino",
            SST_only: 0,
            SST_and_EDTA: 1,
            standard_tube_set: 2,
            set_all_ha: 3,
            set_all: 10,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground",
            comments: 'haha in comments',
            ph_comments: 'haha in ph comments'
          }, {
            po_number: '2222222',
            client_id: '1003',
            client_name: 'haha',
            po_created_time: '10/21/05 18:30:00',
            po_created_by: 'zhe',
            is_packed: false,
            is_verified: false,
            client_address: "123, main st, Cupertino",
            SST_only: 0,
            SST_and_EDTA: 1,
            standard_tube_set: 2,
            set_all_ha: 3,
            set_all: 10,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground",
            comments: 'haha in comments',
            ph_comments: 'haha in ph comments'
          }, {
            po_number: '33333',
            client_id: '1003',
            client_name: 'haha',
            po_created_time: '10/21/05 18:30:00',
            po_created_by: 'zhe',
            is_packed: false,
            is_verified: false,
            client_address: "123, main st, Cupertino",
            SST_only: 0,
            SST_and_EDTA: 1,
            standard_tube_set: 2,
            set_all_ha: 3,
            set_all: 10,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground",
            comments: 'haha in comments',
            ph_comments: 'haha in ph comments'
          }, {
            po_number: '4444444',
            client_id: '1003',
            client_name: 'haha',
            po_created_time: '10/21/05 18:30:00',
            po_created_by: 'zhe',
            is_packed: false,
            is_verified: false,
            client_address: "123, main st, Cupertino",
            SST_only: 0,
            SST_and_EDTA: 1,
            standard_tube_set: 2,
            set_all_ha: 3,
            set_all: 10,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground",
            comments: 'haha in comments',
            ph_comments: 'haha in ph comments'
          }, {
            po_number: '55555555',
            client_id: '1003',
            client_name: 'haha',
            po_created_time: '10/21/05 18:30:00',
            po_created_by: 'zhe',
            is_packed: false,
            is_verified: false,
            client_address: "123, main st, Cupertino",
            SST_only: 0,
            SST_and_EDTA: 1,
            standard_tube_set: 2,
            set_all_ha: 3,
            set_all: 10,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground",
            comments: 'haha in comments',
            ph_comments: 'haha in ph comments'
          }
        ],
      }
    },
    events: {

    },
    methods: {
      packOrder: function() {
        let self = this;
        let po_numbers = [];
        for (let i=0; i<self.multipleSelection.length; i++) {
          po_numbers.push(self.multipleSelection[i].po_number);
        }
        self.$http.post('/get-order-labels/', {po_numbers: po_numbers}).then(function(res){
          let label_arr = JSON.parse(res.data);
          printer(label_arr);
        }, function(err){
          console.log(err)
        });
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      selectOneRowPending(selection, row) {
        for (let i=0; i<selection.length; i++) {
          console.log("In single: selection[i].po_number: ", selection[i].po_number);
        }
        console.log("---------------------------------------")
        // console.log("selection: ", selection);
        this.multipleSelection = selection;
      },
      selectAllRowPending(selection) {
        for (let i=0; i<selection.length; i++) {
          console.log("In all: selection[i].po_number: ", selection[i].po_number);
        }
        console.log("+++++++++++++++++++++++++++++++++++++++++++");
        // console.log("pending haha")
        this.multipleSelection = selection;
        // console.log("this.multipleSelection: ", this.multipleSelection);
      },
      selectOneRowCompleted(selection, row) {
        console.log("complete hehe");
        console.log(selection.length);
        console.log(selection.length);
        this.multipleSelectionComplete = selection;
      },
      selectAllRowCompleted(selection) {
        console.log("complete haha")
        console.log(selection.length);
        this.multipleSelectionComplete = selection;
      },
      clickCheckOrderCell(row) {
          this.dialogCheckOrder = !this.dialogCheckOrder;
          this.selectedRow = row;
          // console.log(this.selectedRow.po_number)
      },
      clickDeleteOrderCell(row) {
          this.dialogDeleteOrder = !this.dialogDeleteOrder;
          this.selectedRow = row;
      },
      deleteMe() {
        let row = this.selectedRow;
        this.tableData.remove(function(el) { return el.po_number === row.po_number; });
        this.multipleSelection.remove(function(el) { return el.po_number === row.po_number; });
        this.dialogDeleteOrder = false;
      }
    }
  }
</script>