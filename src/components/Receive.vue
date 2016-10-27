<style>
	#input_barcode {
		/*margin-bottom: 100px;*/
		padding-top: 20px;
	}
</style>

<template>
	<div class="container">
		<el-row :gutter="20">
			<el-col :span="6">
				<el-input id="input_barcode"
					placeholder="Scann box barcode..."
					:number="true"
					size="large"
					v-model="input" v-on:click="submit">
				</el-input>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input: ''
			}
		},
		methods:{
			submit() {
				console.log("haha");
			}
		}
	}
</script>