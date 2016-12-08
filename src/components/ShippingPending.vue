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
            label="Client ID"
            sortable>
          </el-table-column>
          <el-table-column
            property="client_name"
            label="Name"
            sortable>
          </el-table-column>
          <el-table-column
            property="client_practice_name"
            label="Practice Name"
            sortable>
          </el-table-column>
          <el-table-column
            property="po_create_time"
            label="PO Created Time"
            sortable>
          </el-table-column>
          <el-table-column
            property="po_create_by"
            label="PO Created By"
            sortable>
          </el-table-column>
          <el-table-column
            property="po_packed_time"
            label="PO Packed Time"
            sortable>
          </el-table-column>
          <el-table-column
            property="po_packed_by"
            label="PO Packed By"
            sortable>
          </el-table-column>
          <el-table-column
            property="shipping_method"
            label="Shipping Method"
            sortable>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Add Order Comment"
            inline-template
            width="150">
            <el-button :disabled="!current_loggin_user" type="primary" icon="edit" size="small" @click="addCommentCell(row)">Add Comment</el-button>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Add Ship-out Label"
            inline-template
            width="100">
            <el-button :disabled="!current_loggin_user" type="warning" icon="edit" size="mini" @click="addLabel(row)">Add</el-button>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Check Detail"
            inline-template
            width="80">
            <el-button type="primary" icon="edit" size="mini" @click="clickCheckOrderCell(row)">Check</el-button>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Delete"
            inline-template
            width="80">
            <el-button :disabled="!current_loggin_user" type="danger" icon="delete" size="small" @click="clickDeleteOrderCell(row)"></el-button>
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
          <el-form :inline="true">
              <el-form-item>
                <el-input id="search_client_complete"
                  placeholder="search..."
                  v-model="searchTextComplete"
                  style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item style="float: right;">
                  <el-button type="primary" @click="loadTable">Search Date</el-button>
              </el-form-item>
              <el-form-item style="float: right;">
                  <el-date-picker
                      type="daterange"
                      align="right"
                      placeholder="Pick a range"
                      v-model="picked_date"
                      :picker-options="pickerOptions">
                  </el-date-picker>
              </el-form-item>
          </el-form>
        </div>
        <br/>
        <el-table
          :data="filteredCompleteTableData"
          @select="selectOneRowCompleted"
          @select-all="selectAllRowCompleted"
          height="620">
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
            property="po_create_time"
            label="PO Created Time">
          </el-table-column>
          <el-table-column
            property="po_create_by"
            label="PO Created By">
          </el-table-column>
          <el-table-column
            property="po_packed_time"
            label="PO Packed Time"
            sortable>
          </el-table-column>
          <el-table-column
            property="po_packed_by"
            label="PO Packed By"
            sortable>
          </el-table-column>
          <el-table-column
            property="po_verified_time"
            label="PO Verified Time"
            sortable>
          </el-table-column>
          <el-table-column
            property="po_verified_by"
            label="PO Verified By"
            sortable>
          </el-table-column>
          <el-table-column
            property="shipping_method"
            label="Shipping Method">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="Check Order Detail"
            inline-template>
            <el-button type="primary" icon="edit" size="mini" @click="clickCheckOrderCellComplete(row)">Check Order</el-button>
          </el-table-column>
        </el-table>
        <hr/>
        <div class="block" align="left">
          <span class="wrapper">
            <el-button type="danger" :disabled="multipleSelectionComplete.length == 0" @click="printOrderDetailComplete">Print Order Details</el-button>
          </span>
        </div>
      </el-tab-pane>
    </el-tabs>



    <el-dialog top= "5%" title='Order Details' v-model="dialogCheckOrder">
      <div align="left">
      <h3>{{this.selectedRow.client_address}}</h3>
      <hr/>
        <table class="table">
          <tbody>
            <tr><td><b>PO Number</b></td><td>{{this.selectedRow.po_number}}</td></tr>
            <tr v-for="(value, key) in this.selectedRow.Order_Details">
              <td><b>{{key.split('_').map(function(el) {return el.toUpperCase()}).join(' ')}}</b></td>
              <td>{{value}}</td>
            </tr>
            <hr/>
            <div v-if="this.selectedRow.tracking_ids && this.selectedRow.tracking_ids.length > 0">
              <h3>Tracking ID</h3>
              <el-button-group v-for="each_tracking_id in this.selectedRow.tracking_ids">
                <el-tooltip class="item" effect="dark" content="Click me to print label" placement="bottom">
                  <el-button :type="(each_tracking_id.track_id_type == 'OUT')? 'success': 'danger'" style="margin-right: 10px;" @click="printTrackingID(each_tracking_id.tracking_id)">({{each_tracking_id.track_id_type}}) {{each_tracking_id.tracking_id}}</el-button>
                </el-tooltip>
              </el-button-group>
            </div>
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

    <el-dialog top= "5%" title='Order Details' v-model="dialogCheckOrderComplete">
      <div align="left">
      <h3>{{this.selectedRow.client_address}}</h3>
      <hr/>
        <table class="table">
          <tbody>
            <tr><td><b>PO Number</b></td><td>{{this.selectedRow.po_number}}</td></tr>
            <tr v-for="(value, key) in this.selectedRow.Order_Details">
              <td><b>{{key.split('_').map(function(el) {return el.toUpperCase()}).join(' ')}}</b></td>
              <td>{{value}}</td>
            </tr>
            <hr/>
            <div v-if="this.selectedRow.tracking_ids && this.selectedRow.tracking_ids.length > 0">
              <h3>Tracking ID</h3>
              <el-button-group v-for="each_tracking_id in this.selectedRow.tracking_ids">
                <el-tooltip class="item" effect="dark" content="Click me to see where the package is!" placement="bottom">
                  <el-button :type="(each_tracking_id.track_id_type == 'OUT')? 'success': 'danger'" style="margin-right: 10px;" @click="checkTrackingID(each_tracking_id.tracking_id)">({{each_tracking_id.track_id_type}}) {{each_tracking_id.tracking_id}}</el-button>
                </el-tooltip>
              </el-button-group>
            </div>
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
      let self = this;
      self.$http.get('/shipping-pending-orders/').then(function(res){
        let res_status = res.data.status;
        self.pendingOrders = JSON.parse(res.data);
      }, function(err){
        console.log(err)
      });

      let start_date = self.start_date;
      let end_date = self.end_date;
      self.$http.post('/shipping-complete-orders/', {start_date, end_date}).then(function(res){
        let res_status = res.data.status;
        self.completeOrders = JSON.parse(res.data);
      }, function(err){
          console.log(err)
      });

      setInterval(function() {
        self.loadTable();
      }, 30000)

    },
    computed: {
      start_date: function() {
          if (this.picked_date) {
              return this.picked_date[0];
          } else{
              let dateNow = new Date();
              let dateToday = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
              let dateSunday = new Date(dateToday.getTime()-dateToday.getDay()*24*3600*1000);
              // console.log(dateSunday)
              return dateSunday
          }
      },
      end_date: function() {
          if (this.picked_date) {
              return this.picked_date[1];
          } else {
              let end_date = new Date();
              return end_date
          }
      },
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
            eachRow.po_packed_time,
            eachRow.po_packed_by.toLowerCase(),
            eachRow.shipping_method.toLowerCase(),
          ].join(' ');
          return row_str.includes(self.searchTextUpperCase);
        })
      },
      filteredCompleteTableData: function () {
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
            eachRow.po_packed_time,
            eachRow.po_packed_by.toLowerCase(),
            eachRow.po_verified_time,
            eachRow.po_verified_by.toLowerCase(),
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
        dialogCheckOrderComplete: false,
        selectedRow: {},
        selectedRowComplete: {},
        pendingOrders: [],
        completeOrders: [],
        picked_date: '',
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
      }
    },
    events: {

    },
    methods: {
      addLabel(row) {
        let self = this;
        self.selectedRow = row;
        let po_number = self.selectedRow.po_number;
        let add_by = self.current_loggin_user;
        let LabelType = "OUT";
        let addLabelRequest = {po_number, add_by, LabelType}

        self.$http.post("/add-shipping-label/", {addLabelRequest}).then(function(res) {
          let res_data = JSON.parse(res.data);
          if (res_data.ErrorDetail == '') {
            self.loadTable();
            let label_file = res_data.Labels;
            printer(label_file);
            self.$notify({
              title: 'Done',
              message: `Successfully add print-label for PO ${po_number}`,
              type: 'success'
            });
          } else {
            self.$notify.error({
              title: 'Error',
              message: res_data.ErrorDetail,
            });
          }
        }, function(err) {
          self.$notify.error({
            showClose: true,
            title: 'Error',
            message: `Server error, please contact Zhe or Ethan.`,
          });
        })
      },
      checkTrackingID(tracking_id) {
        // console.log("tracking_id: ", tracking_id);
        let url = `https://www.fedex.com/apps/fedextrack/?tracknumbers=${tracking_id}&cntry_code=us`
        window.open(
          url,
          '_blank'
        );
      },
      printTrackingID(tracking_id) {
        let self = this;
        self.$http.post("/get-tracking-id-label/", {tracking_id}).then(function(res) {
          let data = res.data;
          if (data == 'no label') {
            self.$message({
              showClose: true,
              message: `No such label found for ${tracking_id}`,
              type: 'error'
            });
            return;
          }
          if (data == 'bad request') {
            self.$message({
              showClose: true,
              message: "Bad request!",
              type: "error"
            });
          }
          let label = JSON.parse(data).label_file;
          printer([label]);
        }, function(err) {
          console.log(err);
        })
      },
      loadTable() {
        let self = this;
        self.$http.get('/shipping-pending-orders/').then(function(res){
          let res_status = res.data.status;
          self.pendingOrders = JSON.parse(res.data);
        }, function(err){
          console.log(err)
        });
        let start_date = self.start_date;
        let end_date = self.end_date;
        self.$http.post('/shipping-complete-orders/', {start_date, end_date}).then(function(res){
          let res_status = res.data.status;
          self.completeOrders = JSON.parse(res.data);
        }, function(err){
            console.log(err)
        });
      },
      addCommentCell(row) {
        let self = this;
        if (self.current_loggin_user != '') {
          if (row.po_number != '') {
            self.$prompt(`Type in comment for order ${row.po_number}:`, 'Comment', {
              cancelButtonText: "Cancel",
              confirmButtonText: "Confirm"
            }).then(({value}) => {
              if (value.trim() != '') {
                let operator = self.current_loggin_user;
                let comment = value;
                let po_number = row.po_number;
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
        let operator = self.current_loggin_user;
        for (let i=0; i<self.multipleSelection.length; i++) {

          let po_create_time = self.multipleSelection[i].po_create_time;
          let po_create_by = self.multipleSelection[i].po_create_by;
          let po_packed_by = self.multipleSelection[i].po_packed_by;
          let po_packed_time= self.multipleSelection[i].po_packed_time;
          let tag = self.multipleSelection[i].tag;

          if ((po_create_time != '') && (po_create_by != '') && (operator != '') && (po_packed_time == '') && (po_packed_by == '') && (tag == 'Unpacked')) {
            po_numbers.push(self.multipleSelection[i].po_number);
          }

        }

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
          self.multipleSelection.length = 0;
          self.selectedRow = {};
          self.loadTable()
        }, function(err){
          console.log(err);
          self.multipleSelection.length = 0;
          self.selectedRow = {};
          self.loadTable()
        });

      },
      verifyOrder: function() {
        let self = this;
        let po_numbers = [];
        let current_loggin_user = self.current_loggin_user;
        let operator = self.current_loggin_user;
        for (let i=0; i<self.multipleSelection.length; i++) {

          let po_packed_by = self.multipleSelection[i].po_packed_by;
          let po_packed_time= self.multipleSelection[i].po_packed_time;
          let tag = self.multipleSelection[i].tag;

          if ((po_packed_time != '') && (po_packed_by != '') && (current_loggin_user != '') && (current_loggin_user != po_packed_by) && (tag == 'Packed')) {
            po_numbers.push(self.multipleSelection[i].po_number);
          }
        }
        let type = "verify po";
        self.$http.post('/get-order-labels/', {
          po_numbers:po_numbers,
          operator: operator,
          type: type
        }).then(function(res){
          self.multipleSelection.length = 0;
          self.selectedRow = {};
          self.loadTable()
        }, function(err){
          console.log(err)
          self.multipleSelection.length = 0;
          self.selectedRow = {};
          self.loadTable()
        });
      },
      printOrderDetail: function() {
        let self = this;
        let po_numbers = [];
        let current_loggin_user = self.current_loggin_user;
        let operator = self.current_loggin_user;
        for (let i=0; i<self.multipleSelection.length; i++) {
          po_numbers.push(self.multipleSelection[i].po_number);
        }
        let type = "package detail print";
        self.$http.post('/get-order-labels/', {
          po_numbers, operator, type
        }).then(function(res){
          let label_arr = JSON.parse(res.data);
          if (label_arr.length === 0) {
            this.$message({
              showClose: true,
              message: "Failed to print order detail label",
              type: 'error'
            });
            return;
          }
          printer(label_arr);
          self.multipleSelection.length = 0;
          self.selectedRow = {};
          self.loadTable()
        }, function(err){
          self.multipleSelection.length = 0;
          self.selectedRow = {};
          self.loadTable()
        });
      },
      printOrderDetailComplete: function() {
        let self = this;
        let po_numbers = [];
        for (let i=0; i<self.multipleSelectionComplete.length; i++) {
          po_numbers.push(self.multipleSelectionComplete[i].po_number);
        }
        let operator = self.current_loggin_user;
        let type = "package detail print";
        self.$http.post('/get-order-labels/', {
          po_numbers, operator, type
        }).then(function(res){
          let label_arr = JSON.parse(res.data);
          printer(label_arr);
          self.multipleSelectionComplete.length = 0;
          self.selectedRow = {};
          self.loadTable()
        }, function(err){
          console.log(err)
          self.multipleSelectionComplete.length = 0;
          self.selectedRow = {};
          self.loadTable()
        });
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      selectOneRowPending(selection, row) {
        this.multipleSelection = selection;
      },
      selectAllRowPending(selections) {
        this.multipleSelection = selections;
      },
      selectOneRowCompleted(selection, row) {
        this.multipleSelectionComplete = selection;
      },
      selectAllRowCompleted(selection) {
        this.multipleSelectionComplete = selection;
      },
      clickCheckOrderCell(row) {
          this.dialogCheckOrder = !this.dialogCheckOrder;
          this.selectedRow = row;
          console.log(row);
          console.log("row.tracking_ids: ", row.client_address);
      },
      clickCheckOrderCellComplete(row) {
          this.dialogCheckOrderComplete = !this.dialogCheckOrderComplete;
          this.selectedRow = row;
          console.log(row);
          console.log("row.tracking_ids: ", row.client_address);
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