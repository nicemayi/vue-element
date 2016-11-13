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
            style="width: 20%;">
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
            label="Add Order Comment"
            inline-template>
            <el-button :disabled="!current_loggin_user" type="primary" icon="edit" size="small" @click="addCommentCell(row)">Add Comment</el-button>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Check Order Detail"
            inline-template>
            <el-button type="primary" icon="edit" size="mini" @click="clickCheckOrderCell(row)">Check Order</el-button>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Delete Order"
            inline-template>
            <el-button :disabled="!current_loggin_user" type="danger" icon="delete" size="small" @click="clickDeleteOrderCell(row)">Delete Order</el-button>
          </el-table-column>
        </el-table>

        <hr/>
        <div class="block" align="left">
          <span class="wrapper">
            <el-button type="success" :disabled="multipleSelection.length == 0" @click="packOrder">Pack Order</el-button>
            <el-button type="warning" :disabled="multipleSelection.length == 0" @click="verifyOrder">Verify Order</el-button>
            <el-button type="danger" :disabled="multipleSelection.length == 0" @click="printOrderDetail">Print Order Details</el-button>
          </span>
        </div>

      </el-tab-pane>
      <el-tab-pane label="Completed Order">
        <div id="search_div_complete" class="container-fluid" align="left">
          <el-input id="search_client_complete"
            placeholder="search..."
            v-model="searchTextComplete"
            style="width: 20%;">
          </el-input>
        </div>
        <br/>
        <el-table
          :data="filteredCompleteTableData"
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
            property="client_practice_name"
            label="Client Practice Name">
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
            property="shipping_method"
            label="Shipping Method">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Check Order Detail"
            inline-template>
            <el-button type="primary" icon="edit" size="mini" @click="clickCheckOrderCell(row)">Check Order</el-button>
          </el-table-column>
        </el-table>
        <hr/>
        <div class="block" align="left">
          <span class="wrapper">
            <el-button type="danger" :disabled="multipleSelectionComplete.length == 0" @click="printOrderDetail">Print Order Details</el-button>
          </span>
        </div>
      </el-tab-pane>
    </el-tabs>



    <el-dialog top= "5%" title='Order Details' v-model="dialogCheckOrder">
      <div align="left">
        <table class="table">
          <tbody>
            <tr><td><b>PO Number</b></td><td>{{this.selectedRow.po_number}}</td></tr>
            <tr v-for="(value, key) in this.selectedRow.Order_Details">
              <td><b>{{key.split('_').map(el=>el.toUpperCase()).join(' ')}}</b></td>
              <td>{{value}}</td>
            </tr>
            <hr/>
            <div v-if="this.selectedRow.comments && this.selectedRow.comments.length > 0">
              <h3>Comments</h3>
              <ul>
                <li v-for="each_comment in this.selectedRow.comments">{{each_comment}}</li>
              </ul>
            </div>
          </tbody>
        </table>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {printer} from '../qz/printer.js'

  export default {
    beforeMount: function() {
      var self = this;
      self.$http.get('/shipping-pending-orders/').then(function(res){
        let res_status = res.data.status;
        self.pendingOrders = JSON.parse(res.data);
      }, function(err){
        console.log(err)
      });
      self.$http.get('/shipping-complete-orders/').then(function(res){
        let res_status = res.data.status;
        self.completeOrders = JSON.parse(res.data);
      }, function(err){
        console.log(err)
      });
    },
    computed: {
      searchTextUpperCase: function() {
        console.log("this.searchText.toLowerCase(): ", this.searchText.toLowerCase())
        return this.searchText.toLowerCase();
      },
      searchTextUpperCaseComplete: function() {
        console.log("this.searchTextComplete.toLowerCase(): ", this.searchTextComplete.toLowerCase())
        return this.searchTextComplete.toLowerCase();
      },
      current_loggin_user: function() {
        console.log("current this.$parent.current_loggin_user: ", this.$parent.current_loggin_user)
        return this.$parent.current_loggin_user;
      },
      filteredPendingTableData: function () {
        var self = this;
        let pending_table_data = self.pendingOrders.filter(function(eachRow) {
          return (!eachRow.po_verified_time) && (!eachRow.po_verified_by) && (!eachRow.po_delete_time) && (!eachRow.po_delete_by)
        });
        return pending_table_data.filter(function (eachRow) {
          let row_str = [
            eachRow.po_number,
            eachRow.client_id,
            eachRow.client_name.toLowerCase(),
            eachRow.client_practice_name.toLowerCase(),
            eachRow.client_address.toLowerCase(),
            eachRow.po_create_time,
            eachRow.po_create_by.toLowerCase(),
            eachRow.shipping_method.toLowerCase(),
          ].join(' ');
          return row_str.includes(self.searchTextUpperCase);
        })
      },
      filteredCompleteTableData: function () {
        console.log("haha");
        var self = this;
        let complete_table_data = self.completeOrders.filter(function(eachRow) {
          return (eachRow.po_packed_time) && (eachRow.po_packed_by) && (eachRow.po_verified_time) && (eachRow.po_verified_by) && (!eachRow.po_delete_time) && (!eachRow.po_delete_by)
        });
        return complete_table_data.filter(function (eachRow) {
          let row_str = [
            eachRow.po_number,
            eachRow.client_id,
            eachRow.client_name.toLowerCase(),
            eachRow.client_practice_name.toLowerCase(),
            eachRow.client_address.toLowerCase(),
            eachRow.po_create_time,
            eachRow.po_create_by.toLowerCase(),
            eachRow.shipping_method.toLowerCase(),
          ].join(' ');
          return row_str.includes(self.searchTextUpperCaseComplete);
        })
      },
    },
    data() {
      return {
        searchText: '',
        searchTextComplete: '',
        multipleSelection: [],
        multipleSelectionComplete: [],
        dialogCheckOrder: false,
        selectedRow: {},
        selectedRowComplete: {},
        pendingOrders: [],
        completeOrders: [],
      }
    },
    events: {

    },
    methods: {
      loadTable() {
        var self = this;
        self.$http.get('/shipping-pending-orders/').then(function(res){
          let res_status = res.data.status;
          self.pendingOrders = JSON.parse(res.data);
        }, function(err){
          console.log(err)
        });
        self.$http.get('/shipping-complete-orders/').then(function(res){
          let res_status = res.data.status;
          self.completeOrders = JSON.parse(res.data);
        }, function(err){
          console.log(err)
        });
      },
      addCommentCell(row) {
        let self = this;
        if (self.current_loggin_user != '') {
          console.log("In dialog, row is: ", row);
          if (row.po_number != '') {
            self.$prompt(`Type in comment for order ${row.po_number}:`, 'Comment', {
              cancelButtonText: "Cancel",
              confirmButtonText: "Confirm"
            }).then(({value}) => {
              if (value.trim() != '') {
                let operator = self.current_loggin_user;
                let comment = value;
                let po_number = row.po_number;
                console.log("In dialog, comment is: ", comment);
                self.$http.post('/add-comments/', {
                  "operator": operator,
                  "comment": comment,
                  "po_number": po_number
                }).then(function(res){
                  console.log("successfully add comments, res is: ", res.data);
                  location.reload();
                }, function(err){
                  console.log(err)
                });
              }
            });
          }
        }
      },
      packOrder: function() {
        let self = this;
        let po_numbers = [];
        for (let i=0; i<self.multipleSelection.length; i++) {
          po_numbers.push(self.multipleSelection[i].po_number);
        }
        let operator = self.current_loggin_user;
        let type = "pack po";
        self.$http.post('/get-order-labels/', {
          po_numbers, operator, type
        }).then(function(res){
          let label_arr = JSON.parse(res.data);
          if (label_arr.length === 0) {
            this.$message({
              showClose: true,
              message: "Failed to create Fedex label",
              type: 'error'
            });
            return;
          }
          printer(label_arr);
          self.multipleSelection = [];
          self.selectedRow = {};
          loadTable()
        }, function(err){
          console.log(err);
        });

      },
      verifyOrder: function() {
        let self = this;
        let po_numbers = [];
        for (let i=0; i<self.multipleSelection.length; i++) {
          po_numbers.push(self.multipleSelection[i].po_number);
        }
        let operator = self.current_loggin_user;
        let type = "verify po";
        self.$http.post('/get-order-labels/', {
          po_numbers, operator, type
        }).then(function(res){
          console.log(res.data);
          loadTable();
        }, function(err){
          console.log(err)
        });
        self.multipleSelection = [];
        self.selectedRow = {};
      },
      printOrderDetail: function() {
        let self = this;
        let po_numbers = [];
        for (let i=0; i<self.multipleSelection.length; i++) {
          po_numbers.push(self.multipleSelection[i].po_number);
        }
        let operator = self.current_loggin_user;
        let type = "package detail print";
        self.$http.post('/get-order-labels/', {
          po_numbers, operator, type
        }).then(function(res){
          let label_arr = JSON.parse(res.data);
          printer(label_arr);
        }, function(err){
          console.log(err)
        });
        self.multipleSelection = [];
        self.selectedRow = {};
        loadTable()
      },
      printOrderDetailComplete: function() {
        let self = this;
        let po_numbers = [];
        for (let i=0; i<self.multipleSelectionComplete.length; i++) {
          po_numbers.push(self.multipleSelection[i].po_number);
        }
        let operator = self.current_loggin_user;
        let type = "package detail print";
        self.$http.post('/get-order-labels/', {
          po_numbers, operator, type
        }).then(function(res){
          let label_arr = JSON.parse(res.data);
          printer(label_arr);
        }, function(err){
          console.log(err)
        });
        self.multipleSelectionComplete = [];
        self.selectedRowComplete = {};
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
        // console.log("complete haha")
        console.log(selection.length);
        this.multipleSelectionComplete = selection;
      },
      clickCheckOrderCell(row) {
          this.dialogCheckOrder = !this.dialogCheckOrder;
          this.selectedRow = row;
          console.log("this.selectedRow :", this.selectedRow )
      },
      clickDeleteOrderCell(row) {
        this.selectedRow = row;
        this.$confirm(`${this.current_loggin_user}, do you really want to delete order ${row.po_number} ?`, 'Warning', {
          type: 'warning',
          cancelButtonText: "Cancel",
          confirmButtonText: "Confirm"
        }).then(() => {
          let operator = this.current_loggin_user;
          let po_number = row.po_number;
          this.$http.post('/delete-order/', {
            "operator": operator,
            "po_number": po_number
          }).then(function(res){
            console.log("successfully delete order, res is: ", res.data);
          }, function(err){
            console.log(err)
          });
          this.$message({
            type: 'success',
            message: 'Deleted!'
          });
          this.pendingOrders.remove(function(el) { return el.po_number === row.po_number; });
          this.multipleSelection.remove(function(el) { return el.po_number === row.po_number; });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel!'
          });
        });
      },
    }
  }
</script>