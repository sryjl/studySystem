<template>
	<view class="content">
		<view v-if="timestamp&&this.thisBoolen==false" style="text-align: center;">
			<u-count-down :timestamp="timestamp" @end="thisend"></u-count-down>
		</view>
		<check-xi 
		v-if="questionList.length>0"
		@confrim="confrim" 
		@checkOption="checkOption" 
		:questionList="questionList"
		:thisDis="thisBoolen"
		ref='aaa'
		></check-xi>
	</view>
</template>

<script>
	import checkXi from '../../xi-check/components/xi-check/xi-check.vue'
	export default {
		components: {
			checkXi
		},
		data() {
			return {
				timestamp:300,
				thisBoolen:false,
				status: '',
				testId:'',
				studentId:'',
				ispush:'',
				colorStyle: { // 颜色修改自定义 -- 可选参数
					nextBac: '#0188FB', //下一题按钮背景色
					nextCol: '#FFFFFF', //下一题按钮背字体颜色
					optBac: '#0188FB', //选项按钮背景色
					optCol: '#232131', //选项按钮字体颜色
					optBacActive: '#0188FB', //选项按钮背景色 - 选中
					optColActive: '#FFFFFF', //选项按钮字体颜色-选中
				},
				questionList: [
				]
			}
		},
		methods: {
           nextAnswer(e){ // 废弃 ！！！
           },
            // 提交事件
		   thisend(){
			   this.$refs.aaa.ccc();
		   },
           async confrim(e){ 
                console.log(e);
				if(e.isEnd){
					if(this.thisBoolen){
						return uni.showToast({
							icon: 'none',
							title: '您没有权限提交!',
							duration: 2000,
						});
					}
					let content = []
					e.checkRes.keyFormat.forEach((item,index)=>{
						content.push(item.keyFormat[0])
					})
					const res = await this.$http({
						url: '/giveStudentTest',
						data: {
							testId: this.testId,
							studentId:this.studentId,
							content
						},
						method: 'POST'
					})
					console.log(res)
					if (res.data.code !== 200) {
						return uni.showToast({
							icon: 'none',
							title: '提交失败，请重试!',
							duration: 2000,
						});
					}
					uni.showToast({
						icon: 'none',
						title: '提交成功',
						duration: 1000,
					});
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				}
            },
            // 答案选择 change 事件
            checkOption(e){
                  console.log('check',e);
            },
			async getstudentTestList(){
				const res = await this.$http({
					url: '/getTestDetail',
					data: {
						testId: this.testId,
						studentId:this.studentId
					},
				})
				const arr=[]
				res.data.data.test.content.forEach((item,index)=>{
					arr.push({
						id: index,
						type: 'write',
						number: 1,
						title: item,
						imageList: [
							'https://p0.itc.cn/q_70/images03/20210511/bb9cbea721a6408989c72c5a7d1360f8.png'
						],
						question_key: '' 
					})
				})
				console.log(res)
				console.log(arr)
				res.data.data.stuTest.content&&res.data.data.stuTest.content.forEach((item,index)=>{
					arr[index].question_key = item
				})
				this.timestamp=res.data.data.test.time
				// this.timestamp=10
				this.questionList = arr	
			}
		},
		onLoad(e) {
			this.testId = e.testId,
			this.studentId = e.studentId,
			this.ispush = e.ispush
			this.status = uni.getStorageSync('status')
			if(this.ispush=="true"||this.status==0){
				this.thisBoolen=true
			}
			this.getstudentTestList()
		}
	}
</script>

<style lang="less">
</style>
