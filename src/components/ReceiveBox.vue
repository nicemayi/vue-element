<style>
</style>

<template>
    <div class="container-fluid" id="main_div" align="center">
        <div id="search_div" class="container-fluid" align="left" @keyup.enter="setFocus">
            <el-form :inline="true">
                <el-form-item>
                    <el-input id="search_tracking"
                        placeholder="Scan box barcode..."
                        style="width: 100%;"
                        v-model="scannedTrackingID"
                        :autofocus="inputFocus"
                        :disabled="current_loggin_user == ''"
                        auto-complete="off">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="clearInput">Reset</el-button>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-input id="search_tracking"
                        placeholder="Filter..."
                        style="width: 100%;"
                        v-model="searchFor"
                        auto-complete="off">
                    </el-input>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="primary" @click="clickSearch">Search Date</el-button>
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
        <el-table
            :data="filteredTableData"
            height="620">
            <el-table-column
                property="tracking_id"
                label="Tracking ID"
                sortable>
            </el-table-column>
            <el-table-column
                property="box_type"
                label="Box Type"
                sortable>
            </el-table-column>
            <el-table-column
                property="received_by"
                label="Received By"
                sortable>
            </el-table-column>
            <el-table-column
                property="received_time"
                label="Received Time"
                sortable>
            </el-table-column>
            <el-table-column
                property="po_number"
                label="PO Number"
                sortable>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        beforeMount() {
            let self = this;
            let start_date = self.start_date;
            let end_date = self.end_date;
            self.$http.post('/load-receive-table/', {start_date, end_date}).then(function(res){
                self.tableData = JSON.parse(res.data);
            }, function(err){
                console.log(err)
            });
        },
        data() {
            return {
                scannedTrackingID: '',
                showLabel: '',
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
                searchFor: ''
            }
        },
        methods: {
            setFocus() {
                let trackID = this.scannedTrackingID.slice(22, this.scannedTrackingID.length);
                if (trackID != '') {
                    if (trackID.length == 12) {
                        this.receiveBox(trackID);
                        this.showLabel = trackID;
                    } else {
                        this.$notify.error({
                            title: 'Invalid tracking id detected:',
                            message: `${this.scannedTrackingID}`
                        });
                    }
                }
                this.scannedTrackingID = '';
                document.getElementsByClassName("el-input__inner")[0].focus();
            },
            clearInput() {
                this.scannedTrackingID = '';
                document.getElementsByClassName("el-input__inner")[0].focus();
            },
            receiveBox(scannedTrackingID) {
                // console.log("scannedTrackingID: ", scannedTrackingID);
                let self = this;
                let sendData = {
                    tracking_id: scannedTrackingID,
                    operator: self.current_loggin_user
                }
                self.$http.post('/receive-box/', sendData).then(function(res){
                    // console.log(res.data.length)
                    if (res.data == "update success") {
                        self.picked_date = '';
                        self.$notify.success({
                            title: `Hi ${self.current_loggin_user},`,
                            message: `You updated ${scannedTrackingID}.`,
                            offset: 600
                        });
                    } else if (res.data == "insert success") {
                        self.picked_date = '';
                        self.$notify.warning({
                            title: `Hi ${self.current_loggin_user},`,
                            message: `You added ${scannedTrackingID}.`,
                            offset: 600
                        });
                    } else if (res.data == "already recevied") {
                        self.picked_date = '';
                        self.$notify.error({
                            title: `Hi ${self.current_loggin_user},`,
                            message: "This box has been received."
                        });
                    } else {
                        self.picked_date = '';
                        self.$notify.error({
                            title: 'Error',
                            message: "Unknown error"
                        });
                    }
                    self.loadTable();
                }, function(err) {
                    self.$notify.error({
                        title: 'Error',
                        message: "Server error! Ask Zhe to fix it."
                    });
                });
            },
            // checkDetail(row) {
            //     console.log(row.po_number);
            // },
            // selectOneRowPending(selection, row) {
            //     this.multipleSelection = selection;
            // },
            // selectAllRowPending(selections) {
            //     this.multipleSelection = selections;
            // },
            clickSearch() {
                this.loadTable();
                this.searchFor = '';
            },
            loadTable() {
                let self = this;
                let start_date = self.start_date;
                let end_date = self.end_date;
                self.$http.post('/load-receive-table/', {start_date, end_date}).then(function(res){
                    self.tableData = JSON.parse(res.data);
                }, function(err){
                    console.log(err)
                });
            },
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
                        eachRow.po_number
                    ].join(' ');
                    return row_str.includes(self.searchFor.toUpperCase());
                })
            },
            current_loggin_user: function() {
                return this.$parent.current_loggin_user;
            },
            start_date: function() {
                if (this.picked_date) {
                    return this.picked_date[0];
                } else{
                    let start_date = new Date();
                    return start_date
                }
            },
            end_date: function() {
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


