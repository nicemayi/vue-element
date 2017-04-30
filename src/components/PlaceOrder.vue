<style>
  #main_div {
    margin-top: 20px;
    width: 96%;
  }
</style>

<template>
  <div class="container-fluid" id="main_div">
    <el-tabs style="width: 100%;">
      <el-tab-pane label="Client Order">
        <div class="row row-eq-height">
          <div class="col-md-3 col-sm-4 col-xm-6">
            <div class="panel panel-danger">
              <div class="panel-heading">Client Information</div>
              <div class="panel-body">
                <div>
                  <el-autocomplete
                    v-model="searchForClient"
                    :fetch-suggestions="querySearchClient"
                    custom-item="client-id"
                    :trigger-on-focus="false"
                    :autofocus="true"
                    placeholder="You can search for ID number or name..."
                    @select="handleSelectClient"
                    style="width: 100%;">
                  </el-autocomplete>
                  <br>
                </div>
                <table class="table table-hover" v-if="clientCurrentStatus.client_id">
                  <tbody>
                    <tr>
                      <td><b>ID</b></td>
                      <td>{{clientCurrentStatus.client_id}}</td>
                    </tr>
                    <tr>
                      <td><b>Name</b></td>
                      <td>{{clientCurrentStatus.client_name}}</td>
                    </tr>
                    <tr>
                      <td><b>Practice Name</b></td>
                      <td>{{clientCurrentStatus.client_practice_name}}</td>
                    </tr>
                    <tr>
                      <td><b>Type</b></td>
                      <td>{{clientCurrentStatus.client_type}}</td>
                    </tr>
                    <tr>
                      <td><b>Street</b></td>
                      <td>{{clientCurrentStatus.client_street}}</td>
                    </tr>
                    <tr>
                      <td><b>City</b></td>
                      <td>{{clientCurrentStatus.client_city}}</td>
                    </tr>
                    <tr>
                      <td><b>State</b></td>
                      <td>
                        {{clientCurrentStatus.client_state}}
                      </td>
                    </tr>
                    <tr>
                      <td><b>Zip Code</b></td>
                      <td>{{clientCurrentStatus.client_zipcode}}</td>
                    </tr>
                    <tr>
                      <td><b>Last PO Time</b></td>
                      <td>{{clientCurrentStatus.last_update_time}}</td>
                    </tr>
                    <tr>
                      <td><b>Shipping</b></td>
                      <td>
                        <div>
                          <el-checkbox v-model="sameShippingAddress">Same as client contact address?</el-checkbox>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="!sameShippingAddress">
                  <el-autocomplete
                    v-model="searchForShippingAddress"
                    :fetch-suggestions="querySearchClient"
                    custom-item="client-id"
                    :trigger-on-focus="false"
                    :autofocus="true"
                    placeholder="You can search for ID number or name..."
                    @select="handleSelectClient"
                    style="width: 100%;">
                  </el-autocomplete>
                  <br>
                </div>
              </div>
            </div>
            <!-- <el-checkbox style="margin-bottom: 1rem;" v-model="client_order.isStandingOrder">This is a standing order.</el-checkbox> -->
            <!-- <hr/>
            <el-form :inline="true" label-position="top" v-if="client_order.isStandardingOrder">
              <el-form-item label="Starting Date">
                <el-date-picker
                  type="date"
                  v-model="standingOrderStartingDate"
                  placeholder="Pick a day">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="Time Period">
                <el-select v-model="standOrderPeriod" placeholder="Select">
                  <el-option
                    v-for="option in standOrderPeriodOptions"
                    :label="option.label"
                    :value="option.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <hr/> -->
            <el-button type="danger" :disabled="!isValidClientOrder" @click="submitClientOrder">Place Client Order</el-button>
          </div>
          <div class="col-md-3 col-sm-4 col-xm-6">
            <div class="panel panel-primary">
              <div class="panel-heading">Regular Box</div>
              <div class="panel-body">
                <div>
                  <h4>How many regular boxes?</h4>
                  <br/>
                  <el-input-number v-model="client_order.regular_box"></el-input-number>
                </div>
                <br/>
                <div>
                  <h4>What's inside each regular box?</h4>
                  <br/>
                  <el-form label-position="right">
                    <el-form-item label="Serum Tube Only">
                      <el-input-number v-model="client_order.ReBox_SST" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Serum and EDTA Tube">
                      <el-input-number v-model="client_order.ReBox_SST_EDTA" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Standard">
                      <el-input-number v-model="client_order.ReBox_Stand" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="All HA">
                      <el-input-number v-model="client_order.ReBox_ALL_HA" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="All">
                      <el-input-number v-model="client_order.ReBox_ALL" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-4 col-xm-6">
            <div class="panel panel-primary">
              <div class="panel-heading">Tube Sets</div>
              <div class="panel-body">
                <el-form label-position="right">
                  <el-form-item label="Serum">
                    <el-input-number v-model="client_order.Serum_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="EDTA">
                    <el-input-number v-model="client_order.EDTA_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Plasma">
                    <el-input-number v-model="client_order.Plasma_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Urine">
                    <el-input-number v-model="client_order.Urine_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="ESR">
                    <el-input-number v-model="client_order.ESR_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Transfer">
                    <el-input-number v-model="client_order.Transfer_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Bags">
                    <el-input-number v-model="client_order.Bags_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-4 col-xm-6">
            <div class="panel panel-primary">
              <div class="panel-heading">Phlebotomy Supplies/Req. Forms</div>
              <div class="panel-body">
                <el-autocomplete
                  :fetch-suggestions="querySearch"
                  placeholder="search..."
                  size="large"
                  v-model="client_select_ph_item"
                  @select="handleSelect"
                  >
                </el-autocomplete>
                <br/>
                <el-form :inline="true">
                  <el-form-item>
                    <el-input-number
                      :disabled="client_select_ph_item === ''"
                      :min="0"
                      v-model="client_select_ph_num">
                    </el-input-number>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      :disabled="(client_select_ph_num === '') ||(client_select_ph_num == 0)"
                      class="el-icon-check"
                      @click="addClientPHItem">
                    </el-button>
                  </el-form-item>
                </el-form>
                <div>
                  <ul>
                    <li v-for="(each_select_ph_item, index) in client_select_ph_item_arr" style="margin-bottom: 10px;">
                      <el-button size="small" type="primary" icon="delete" @click="client_select_ph_item_arr.splice(index, 1)"></el-button>
                      {{each_select_ph_item.item_name}}, {{each_select_ph_item.item_number}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">Big Box</div>
              <div class="panel-body">
                <div><el-input-number v-model="client_order.big_box"></el-input-number></div>
              </div>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">Shipping Method</div>
              <div class="panel-body">
                <el-select placeholder="Select" v-model="client_order.shipping_method">
                  <el-option
                    v-for="each_option in shipping_options"
                    :label="each_option.label"
                    :value="each_option.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">Comments</div>
              <div class="panel-body">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 1}"
                  placeholder="You can add comments here..."
                  v-model="client_order.comments">
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Place Patient Order">
        <div class="row">
          <div class="col-md-3 col-sm-4 col-xm-6">
            <div class="panel panel-danger">
              <div class="panel-heading">Edit Patient Information</div>
              <div class="panel-body">
                <el-form label-width="120px">
                  <el-form-item label="Name">
                    <el-input placeholder="Patient Name" v-model="patient_order.patient_name"></el-input>
                  </el-form-item>
                  <el-form-item label="Phone#">
                    <el-input placeholder="Patient Phone Number" v-model="patient_order.patient_phone_number"></el-input>
                  </el-form-item>
                  <el-form-item label="Street Address">
                    <el-input placeholder="Patient Street Address" v-model="patient_order.patient_street_address"></el-input>
                  </el-form-item>
                  <el-form-item label="City">
                    <el-input placeholder="City" v-model="patient_order.patient_city"></el-input>
                  </el-form-item>
                  <el-form-item label="State">
                    <el-select placeholder="Select State" v-model="patient_order.patient_state">
                      <el-option
                        v-for="patient_state in States"
                        :label="patient_state.name"
                        :value="patient_state.abbreviation">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Zip Code">
                    <el-input placeholder="Zip Code" v-model="patient_order.patient_zipcode"></el-input>
                  </el-form-item>
              </div>
            </div>
            <el-button type="danger" :disabled="!isValidPatientOrder" @click="submitPatientOrder">Place Patient Order</el-button>
          </div>
          <div class="col-md-3 col-sm-4 col-xm-6">
            <div class="panel panel-primary">
              <div class="panel-heading">Regular Box</div>
              <div class="panel-body">
                <div>
                  <h4>How many regular boxes?</h4>
                  <br/>
                  <el-input-number v-model="patient_order.regular_box"></el-input-number>
                </div>
                <br/>
                <div>
                  <h4>What's inside each regular box?</h4>
                  <br/>
                  <el-form label-position="left">
                    <el-form-item label="Serum Tube Only">
                      <el-input-number v-model="patient_order.ReBox_SST" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Serum and EDTA Tube">
                      <el-input-number v-model="patient_order.ReBox_SST_EDTA" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Standard">
                      <el-input-number v-model="patient_order.ReBox_Stand" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="All HA">
                      <el-input-number v-model="patient_order.ReBox_ALL_HA" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="All">
                      <el-input-number v-model="patient_order.ReBox_ALL" style="width: 50%; float:right;"></el-input-number>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-4 col-xm-6">
            <div class="panel panel-primary">
              <div class="panel-heading">Tube Sets</div>
              <div class="panel-body">
                <el-form label-position="left">
                  <el-form-item label="Serum">
                    <el-input-number v-model="patient_order.Serum_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="EDTA">
                    <el-input-number v-model="patient_order.EDTA_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Plasma">
                    <el-input-number v-model="patient_order.Plasma_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Urine">
                    <el-input-number v-model="patient_order.Urine_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="ESR">
                    <el-input-number v-model="patient_order.ESR_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Transfer">
                    <el-input-number v-model="patient_order.Transfer_Tube_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="Bags">
                    <el-input-number v-model="patient_order.Bags_Pack" style="width: 50%; float:right;"></el-input-number>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-4 col-xm-6">
            <div class="panel panel-primary">
              <div class="panel-heading">Phlebotomy Supplies/Req. Forms</div>
              <div class="panel-body">
                <el-autocomplete
                  :fetch-suggestions="querySearch"
                  placeholder="search..."
                  size="large"
                  v-model="patient_select_ph_item"
                  @select="handleSelect"
                  >
                  <el-option-group
                    v-for="group in ph_items"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-autocomplete>
                <br/>
                <el-form :inline="true">
                  <el-form-item>
                    <el-input-number
                      :disabled="patient_select_ph_item === ''"
                      :min="0"
                      v-model="patient_select_ph_num">
                    </el-input-number>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      :disabled="(patient_select_ph_num === '') ||(patient_select_ph_num == 0)"
                      class="el-icon-check"
                      @click="addPatientPHItem">
                    </el-button>
                  </el-form-item>
                </el-form>
                <div>
                  <ul>
                    <li v-for="(each_select_ph_item, index) in patient_select_ph_item_arr" style="margin-bottom: 10px;">
                      <el-button size="small" type="primary" icon="delete" @click="patient_select_ph_item_arr.splice(index, 1)"></el-button>
                      {{each_select_ph_item.item_name}}, {{each_select_ph_item.item_number}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">Big Box</div>
              <div class="panel-body">
                <div><el-input-number v-model="patient_order.big_box"></el-input-number></div>
              </div>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">Shipping Method</div>
              <div class="panel-body">
                <el-select placeholder="Select" v-model="patient_order.shipping_method">
                  <el-option
                    v-for="each_option in shipping_options"
                    :label="each_option.label"
                    :value="each_option.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">Comments</div>
              <div class="panel-body">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 1}"
                  placeholder="You can add comments here..."
                  v-model="patient_order.comments">
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  var Vue = require('vue');
  import States from '../USA_states'
  Vue.component('client-id', {
    functional: true,
    render: function (h, ctx){
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('h4', { attrs: { class: 'name' } }, [item.client_practice_name]),
        h('h5', { attrs: { class: 'name' } }, [item.client_name]),
        h('div', { attrs: { class: 'addr' } }, [item.client_id])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });

  function validatePhoneNumber(phone_number) {
    let phone_re = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
    return phone_re.test(phone_number)
  }
  function validateZipcode(zipcode) {
    let zipcode_re =/^[0-9]{5}$/;
    return zipcode_re.test(zipcode);
  }

  export default {
    computed: {
      isValidClientOrder: function() {

        if (!this.current_loggin_user) {
          return false;
        }
        if (!this.clientCurrentStatus.client_id) {
          return false
        }
        if (!this.client_order.shipping_method) {
          return false
        }
        if ((this.client_order.ReBox_ALL + this.client_order.ReBox_Stand + this.client_order.ReBox_SST_EDTA + this.client_order.ReBox_SST + this.client_order.ReBox_ALL_HA + this.client_order.regular_box + this.client_order.big_box + this.client_order.Transfer_Tube_Pack + this.client_order.Plasma_Tube_Pack + this.client_order.Urine_Tube_Pack + this.client_order.Serum_Tube_Pack + this.client_order.ESR_Tube_Pack + this.client_order.EDTA_Tube_Pack + this.client_order.Bags_Pack == 0) && (this.client_select_ph_item_arr.length == 0)) {
          return false;
        }
        return true;
      },
      isValidPatientOrder: function() {
        let cond_loggin = (this.current_loggin_user == '');
        if (cond_loggin) {
          return false;
        }
        let cond_patient_info = (this.patient_order.patient_name != '') && (this.patient_order.patient_phone_number != '') && (this.patient_order.patient_street_address != '') && (this.patient_order.patient_city != '') && (this.patient_order.patient_state != '') && (this.patient_order.patient_zipcode != '');
        if (!cond_patient_info) {
          return false;
        }
        let cond_patient_order = (this.patient_order.ReBox_ALL + this.patient_order.ReBox_Stand + this.patient_order.ReBox_SST_EDTA + this.patient_order.ReBox_SST + this.patient_order.ReBox_ALL_HA + this.patient_order.regular_box + this.patient_order.big_box + this.patient_order.Transfer_Tube_Pack + this.patient_order.Plasma_Tube_Pack + this.patient_order.Urine_Tube_Pack + this.patient_order.Serum_Tube_Pack + this.patient_order.ESR_Tube_Pack + this.patient_order.EDTA_Tube_Pack + this.patient_order.Bags_Pack + this.patient_select_ph_item_arr.length) == 0;
        // console.log("this.patient_select_ph_item_arr.length: ", this.patient_select_ph_item_arr.length);
        // console.log((this.patient_order.ReBox_ALL + this.patient_order.ReBox_Stand + this.patient_order.ReBox_SST_EDTA + this.patient_order.ReBox_SST + this.patient_order.ReBox_ALL_HA + this.patient_order.regular_box + this.patient_order.big_box + this.patient_order.Transfer_Tube_Pack + this.patient_order.Plasma_Tube_Pack + this.patient_order.Urine_Tube_Pack + this.patient_order.Serum_Tube_Pack + this.patient_order.ESR_Tube_Pack + this.patient_order.EDTA_Tube_Pack + this.patient_order.Bags_Pack + this.patient_select_ph_item_arr.length));

        if (cond_patient_order) {
          return false;
        }
        return true;
      },
      current_loggin_user: function() {
        return this.$parent.current_loggin_user;
      },
    },
    data() {
      return {
        sameShippingAddress: true,
        standingOrderStartingDate: '',
        standOrderPeriodOptions: [{
            value: 'weekly',
            label: 'Weekly'
          },{
            value: 'bi-weekly',
            label: 'Bi-weekly'
          },{
            value: 'monthly',
            label: 'Monthly'
          },{
            value: 'bi-monthly',
            label: 'Bi-monthly'
          }
        ],
        // Client status
        searchForClient: '',
        searchForShippingAddress: '',
        clientCurrentStatus: {
          "client_id": '',
          "client_name": '',
          "client_practice_name": '',
          "last_update_time": '',
          "client_type": '',
          "client_street": "",
          "client_city": "",
          "client_state": "",
          "client_zipcode": ""
        },
        client_order: {
          isStandingOrder: false,
          operator: this.current_loggin_user,
          client_id: '',
          ReBox_ALL: 0,
          ReBox_Stand: 0,
          ReBox_SST_EDTA: 0,
          ReBox_SST: 0,
          ReBox_ALL_HA: 0,
          regular_box: 0,
          big_box: 0,
          Transfer_Tube_Pack: 0,
          Plasma_Tube_Pack: 0,
          Urine_Tube_Pack: 0,
          Serum_Tube_Pack: 0,
          ESR_Tube_Pack: 0,
          EDTA_Tube_Pack: 0,
          Bags_Pack: 0,
          phlebotomy_supplies: {},
          shipping_method: "",
          comments: ''
        },
        client_select_ph_item: '',
        client_select_ph_num: 0,
        client_select_ph_item_arr: [],


        // Patient status
        patient_order: {
          patient_name: '',
          patient_phone_number: '',
          patient_street_address: '',
          patient_city: '',
          patient_state: '',
          patient_zipcode: '',
          operator: this.current_loggin_user,
          ReBox_ALL: 0,
          ReBox_Stand: 0,
          ReBox_SST_EDTA: 0,
          ReBox_SST: 0,
          ReBox_ALL_HA: 0,
          regular_box: 0,
          big_box: 0,
          Transfer_Tube_Pack: 0,
          Plasma_Tube_Pack: 0,
          Urine_Tube_Pack: 0,
          Serum_Tube_Pack: 0,
          ESR_Tube_Pack: 0,
          EDTA_Tube_Pack: 0,
          Bags_Pack: 0,
          phlebotomy_supplies: {},
          shipping_method: "",
          comments: ''
        },
        patient_select_ph_item: '',
        patient_select_ph_num: 0,
        patient_select_ph_item_arr: [],
        // Functional variables
        States: States,
        dialogFormVisible: false,
        shipping_options: [{
          value: 'Ground',
          label: 'Ground'
        }, {
          value: 'Two Day',
          label: 'Two Day'
        }, {
          value: 'Two Day AM',
          label: 'Two Day AM'
        }, {
          value: 'Express Saver',
          label: 'Express Saver'
        }, {
          value: 'First Overnight',
          label: 'First Overnight'
        }, {
          value: 'Standard Overnight',
          label: 'Standard Overnight'
        }, {
          value: 'Priority Overnight',
          label: 'Priority Overnight'
        }],
        ph_items: [
          {
            label: "Regular Items",
            options: [
              { "value": "VA. requisition form"},
              { "value": "VA. requisition form Carbon"},
              { "value": "VG. requisition form"},
              { "value": "VW. requisition form"},
              { "value": "Butterfly Needles w/ regular hubs"},
              { "value": "Straight Needles w/ safety hubs"},
              { "value": "Tourniquets"},
              { "value": "Coban wrap"},
              { "value": "Medical tape"},
              { "value": "Gauze"},
              { "value": "Alcohol prep"},
              { "value": "Bandages"},
              { "value": "Sharps container"},
              { "value": "Tube rack"},
              { "value": "Pipettes"},
              { "value": "Urine cups"},
              { "value": "Patient kit ins (patient/phleb instructions, specimen handling)"},
              { "value": "Wheat Zoomer Instructions"},
              { "value": "VA brochure" },
              { "value": "Gut Pac brochure" },
              { "value": "Wheat Zoomer brochure" },
              { "value": "Patient connection flyer" },
              { "value": "Cardiax brochure" },
              { "value": "VA folder" },
              { "value": "VW folder" },
            ]
          }, {
            label: "Wheat Zoomer Kits",
            options: [
              {"value": 'Cardiax Kit'},
              {"value": 'Neurological Kit'},
              {"value": 'Metabolic Weight Loss Kit'},
              {"value": 'Food Sensitivity Kit'},
              {"value": 'Gut-PAC Kit'},
              {"value": 'Micronutrients Kit'},
              {"value": 'Respiratory Virus Kit'},
              {"value": 'Wheat Zoomer Kit'},
              {"value": 'Buccal Swab Kit'}
            ]
          }
        ],
      };
    },
    beforeMount(){
      // console.log("current_loggin_user: ", this.current_loggin_user);
      this.$http.get('/get-clients/').then(function(res){
        // console.log("res.data: ", res.data);
        this.searchSuggestions = JSON.parse(res.data);
      }, function(err){
        // console.log("fail!");
        console.log(err)
      });
    },
    methods: {
      submitClientOrder() {
        let self = this;
        self.client_order.operator = this.current_loggin_user;
        self.client_order.client_id = this.clientCurrentStatus.client_id
        self.client_order.phlebotomy_supplies = {}
        for (let i=0; i < self.client_select_ph_item_arr.length; i++) {
          self.client_order.phlebotomy_supplies[self.client_select_ph_item_arr[i].item_name] = self.client_select_ph_item_arr[i].item_number;
        }
        if (self.client_order.isStandingOrder) {
          // self.$http.post('/place-client-standing-order/', {order: self.client_order}).then(function(res) {
          //   console.log(res);
          //   self.$message({
          //     message: "Successfully submit standing order!",
          //     duration: 1000,
          //     onClose: function() {
          //       location.reload()
          //     }
          //   });
          // })
        } else {
          // console.log("here");
          self.$http.post('/place-client-order-inventory/', {order: self.client_order}).then((res) => {
            self.$message({
              message: "Successfully submit client order!",
              duration: 1000,
              onClose: function() {
                location.reload();
              }
            });
          });
        }
      },
      clearClientOrder() {
        this.client_order = {
          client_id: '',
          operator: '',
          ReBox_ALL: 0,
          ReBox_Stand: 0,
          ReBox_SST_EDTA: 0,
          ReBox_SST: 0,
          ReBox_ALL_HA: 0,
          regular_box: 0,
          big_box: 0,
          Transfer_Tube_Pack: 0,
          Plasma_Tube_Pack: 0,
          Urine_Tube_Pack: 0,
          Serum_Tube_Pack: 0,
          ESR_Tube_Pack: 0,
          EDTA_Tube_Pack: 0,
          Bags_Pack: 0,
          phlebotomy_supplies: {},
          shipping_method: "",
          comments: '',
          isStandardingOrder: false,
        }
      },
      submitPatientOrder() {
        let self = this;
        self.patient_order.operator = this.current_loggin_user;
        self.patient_order.phlebotomy_supplies = {}
        for (let i=0; i < self.patient_select_ph_item_arr.length; i++) {
          self.patient_order.phlebotomy_supplies[self.patient_select_ph_item_arr[i].item_name] = self.patient_select_ph_item_arr[i].item_number;
        }

        let patient_phone_number = self.patient_order.patient_phone_number;
        let patient_zipcode = self.patient_order.patient_zipcode;
        if (!validatePhoneNumber(patient_phone_number)) {
          self.$message({
            showClose: true,
            message: 'Please input correct patient phone number...',
            type: 'error'
          });
          return;
        }
        if (!validateZipcode(patient_zipcode)) {
          self.$message({
            showClose: true,
            message: 'Please input correct patient zipcode...',
            type: 'error'
          });
          return;
        }
        if (self.patient_order.shipping_method == '') {
          self.$message({
            showClose: true,
            message: 'Please select a shipping-method...',
            type: 'error'
          });
          return;
        }

        self.$http.post('/place-patient-order/', {order: self.patient_order}).then(function(res){
          self.$message({
            message: "Successfully submit client order!",
            duration: 1000,
            onClose: function() {
              location.reload();
            }
          });
        });
      },
      clearPatientOrder() {
        this.patient_order = {
          patient_name: '',
          patient_phone_number: '',
          pateint_street_address: '',
          patient_city: '',
          patient_state: '',
          patient_zipcode: '',
          operator: this.current_loggin_user,
          ReBox_ALL: 0,
          ReBox_Stand: 0,
          ReBox_SST_EDTA: 0,
          ReBox_SST: 0,
          ReBox_ALL_HA: 0,
          regular_box: 0,
          big_box: 0,
          Transfer_Tube_Pack: 0,
          Plasma_Tube_Pack: 0,
          Urine_Tube_Pack: 0,
          Serum_Tube_Pack: 0,
          ESR_Tube_Pack: 0,
          EDTA_Tube_Pack: 0,
          Bags_Pack: 0,
          phlebotomy_supplies: {},
          shipping_method: "",
          comments: ''
        }
      },
      onSubmit() {
        let self = this;
        if (self.order.shipping_method == '') {
          self.$alert('Please select shipping method', 'Warning');
          return;
        }
        if (self.$parent.current_loggin_user == '') {
          self.$alert('Please login to submit order', 'Warning');
          return;
        }
        self.$http.post('/place-client-order-inventory/', {order: self.order}).then(function(res){
          self.order = origin_order;
          self.dialogFormVisible = false;
        });
      },
      placeOrder(flag) {
        let self = this;
        if (flag == 'non-patient-order'){
          self.order = origin_order;
          self.order.people_info = {
            client_id: self.clientCurrentStatus.client_id,
            client_name: self.clientCurrentStatus.client_name,
            client_practice_name: self.clientCurrentStatus.client_practice_name,
            client_type: self.clientCurrentStatus.client_type,
            client_street: self.clientCurrentStatus.client_street,
            client_city: self.clientCurrentStatus.client_city,
            client_state: self.clientCurrentStatus.client_state,
            client_zipcode: self.clientCurrentStatus.client_zipcode,
          };
          self.dialogFormVisible = true;
        }
        if (flag == 'patient-order') {
          self.order = origin_order;
          self.validatePatientOrder();
          self.dialogFormVisible = true;
        }
      },
      querySearch(queryString, cb) {
        var ph_items = this.ph_items.filter((el) => {
          return el.label === "Regular Items";
        })[0].options;
        var wz_items = this.ph_items.filter((el) => {
          return el.label === "Wheat Zoomer Kits";
        })[0].options;
        var ph_items = ph_items.concat(wz_items);
        var results = queryString ? ph_items.filter(this.createFilter(queryString)) : ph_items;
        cb(results);
      },
      createFilter(queryString) {
        return (ph_items) => {
          return (ph_items.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      addClientPHItem() {
        let select_ph_item = this.client_select_ph_item;
        let select_ph_num = this.client_select_ph_num;
        this.client_select_ph_item_arr.push({
          "item_name": select_ph_item,
          "item_number": select_ph_num
        });
        this.client_select_ph_item = '';
        this.client_select_ph_num = 0;
      },
      addPatientPHItem() {
        let select_ph_item = this.patient_select_ph_item;
        let select_ph_num = this.patient_select_ph_num;
        let pos = this.patient_select_ph_item_arr.map(function(e) { return e.item_name; }).indexOf(select_ph_item);
        if (pos > -1) {
          this.$message.error({
            message: `'${select_ph_item}' already exists!`,
            duration: 2000,
          });
          return
        }
        this.patient_select_ph_item_arr.push({
          "item_name": select_ph_item,
          "item_number": select_ph_num
        });
        this.patient_select_ph_item = '';
        this.patient_select_ph_num = 0;
      },
      querySearchClient(queryString, cb) {
        var searchSuggestions = this.searchSuggestions;
        var results = queryString ? searchSuggestions.filter(this.createFilterClient(queryString)) : searchSuggestions;
        cb(results);
      },
      createFilterClient(queryString) {
        return (searchSuggestions) => {
          let isName = (searchSuggestions.client_name.includes(queryString.toUpperCase()));
          let isID = (searchSuggestions.client_id.includes(queryString.toUpperCase()));
          let isPracticeName = (searchSuggestions.client_practice_name.includes(queryString.toUpperCase()));
          return isName | isID | isPracticeName
        };
      },
      handleSelect(item) {
      },
      handleSelectClient(item) {
        let self = this;
        let client_id = item.client_id;
        self.$http.post('/get-client-inventory/', {client_id: client_id}).then(function(res){
          let data = JSON.parse(res.data);
          self.clientCurrentStatus.client_id = data.client_id;
          self.clientCurrentStatus.last_update_time = data.Last_PO_time;
          self.clientCurrentStatus.client_name = data.client_name;
          self.clientCurrentStatus.client_type = data.client_type;
          self.clientCurrentStatus.client_practice_name = data.client_practice_name;
          self.clientCurrentStatus.client_street = data.customer_street;
          self.clientCurrentStatus.client_city = data.customer_city;
          self.clientCurrentStatus.client_state = data.customer_state;
          self.clientCurrentStatus.client_zipcode = data.customer_zipcode;
        }, function(err){
          console.log(err)
        });
      },
    },
  }
</script>
