<style>
  #main_div {
    margin-top: 20px;
    align: center;
    width: 1800px;
    /*margin: auto;*/
  }
  el-tabs {
    align: center;
    width: 10px;
  }
</style>

<template>
  <div class="container-fluid" id="main_div">
    <el-tabs>
      <el-tab-pane label="Pending Order">
        <el-table
    :data="tableData"
    >
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      inline-template
      label="0909"
      width="120">
      <div>{{ row.client_id }}</div>
    </el-table-column>
    <el-table-column
      property="client_id"
      label="bbb"
      width="120">
    </el-table-column>
    <el-table-column
      property="client_id"
      label="aaa">
    </el-table-column>
  </el-table>
      </el-tab-pane>
<!--       <el-tab-pane label="Completed Order">

        <el-table
          :data="tableData3"
          border
          style="width: 100%">
          <el-table-column
            property="po_number"
            label="PO Number"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            property="client_id"
            label="Client ID"
            width="180">
          </el-table-column>
          <el-table-column
            property="created_time"
            label="Created Time">
          </el-table-column>
          <el-table-column
            property="created_by"
            label="Created By">
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



      </el-tab-pane> -->
    </el-tabs>

    <el-dialog title="收货地址" v-model="dialogFormVisible">
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
    data() {
      return {
        multipleSelection: [],
        dialogFormVisible: false,
        tableData: [
          {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }, {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }, {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }, {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }, {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }
        ],
        tableData3: [
          {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }, {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }, {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }, {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }, {
            po_number: '123454',
            client_id: '1003',
            client_name: 'haha',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
            client_address: "123, main st, Cupertino",
            EDTA: 0,
            SST: 1,
            Plasma: 2,
            Urine: 3,
            ESR: 4,
            regular_box: 100,
            big_box: 200,
            req: 300,
            shipping_method: "ground"
          }
        ],
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      cellClicked() {
        // this.dialogFormVisible = !this.dialogFormVisible;
      },
      select() {
        console.log("select");
      },
      selectAll() {
        console.log("selectAll");
      }
    }
  }
</script>