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
</style>

<template>
  <div class="container-fluid" id="main_div">
    <el-row id="search_tag" :gutter="20">
      <el-col :span="8">
          <el-autocomplete
            v-model="searchForClient"
            :fetch-suggestions="querySearchClient"
            custom-item="client-id"
            :trigger-on-focus="false"
            :autofocus="true"
            placeholder="Client ID or Client Name..."
            @select="handleSelectClient">
          </el-autocomplete>
      </el-col>
    </el-row>
    <div v-if="displayClientStatus">
      <table class="table">
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Client Practice Name</th>
            <th>Client Type</th>
            <th>Client Address</th>
            <th>EDTA</th>
            <th>SST</th>
            <th>Plasma</th>
            <th>Urine</th>
            <th>Regular Box</th>
            <th>Big Box</th>
            <th>Requisition Forms</th>
            <th>Last PO Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{clientCurrentStatus.client_id}}</td>
            <td>{{clientCurrentStatus.client_name}}</td>
            <td>{{clientCurrentStatus.client_practice_name}}</td>
            <td>{{clientCurrentStatus.client_type}}</td>
            <td>{{clientCurrentStatus.client_address}}</td>
            <td>{{clientCurrentStatus.EDTA}}</td>
            <td>{{clientCurrentStatus.SST}}</td>
            <td>{{clientCurrentStatus.Plasma}}</td>
            <td>{{clientCurrentStatus.Urine}}</td>
            <td>{{clientCurrentStatus.regular_box}}</td>
            <td>{{clientCurrentStatus.big_box}}</td>
            <td>{{clientCurrentStatus.req}}</td>
            <td>{{clientCurrentStatus.last_update_time}}</td>
          </tr>
        </tbody>
      </table>
      <el-button type="primary" @click="placeOrder">Place Order?</el-button>
    </div>
    <el-dialog top= "2%" v-model="dialogFormVisible" size="large">
      <div class="block" align="left">
        <span id = "cancleOrCreateBtn" slot="footer" class="dialog-footer center" align="center">
          <el-button id="submit_btn" @click.native.prevent="onSubmit" type="danger" @click.native="dialogFormVisible = false">Create</el-button>
          <el-button @click.native="dialogFormVisible = false">Cancel</el-button>
        </span>
      </div>
      <div class="block" align="center">
        <el-form label-position="right" :inline="true">
          <el-form-item>
            <el-button type="primary">{{clientCurrentStatus.client_id}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning">{{clientCurrentStatus.client_name}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success">{{clientCurrentStatus.client_practice_name}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="default">{{clientCurrentStatus.client_address}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <hr/>
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
  var Vue = require('vue');
  Vue.component('client-id', {
    functional: true,
    render: function (h, ctx){
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('h3', { attrs: { class: 'name' } }, [item.client_name]),
        h('div', { attrs: { class: 'addr' } }, [item.client_id])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });
  export default {
    data() {
      return {
        dialogFormVisible: false,
        displayClientStatus: false,
        // searchSuggestions: [],
        searchForClient: '',
        clientCurrentStatus: {
          "client_id": '',
          "EDTA": '',
          "SST": '',
          "Plasma": '',
          "Urine": '',
          "regular_box": '',
          "big_box": '',
          "req": '',
          "last_update_time": '',
          "client_name": '',
          "client_practice_name": '',
          "client_type": '',
          "client_address": ''
        },
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
        select_ph_item: '',
        textAreaRows: 7,
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
        searchText: '',
        select_ph_num: 0,
        ph_items: [
          { "value": "VA. requisition form"},
          { "value": "VA. requisition form Carbon"},
          { "value": "VG. requisition form"},
          { "value": "VW. requisition form"},
          { "value": "tubes"},
        ],
        select_ph_item_arr: [],
      };
    },
    beforeMount(){
      this.$http.get('/get-clients/').then(function(res){
        this.searchSuggestions = JSON.parse(res.data);
      }, function(err){
        // console.log("fail!");
        console.log(err)
      });
    },
    methods: {
      querySearch(queryString, cb) {
        var ph_items = this.ph_items;
        var results = queryString ? ph_items.filter(this.createFilter(queryString)) : ph_items;
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
        this.select_ph_item_arr.push({
          "item_name": select_ph_item,
          "item_number": select_ph_num
        });
        this.select_ph_item = '';
        this.select_ph_num = 0;
      },
      deletePHItem(item) {
        console.log("ITEM: ", item);
      },
      onSubmit() {
        let self = this;
        self.$http.post('/place-client-order-inventory/', {order: self.order}).then(function(res){
          console.log("res is: ", res);
        });
      },
      placeOrder() {
        this.dialogFormVisible = true;
        this.order.selectClientID = this.clientCurrentStatus.client_id;
        this.order.selectClientType = this.clientCurrentStatus.client_type;
        this.order.selectClientName = this.clientCurrentStatus.client_name;
      },
      querySearchClient(queryString, cb) {
        var searchSuggestions = this.searchSuggestions;
        var results = queryString ? searchSuggestions.filter(this.createFilterClient(queryString)) : searchSuggestions;
        cb(results);
      },
      createFilterClient(queryString) {
        return (searchSuggestions) => {
          let isName = (searchSuggestions.client_name.indexOf(queryString.toUpperCase()) === 0);
          let isID = (searchSuggestions.client_id.indexOf(queryString.toUpperCase()) === 0);
          return isName | isID
        };
      },
      handleSelectClient(item) {
        var self = this;
        self.displayClientStatus = true;
        console.log("hahahaha", item.client_id);
        self.$http.post('/get-client_inventory/', {client_id: item.client_id}).then(function(res){
          console.log("res is: ", res);
          let data = JSON.parse(res.data);
          self.clientCurrentStatus.client_id = data.client_id;
          self.clientCurrentStatus.EDTA = data.EDTA;
          self.clientCurrentStatus.SST = data.SST;
          self.clientCurrentStatus.Plasma = data.Plasma;
          self.clientCurrentStatus.Urine = data.Urine;
          self.clientCurrentStatus.regular_box = data.regular_box;
          self.clientCurrentStatus.big_box = data.big_box;
          self.clientCurrentStatus.req = data.req;
          self.clientCurrentStatus.last_update_time = data.last_update_time;
          self.clientCurrentStatus.client_name = data.client_name;
          self.clientCurrentStatus.client_type = data.client_type;
          self.clientCurrentStatus.client_practice_name = data.client_practice_name;
          self.clientCurrentStatus.client_address = data.client_address;
        }, function(err){
          console.log(err)
        });
      },
    },
  }
</script>