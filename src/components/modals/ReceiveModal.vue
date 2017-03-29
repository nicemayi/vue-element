<template lang="html">
  <el-dialog title="Shipping address" v-model="showModalFromParent">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai"></el-option>
          <el-option label="Zone No.2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModal">Cancel</el-button>
      <el-button type="primary" @click="closeModal">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['showModalFromParent', 'closeModal', 'data'],
  data() {
    return {
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    };
  }
}
</script>

<style lang="css">
</style>
