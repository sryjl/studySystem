<template>
	<view class="allContent">
		<view>
			<view class="listItem" v-for="(item,index) in signInList.slice(1)" :key="index">
				<view class="navtitle">
					<view class="time">
						{{item.time}}
					</view>
					<view class="pre">
						{{item.pre}}
					</view>
				</view>
				<view class="status" v-if="item.status==0&&status==1">
					<u-button @click="show=true">进行签到</u-button>
				</view>
				<view class="status" 
				    v-if="item.status!=0&&status==1"
					:style="item.status==='出勤'?'color:#4CD964;font-weight: bold':'color:#FF0033;font-weight: bold;'">
					{{item.status}}
				</view>
				<view class="status" v-if="status==0">
					<view style="margin-bottom: 4rpx;">
						<u-button>查看试卷</u-button>
					</view>
					<u-button>进行评分</u-button>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center">
			<view style="margin: 40rpx;">
				<view style="margin-bottom: 10rpx;">
					<u-input :border="false" placeholder="请输入四位数签到码" v-model="mima" type="text"></u-input>
				</view>
				<u-button type="primary" @click="change()">进行签到</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mima:"",
				show:false,
				status: 0,
				id: '',
				signInList: [{
						status: [4, 2]
					},
					{
						time: '测试1',
						pre: '',
						status: ''
					}
				],
			}
		},
		methods: {

		},
		onLoad(e) {
			this.status = e.status,
				this.id = e.id
		}
	}
</script>

<style lang="less">
	.listItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1px solid #e4e7ed;

		.navtitle {
			.time {
				font-size: 32rpx;
			}

			.pre {
				font-size: 28rpx;
				color: #909090;
			}
		}
	}

	.recordList {
		width: 80%;
		margin: auto;
		display: flex;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		padding: 20rpx;
		justify-content: space-between;
		background-color: #f3f4f6;
		border-bottom: 1px solid #e4e7ed;

		.items {
			width: 20%;

			view {
				text-align: center;
			}
		}
	}

	.center {
		width: 100%;
		height: 20rpx;
		background-color: #f3f4f6;
	}
</style>