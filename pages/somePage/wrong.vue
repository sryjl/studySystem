<template>
	<view class="allContent">
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				status:'',
				id:'',
			}
		},
		methods:{
			
		},
		onLoad(e){
			this.status =e.status,
			this.id =e.id
		}
	}
</script>

<style lang="less">
</style>