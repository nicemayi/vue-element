<style>
  #main_div {
    margin-top: 20px;
  }
</style>

<template>
  <div class="container" id="main_div">
  <el-tabs>
    <el-tab-pane label="Pending Order">
      <el-table
        :data="tableData"
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
          property="SST"
          label="SST">
        </el-table-column>
        <el-table-column
          property="EDTA"
          label="EDTA">
        </el-table-column>
        <el-table-column
          property="Plasma"
          label="Plasma">
        </el-table-column>
        <el-table-column
          property="Urine"
          label="Urine">
        </el-table-column>
        <el-table-column
          property="ESR"
          label="ESR">
        </el-table-column>
        <el-table-column
          property="regular_box"
          label="Regular Box">
        </el-table-column>
        <el-table-column
          property="big_box"
          label="Big Box">
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
    <el-tab-pane label="Completed Order">

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
          property="SST"
          label="SST">
        </el-table-column>
        <el-table-column
          property="EDTA"
          label="EDTA">
        </el-table-column>
        <el-table-column
          property="Plasma"
          label="Plasma">
        </el-table-column>
        <el-table-column
          property="Urine"
          label="Urine">
        </el-table-column>
        <el-table-column
          property="ESR"
          label="ESR">
        </el-table-column>
        <el-table-column
          property="regular_box"
          label="Regular Box">
        </el-table-column>
        <el-table-column
          property="big_box"
          label="Big Box">
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

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            po_number: '123454',
            client_id: '1003',
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
            created_time: '2016-10-21 18:30:00',
            created_by: 'zhe',
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
      }
    }
  }
</script>