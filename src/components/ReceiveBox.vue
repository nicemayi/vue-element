<style>

</style>

<template>
  <div class="container-fluid" id="main_div" align="center">
    <div id="search_div" class="container-fluid" align="left" >
      <el-form :inline="true">
        <el-form-item>
        <div class="el-input is-disabled">
          <input :disabled="isLogin" id="receive_box_input" type="text" @keyup.enter="receiveBox" class="el-input__inner" v-model="scannedTrackingID">
        </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearInput">Reset</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-input :disabled="true" id="search_tracking" placeholder="Filter..." style="width: 100%;" v-model="searchFor" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="clickSearch">Search Date</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-date-picker type="daterange" align="right" placeholder="Pick a range" v-model="picked_date" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="filteredTableData" height="620">
      <el-table-column property="tracking_id" label="Tracking ID" sortable>
      </el-table-column>
      <el-table-column property="po_number" label="PO Number" sortable>
      </el-table-column>
      <el-table-column property="client_id" label="Client ID" sortable>
      </el-table-column>
      <el-table-column property="client_practice_name" label="Practice Name" sortable>
      </el-table-column>
      <el-table-column property="client_street" label="Street" sortable>
      </el-table-column>
      <el-table-column property="client_state" label="State" sortable>
      </el-table-column>
      <el-table-column property="client_zipcode" label="Zipcode" sortable>
      </el-table-column>
      <el-table-column property="client_phone_number" label="Phone Number" sortable>
      </el-table-column>
      <el-table-column property="box_type" label="Box Type" sortable>
      </el-table-column>
      <el-table-column property="received_by" label="Received By" sortable>
      </el-table-column>
      <el-table-column property="received_time" label="Received Time" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import ReceiveModal from './modals/ReceiveModal';
  export default {
    components: {
      "receive-modal": ReceiveModal
    },
    beforeMount() {
      let self = this;
      let start_date = self.start_date;
      let end_date = self.end_date;
      self.$http.post('/load-receive-table/', {
        start_date,
        end_date
      }).then(function (res) {
        self.tableData = JSON.parse(res.data);
      }, function (err) {
        console.log(err)
      });
    },
    mounted() {
      this.clearInput();
    },
    data() {
      return {
        modalData: {},
        scannedTrackingID: '',
        inputFocus: true,
        tableData: [],
        selectedRow: {},
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
        tableLoading: true,
        searchFor: '',
        inputBoxType: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      clearInput() {
        this.scannedTrackingID = '';
        document.getElementById("receive_box_input").focus();
      },
      receiveBox() {
        const scannedTrackingID = this.scannedTrackingID.slice(22, this.scannedTrackingID.length);
        const self = this;
        const sendData = {
          tracking_id: scannedTrackingID,
          operator: self.current_loggin_user
        }
        self.$http.post('/receive-box/', sendData).then(function (res) {
          if (res.data === 'update success') {
            self.picked_date = '';
            self.$nofify.success({
              title: `Hi ${self.current_loggin_user}`,
              message: `You updated ${scannedTrackingID}`,
              offset: 600
            });
          } else if (res.data === 'already recevied') {
            self.picked_date = '';
            self.$notify.error({
              title: `Hi ${self.current_loggin_user},`,
              message: "This box has been received."
            });
          } else if (res.data === 'insert success') {
            self.picked_date = '';
            self.$notify.success({
              title: `Hi ${self.current_loggin_user},`,
              message: `You added ${scannedTrackingID}`,
            });
          } else {
            console.log(res.data)
            self.openInputCustomerInfoPrompt(scannedTrackingID, (value) => {
              console.log("resolve in then", value);
            }, () => {
              console.log("reject in catch");
            });
          }
          self.loadTable();
          self.scannedTrackingID = '';
          document.getElementById("receive_box_input").focus();
        }, function (err) {
          self.$notify.error({
            title: 'Error',
            message: "Server error! Ask Zhe to fix it."
          });
        });
      },
      clickSearch() {
        this.loadTable();
        this.searchFor = '';
      },
      loadTable() {
        let self = this;
        let start_date = self.start_date;
        let end_date = self.end_date;
        self.$http.post('/load-receive-table/', {
          start_date,
          end_date
        }).then(function (res) {
          self.tableData = JSON.parse(res.data);
        }, function (err) {
          console.log(err)
        });
      },
      openInputCustomerInfoPrompt(tracking_id, resolve, reject) {
        return this.$prompt('Please input shipper name', 'Invalid tracking ID detected', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
          })
          .then((value) => resolve(value))
          .catch(reject);
      }
    },
    computed: {
      filteredTableData: function () {
        var self = this;
        let table_data = self.tableData;
        return table_data.filter(function (eachRow) {
          let row_str = [
            eachRow.tracking_id.toUpperCase(),
            eachRow.box_type.toUpperCase(),
            eachRow.received_by.toUpperCase(),
            eachRow.po_number,
            eachRow.client_id,
            eachRow.client_practice_name.toUpperCase(),
            eachRow.client_street.toUpperCase(),
            eachRow.client_state.toUpperCase(),
            eachRow.client_zipcode,
            eachRow.client_phone_number
          ].join(' ');
          return row_str.includes(self.searchFor.toUpperCase());
        })
      },
      current_loggin_user: function () {
        return this.$parent.current_loggin_user;
      },
      isLogin: function() {
        return this.$parent.current_loggin_user !== '';
      },
      start_date: function () {
        if (this.picked_date) {
          return this.picked_date[0];
        } else {
          let start_date = new Date();
          return start_date
        }
      },
      end_date: function () {
        if (this.picked_date) {
          return this.picked_date[1];
        } else {
          let end_date = new Date();
          return end_date
        }
      }
    }
  }

</script>
