<template>
	<view class="allContent">
		<view class="nav" style="margin-bottom: 40rpx;">
			<u-tabs :list="[{name:'表现榜'}]" :is-scroll="false"></u-tabs>
		</view>
		<view class="student" v-for="(item,index) in students" :key="index" :style="(item.id==userid)&&status==1?'background-color: rgba(50,205,50,.4);':''">
			<view class="rank">
				<view>
					{{index+1}}
				</view>
				<image v-if="item.img" :src="item.img" mode="aspectFit"></image>
				<image v-else src="../../static/morentouxiang.jpg" mode="aspectFit"></image>
				<view class="name">
					{{item.nickname}}
				</view>
			</view>
			<view class="star">
				<text v-if="(item.id==userid)&&status==1">我</text>{{item.score}}分
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: '',
				id: '',
				teachid:'',
				students: [{
						name: '计嵌172-哈皮',
						star: 10,
						rank: 1,
						img: null
					},
					{
						name: '计嵌172-丝丝',
						star: 9,
						rank: 2,
						img: null
					},
					{
						name: '计嵌172-明明',
						star: 0,
						rank: 3,
						img: null
					}
				],
				thisStudent: {
					name: '计嵌172-明明',
					star: 0,
					rank: 3,
					img: null
				}
			}
		},
		methods: {
			async getCourse() {
				const res = await this.$http({
					url: '/rank',
					data:{
						teachId:this.teachid
					}
				})
				let arr = []
				this.students =res.data.data.students
			}

		},
		onLoad(e) {
			this.status = uni.getStorageSync('status')
			this.userid = uni.getStorageSync('userid')
			this.teachid = e.teachid
			this.getCourse()
		}
	}
</script>

<style lang="less">
	.student {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 20rpx;
		border-bottom: 1px solid #e4e7ed;

		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		.rank{
			display: flex;
			align-items: center;
		}
		view{
			font-size: 36rpx;
			margin: 0 20rpx;
		}
		.star{
			text{
				margin-right: 20rpx;
				color: #FF0033;
			}
		}
	}
</style>
