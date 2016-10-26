<template>
  <el-checkbox
    class="checkbox"
    v-model="isValid"
    true-label="可用"
    false-label="不可用">
    {{isValid}}
  </el-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        isValid: '可用'
      };
    }
  };
</script>