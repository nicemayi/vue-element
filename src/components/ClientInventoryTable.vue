<style>
  #main_div {
    margin-top: 20px;
    width: 96%;
  }
  #search_tag {
    margin-bottom: 10px;
  }
  .container-fluid {
      -webkit-user-select: none; /* webkit (safari, chrome) browsers */
      -moz-user-select: none; /* mozilla browsers */
      -khtml-user-select: none; /* webkit (konqueror) browsers */
      -ms-user-select: none; /* IE10+ */
  }
  .round {
    width: 50px;
    height: 50px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.33;
    border-radius: 25px;
  }
</style>

<template>
  <div class="container-fluid" id="main_div">
    <el-row id="search_tag" :gutter="20">
      <el-col :span="4">
        <el-input id="search_client"
          placeholder="search..."
          v-model="searchText">
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="filteredTableData"
      stripe
      show-tooltip-when-overflow="true"
      @row-click="rowClicked">
      <el-table-column
        property="client_id"
        label="Client ID"
        sortable>
      </el-table-column>
      <el-table-column
        property="client_type"
        label="Type"
        sortable
        width="180"
        inline-template>
        <el-tag :type="row.client_type === 'doctor' ? 'primary' : 'success'" close>{{row.client_type}}</el-tag>
      </el-table-column>
      <el-table-column
        property="client_name"
        label="Client Name"
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
        label="Reg. Box"
        sortable>
      </el-table-column>
      <el-table-column
        property="req"
        label="Req. Form"
        sortable>
      </el-table-column>
      <el-table-column
        property="last_update_time"
        label="Last PO Time"
        sortable
        :formatter="formatDatetime">
      </el-table-column>
    </el-table>
    <el-dialog top= "2%" v-model="dialogFormVisible" size="large">
      <div class="block" align="left" style="margin-bottom: 20px;">
        <span class="wrapper">
          <el-button type="primary">{{order.selectClientID}}</el-button>
          <el-button type="warning">{{order.selectClientType}}</el-button>
          <el-button type="success">{{order.selectClientName}}</el-button>
        </span>
        <div class="block" align="right" style="margin-bottom: 20px;float: right;">
          <span id = "cancleOrCreateBtn" slot="footer" class="dialog-footer center" align="center">
            <el-button @click.native="dialogFormVisible = false">Cancel</el-button>
            <el-button id="submit_btn" :disable="ifValidOrder" @click.native.prevent="onSubmit" type="danger" @click.native="dialogFormVisible = false">Create</el-button>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="panel-group">
            <div class="panel panel-success">
              <div class="panel-heading" >
                <el-form ref="form" label-position="left">
                  <el-form-item label="Regular Box">
                    <el-input-number v-model="order.regular_cooler" size="large"></el-input-number>
                  </el-form-item>
                </el-form>
              </div>
              <div class="panel-body">
                <el-form label-position="top" inline align="center">
                  <el-form-item label="Serum Tube Only">
                    <el-input-number v-model="order.client_tube_set_sst" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Serum and EDTA tube">
                    <el-input-number v-model="order.client_tube_set_sst_and_edta" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Standard">
                    <el-input-number v-model="order.client_tube_set_standard" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="All HA">
                    <el-input-number v-model="order.client_tube_set_all_ha" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="All">
                    <el-input-number v-model="order.client_tube_set_all" size="large"></el-input-number>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="panel panel-success" style="margin-top: 20px;">
              <div class="panel-heading" >
                <el-form ref="form" label-position="left">
                  <el-form-item label="Big Box">
                    <el-input-number v-model="order.larger_cooler" size="large"></el-input-number>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="panel-group">
            <div class="panel panel-success">
              <div class="panel-heading">Tube Sets</div>
              <div class="panel-body">
                <el-form label-position="top" inline align="center">
                  <el-form-item label="Serum">
                    <el-input-number v-model="order.client_rack_sst" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="EDTA">
                    <el-input-number v-model="order.client_rack_edta" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Plasma">
                    <el-input-number v-model="order.client_rack_plasma" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Urine">
                    <el-input-number v-model="order.client_rack_urine" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="ESR">
                    <el-input-number v-model="order.client_rack_esr" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Transfer">
                    <el-input-number v-model="order.client_rack_transfer" size="large"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Bags">
                    <el-input-number v-model="order.client_rack_bags" size="large"></el-input-number>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="panel-group">
            <div class="panel panel-success">
              <div class="panel-heading">Phlebotomy Supplies/Req. Forms</div>
              <div class="panel-body">
                <el-form :inline="true">
                  <el-form-item>
                    <el-autocomplete
                      v-model="select_ph_item"
                      :fetch-suggestions="querySearch"
                      placeholder="search..."
                      @select="handleSelect">
                    </el-autocomplete>
                  </el-form-item>
                  <el-form-item>
                    <el-input-number :disabled="select_ph_item === ''" v-model="select_ph_num" :min="0"></el-input-number>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" :disabled="(select_ph_item === '') ||(select_ph_num == 0)" class="el-icon-check" @click="addPHItem"></el-button>
                  </el-form-item>
                  <el-button-group v-if="select_ph_item_arr.length > 0">
                    <el-badge
                      v-for="(each_select_ph_item, index) in select_ph_item_arr"
                      :value="each_select_ph_item.item_number"
                      style="margin: 10px 20px 10px 20px;">
                      <el-button size="small" @click="select_ph_item_arr.splice(index, 1)">{{each_select_ph_item.item_name}}</el-button>
                    </el-badge>
                  </el-button-group>
                </div>
              </div>
            </div>
            <div class="panel panel-success" style="margin-top: 20px;">
              <div class="panel-heading">Shipping Methods</div>
              <div class="panel-body">
                <el-select v-model="order.shipping_method" placeholder='Please choose shipping method'>
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="panel panel-success" style="margin-top: 20px;">
              <div class="panel-heading">Comments</div>
              <div class="panel-body">
                <el-input type="textarea" :rows="textAreaRows" v-model="order.comments"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            eachRow.req,
            eachRow.client_name
          ].join(' ');
          return row_str.includes(self.searchText);
        })
      },
    },
    data() {
      return {
        select_ph_num: 0,
        select_ph_item: '',
        select_ph_item_arr: [],
        order: {
          selectClientName: '',
          selectClientType: '',
          selectClientID: '',
          regular_cooler: 0,
          client_tube_set_sst: 0,
          client_tube_set_sst_and_edta: 0,
          client_tube_set_standard: 10,
          client_tube_set_all_ha: 0,
          client_tube_set_all: 0,
          larger_cooler: 0,
          client_rack_edta: 0,
          client_rack_plasma: 0,
          client_rack_urine: 0,
          client_rack_esr: 0,
          client_rack_transfer: 0,
          client_rack_bags: 0,
          req_forms: 0,
          shipping_method: '',
          phlebotomy_supplies: '',
          comments: ''
        },
        textAreaRows: 7,
        selectClientID: '',
        selectClientType: '',
        selectClientName: '',
        options: [{
          value: 'ground',
          label: 'Ground'
        }, {
          value: 'two day',
          label: 'Two Day'
        }, {
          value: 'two day am',
          label: 'Two Day AM'
        }, {
          value: 'express saver',
          label: 'Express Saver'
        }, {
          value: 'first overnight',
          label: 'First Overnight'
        }, {
          value: 'standard overnight',
          label: 'Standard Overnight'
        }, {
          value: 'priority overnight',
          label: 'Priority overnight'
        }],
        dialogFormVisible: false,
        searchText: '',
        tableData: [
          {
            "client_name": "john",
            "client_type": "phlebotomist",
            "EDTA": 0,
            "ESR": 0,
            "Plasma": 0,
            "SST": 0,
            "Urine": 0,
            "big_box": 0,
            "client_id": 0,
            "create_time": "16/10/11 11:5726",
            "index": 2075,
            "is_active": "YES",
            "last_update_time": "",
            "modified_comments": "",
            "modified_time": "",
            "regular_box": 0,
            "req": 0
          },
          {
            "client_name": "do",
            "client_type": "phlebotomist",
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
            "client_name": "may",
            "client_type": "doctor",
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
            "last_update_time": "10/22/16 19:28:13",
            "modified_comments": "",
            "modified_time": "",
            "regular_box": 0,
            "req": -20
          },
          {
            "client_name": "penny",
            "client_type": "doctor",
            "EDTA": 0,
            "ESR": 0,
            "Plasma": 0,
            "SST": 0,
            "Urine": 0,
            "big_box": 0,
            "client_id": 1004,
            "create_time": "2016-10-11 11:57:26",
            "index": 2078,
            "is_active": "YES",
            "last_update_time": "",
            "modified_comments": "",
            "modified_time": "",
            "regular_box": 0,
            "req": 0
          }
        ],
        ph_items: [
          { "value": "VA. requisition form"},
          { "value": "VA. requisition form Carbon"},
          { "value": "VG. requisition form"},
          { "value": "VW. requisition form"},
          { "value": "tubes"},
        ]
      }
    },
    methods: {
      filterClientType(value, row) {
        return row.client_type === value;
      },
      formatDatetime(row, column) {
        return row.last_update_time
      },
      onSubmit(){
        console.log("on submit!");
      },
      rowClicked(row, event) {
        console.log(row.client_id)
        this.dialogFormVisible = !this.dialogFormVisible;
        this.order.selectClientID = row.client_id;
        this.order.selectClientType = row.client_type;
        this.order.selectClientName = row.client_name;
        delete this.singleSelection;
        // this.openModal(row)
      },
      querySearch(queryString, cb) {
        console.log("ph_items: ", this.ph_items);
        var ph_items = this.ph_items;
        var results = queryString ? ph_items.filter(this.createFilter(queryString)) : ph_items;
        // 调用 callback 返回建议列表的数据
        console.log("results", results);
        cb(results);
      },
      createFilter(queryString) {
        return (ph_items) => {
          return (ph_items.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log("hahahaha", item);
      },
      addPHItem() {
        let select_ph_item = this.select_ph_item;
        let select_ph_num = this.select_ph_num;
        console.log("hehe", select_ph_item, select_ph_num);
        this.select_ph_item_arr.push({
          "item_name": select_ph_item,
          "item_number": select_ph_num
        });
        this.select_ph_item = '';
        this.select_ph_num = 0;
      },
      deletePHItem(item) {
        console.log("ITEM: ", item);
      }
    },
  }
</script>