<template>
	<u-login :loginType="thisNum"></u-login>
</template>

<script>
	export default{
		data(){
			return{
				thisNum:1
			}
		},
		onLoad(e) {
			this.thisNum = parseInt(e.thisNum)
			if(parseInt(e.thisNum)===1){
				uni.setNavigationBarTitle({
				    title: '学生登陆'
				})
			}else{
				uni.setNavigationBarTitle({
				    title: '教师登陆'
				})
			}
		}
	}
</script>

<style>
</style>
