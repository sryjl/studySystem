<template>
	<view class="allContent">
		<u-field
			v-model="name"
			label="试卷名"
			required	
		>
		</u-field>
		<view v-for="(item,index) in input" :key="index">
			<view style="width: 70%;display: inline-block;">
				<u-field
					v-model="input[index]"
					:label="'题目'+(index+1)"
					required
					auto-height
					type="textarea"
					maxlength="-1"
				>
				</u-field>
			</view>
			<view style="width: 20%;display: inline-block;float: right;margin-right: 10rpx;">
				<u-button type="error" @click="deleteDetail(index)">删除</u-button>
			</view>
		</view>
		<u-form-item label-width="150" :label-position="labelPosition" label="考勤时间">
			<u-radio-group v-model="time" @change="radioGroupChange">
				<u-radio v-for="(item, index) in list" 
				:key="index" 
				:name="item.name" 
				:disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</u-form-item>
		<view style="margin: 30rpx 0;">
			<u-button type="success" @click="increase">增加题目</u-button>
		</view>
		<u-button type="default" @click="commit">提交</u-button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				labelPosition: 'left',
				border: false,
				time:'',
				list: [{
						name: '15分钟',
						value: 900,
						disabled: false
					},
					{
						name: '30分钟',
						value: 1800,
						disabled: false
					},
					{
						name: '60分钟',
						value: 3600,
						disabled: false
					}
				],
				name:'',
				teachId:'',
				id:'',
				truetime:'',
				input:[""],
				testId:'',
			}
		},
		methods:{
			radioGroupChange(e) {
				if (e == '15分钟') return this.truetime = 900
				if (e == '30分钟') return this.truetime = 1800
				if (e == '60分钟') return this.truetime = 3600
			},
			increase(){
				this.input.push("")
			},
			deleteDetail(index){
				console.log(index)
				this.input.splice(index, 1)
			},
			async commit(){
				console.log(this.input)
				console.log(this.truetime)
				console.log(this.name)
				let count = 0
				this.input.forEach((item,index)=>{
					if(item==""){
						count++
					}
				})
				if(this.name==""||this.truetime==""||this.input.length==0||count>0){
					return uni.showToast({
						icon: 'none',
						title: '请输入标题和时间!',
						duration: 2000,
					});
				}
				console.log('验证通过')
				if(this.testId != ""){
					return this.updateSome()
				}

				const res = await this.$http({
					url: '/createTest',
					data: {
						teachId: this.teachId,
						content:this.input,
						name:this.name,
						time:this.truetime
					},
					method: 'POST'
				})
				console.log(res)
				if (res.data.code !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '创建失败，请重试!',
						duration: 2000,
					});
				}
				uni.showToast({
					icon: 'none',
					title: '创建成功',
					duration: 1000,
				});
				this.input=[""]
				this.truetime = ""
				this.name= ""
				setTimeout(()=>{
					uni.navigateBack({
					delta:1	
					})
				},1000)
			},
			async updateSome(){
				const res = await this.$http({
						url: '/changeTest',
						data: {
							id: this.testId,
							content:this.input,
							name:this.name,
							time:this.truetime
						},
						method: 'POST'
					})
					console.log(res)
					if (res.data.code !== 200) {
						return uni.showToast({
							icon: 'none',
							title: '更新失败，请重试!',
							duration: 2000,
						});
					}
					uni.showToast({
						icon: 'none',
						title: '更新成功',
						duration: 1000,
					});
					this.input=[""]
					this.truetime = ""
					this.name= ""
					setTimeout(()=>{
						uni.navigateBack({
						delta:1	
						})
					},1000)
			},
			async getTestDetail(){
				const res = await this.$http({
					url: '/getTest',
					data: {
						testId:this.testId
					},
				})
				console.log(res)
				this.input =res.data.data.test.content
				this.truetime = res.data.data.test.time
				this.name = res.data.data.test.name
				
				this.time = this.truetime/60+'分钟'
			}
		},
		onLoad(e){
			this.teachId =e.teachid
			if(e.testId){
				this.testId = e.testId
				this.getTestDetail()
			}
			console.log(this.teachId)
		}
	}
</script>

<style lang="less">
	
</style>