<style>
  #main_div {
    margin-top: 20px;
    width: 96%;
  }
  #search_div {
    margin-bottom: 10px;
  }
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
        <el-table
          :data="filteredTableData"
          @select="selectOneRowPending"
          @select-all="selectAllRowPending"
          @cell-click="cellClicked"
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
            property="shipping_method"
            label="Shipping Method">
          </el-table-column>
          <el-table-column
            prop="tag"
            width="100"
            inline-template>
            <el-button type="primary" icon="delete" size="small" @click="deleteMe(row)"></el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Completed Order">
        <div class="container-fluid" align="left">
          <el-input id="search_client"
            placeholder="search..."
            v-model="searchText"
            style="width: 200px;">
          </el-input>
        </div>
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
      </el-tab-pane>
    </el-tabs>

    <hr/>
    <div class="block" align="left">
      <span class="wrapper">
        <el-button type="success" :disabled="multipleSelection.length == 0">Pack Order</el-button>
        <el-button type="warning" :disabled="multipleSelection.length == 0">Verify Order</el-button>
        <el-button type="danger" :disabled="multipleSelection.length == 0">Print Order Details</el-button>
      </span>
    </div>

    <el-dialog top= "5%" title="收货地址" v-model="dialogFormVisible">
      <el-table :data="tableData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>

  </div>



</template>

<script>
  export default {
    beforeMount: function() {
      var self = this;
      self.$http.get('/shipping-order-status/').then(function(res){
        self.tableData = JSON.parse(res.data);
        console.log("res: ", res)
        console.log("res.data: ", res.data)
      }, function(err){
        console.log(err)
      });
    },
    computed: {
      filteredTableData: function () {
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
        searchText: '',
        multipleSelection: [],
        dialogFormVisible: false,
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
      formatter(row, column) {
        return row.address;
      },
      cellClicked() {
        // this.dialogFormVisible = !this.dialogFormVisible;
      },
      selectOneRowPending(selection, row) {
        console.log("pending hehe");
        console.log(selection.length);
        this.multipleSelection = selection;
      },
      selectAllRowPending(selection) {
        console.log("pending haha")
        this.multipleSelection = selection;
        console.log("this.multipleSelection: ", this.multipleSelection);
      },
      selectOneRowCompleted(selection, row) {
        console.log("complete hehe");
        console.log(selection.length);
      },
      selectAllRowCompleted(selection) {
        console.log("complete haha")
        console.log(selection.length);
      },
      cellClicked(row, column, cell, event) {
        // console.log("cell.className: ", cell.className)
        if ((cell.className != 'el-table_1_column_1') && (cell.className != 'el-table_1_column_9')) {
          console.log("row: ", row)
          console.log("column: ", column)
          console.log("cell: ", cell.className)
          console.log("event: ", event)
          console.log("row clicked!");
          this.dialogFormVisible = !this.dialogFormVisible;
          // alert("haha");
        }
      },
      deleteMe (row) {
        // console.log(a);
        // tableData
        this.tableData.remove(function(el) { return el.po_number === row.po_number; });
        this.multipleSelection.remove(function(el) { return el.po_number === row.po_number; });
        console.log("po number is: ", row.po_number);
      }
    }
  }
</script>