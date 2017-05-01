<style>
  .el-table .error-row {
    background: #ff9999;
  }
  .el-table .warning-row {
    background: #b3ccff;
  }
</style>

<template>
  <div class="container-fluid" id="main_div" align="center">
    <div id="search_div" class="container-fluid" align="left" >
      <el-form :inline="true">
        <el-form-item>
          <div class="el-input" :class="{ 'is-disabled': !isLogin }">
            <input autofocus :disabled="!isLogin" id="receive_box_input" type="text" @keyup.enter="receiveBox" class="el-input__inner" v-model="scannedTrackingID">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearInput">Reset</el-button>
          <button :disabled="!isLogin" :class="{ 'is-disabled': !isLogin, 'el-button': true, 'el-button--success': true }" @click="downloadCSV">Download Receive Log</button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-input id="search_tracking" placeholder="Filter..." style="width: 100%;" v-model="searchFor" auto-complete="off">
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
    <el-table :data="filteredTableData" fit height="700" v-loading="isLoading" :row-class-name="tableRowClassName">
      <el-table-column fixed property="tracking_id" label="Tracking ID" sortable width="140">
      </el-table-column>
      <el-table-column property="client_id" label="Client ID" sortable width="120">
      </el-table-column>
      <el-table-column property="po_number" label="PO" sortable width="80">
      </el-table-column>
      <el-table-column property="estimated_delivery_date" label="Est." sortable width="120">
      </el-table-column>
      <el-table-column property="fedex_delivery_date" label="Fedex Act." sortable width="140">
      </el-table-column>
      <el-table-column property="received_time" label="Received" sortable width="160">
      </el-table-column>
      <el-table-column property="is_delayed" label="Is Delayed" sortable min-width="150">
      </el-table-column>
      <el-table-column property="received_by" label="Rec." sortable width="100">
      </el-table-column>
      <el-table-column property="client_name" label="Name" sortable width="160">
      </el-table-column>
      <el-table-column property="client_practice_name" label="Practice Name" sortable width="200">
      </el-table-column>
      <el-table-column property="client_address" label="Address" sortable width="300">
      </el-table-column>
      <el-table-column property="received_comment" label="Note" min-width="600">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import ReceiveModal from './modals/ReceiveModal';
  import CSV from 'comma-separated-values';
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
        isLoading: false,
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
      downloadCSV(e) {
          if (e.clientX + e.clientY + e.screenX + e.screenY === 0) return;
          const user = this.current_loggin_user;
          if (!user) return;
          const tableData = [ ...this.filteredTableData ];
          if (tableData.len === 0) return;

          const file_str = `Box Receiving Log by ${user}.csv`;

          const tableHeaderArr = [
            "tracking_id",
            "client_id",
            "po_number",
            "estimated_delivery_date",
            "fedex_delivery_date",
            "received_time",
            "is_delayed",
            "received_by",
            "client_name",
            "client_practice_name",
            "client_address",
            "received_comment"
          ];
          let tableStr = tableHeaderArr.join(',') + '\n';
          let _data = [];
          tableData.forEach((row) => {
            const _tmp = [];
            for (let each of tableHeaderArr) {
              _tmp.push(row[each]);
            }
            _data.push(_tmp);
          });

          const a = new CSV(_data, { header: tableHeaderArr }).encode();

          const hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(a);
          hiddenElement.target = '_blank';
          hiddenElement.download = file_str;
          hiddenElement.click();
      },
      tableRowClassName(row, index) {
        if (row.is_delayed === 'Fedex Delay') {
          return 'error-row';
        } else if (row.is_delayed === 'Lab Late Receiving') {
          return 'warning-row';
        }
        return '';
      },
      clearInput() {
        this.scannedTrackingID = '';
        document.getElementById("receive_box_input").focus();
      },
      receiveBox() {
        const _lenth = this.scannedTrackingID.length;
        let scannedTrackingID;
        const full_tracking_id = this.scannedTrackingID;
        if (_lenth === 34) {
          scannedTrackingID = this.scannedTrackingID.slice(this.scannedTrackingID.length - 12, this.scannedTrackingID.length);
        } else {
          scannedTrackingID = this.scannedTrackingID;
        }
        const self = this;
        const sendData = {
          tracking_id: scannedTrackingID,
          operator: self.current_loggin_user
        }
        
        self.scannedTrackingID = '';
        self.isLoading = true;

        self.$http.post('/receive-box/', sendData).then(function (res) {
          if (res.data === 'update success') {
            self.isLoading = false;
            self.picked_date = '';
            self.$notify.success({
              title: `Hi ${self.current_loggin_user}`,
              message: `You updated ${scannedTrackingID}`,
              offset: 600
            });
          } else if (res.data === 'already recevied') {
            self.isLoading = false;
            self.picked_date = '';
            self.$notify.error({
              title: `Hi ${self.current_loggin_user},`,
              message: "This box has been received."
            });
          } else if (res.data === 'insert success') {
            self.isLoading = false;
            self.picked_date = '';
            self.$notify.success({
              title: `Hi ${self.current_loggin_user},`,
              message: `You added ${scannedTrackingID}`,
            });
          } else if (res.data === 'unknown kit') {
            self.isLoading = false;
            self.openInputCustomerInfoPrompt(full_tracking_id, (value) => {
              const tracking_id = full_tracking_id;
              const comment = value;
              const operator = self.current_loggin_user;
              const sendData = { comment, tracking_id, operator };
              self.$http.post('/receive-unknown-kit/', sendData).then((res) => {
                if (res.data === "put comment success") {
                  self.$notify.success({
                    title: `Hi ${self.current_loggin_user},`,
                    message: `You added ${tracking_id}`,
                  });
                  self.loadTable();
                } else {
                  self.$notify.error({
                    title: 'Error',
                    message: `${res.data}`
                  });
                }
              });
            }, () => {
              console.log("reject in catch");
            });
          } else if (res.data === 'timeout error') {
            self.isLoading = false;
            self.picked_date = '';
            self.$notify.error({
              title: `Hi ${self.current_loggin_user},`,
              message: `Fedex connection timeout, please try again/later.
              If this message keeps popping out, please contact Ethan/Zhe for assistance.`
            });
          }
          self.loadTable();
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
        const user = this.current_loggin_user;
        return this.$prompt(`${user}, please put some comments if you want to receive kit:`, `Invalid tracking ID: ${tracking_id}`, {
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
            eachRow.client_address.toUpperCase(),
            eachRow.client_phone_number,
            eachRow.received_comment.toUpperCase(),
            eachRow.is_delayed.toUpperCase(),
            eachRow.received_time
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
