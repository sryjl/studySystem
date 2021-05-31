<template>
	<view :style="{height:swiperHeight+'px',borderTop:'2px solid #FFFFFF'}">
		<!-- 动感图标 -->
		<view class="container">
			<view class="dot">
				<image src="../../static/study.png" mode="aspectFit"></image>
			</view>
			<view class="pulse">
			</view>
			<view class="pulse1">
			</view>
			<view class="word">
				<image src="../../static/system.png" mode="aspectFit"></image>
			</view>
		</view>
		<!-- button登陆按钮 -->
		<view class="button">
			<view class="buttonchild">
				<navigator url="/pages/login/login?thisNum=1"><button type="default" plain>学生登陆</button></navigator>
				<navigator url="/pages/login/login?thisNum=2"><button type="default" plain>教师登陆</button></navigator>
				<navigator url="/pages/login/sign"><button type="default" plain>注册账号</button></navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperHeight: 500
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => { // 需要使用箭头函数，swiper 高度才能设置成功
					// 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
					this.swiperHeight = res.windowHeight - 2
				}
			});
		}

	}
</script>

<style lang="less">
	@import '../../static/css/borderanimate.css';

	view {
		background-color: #0188FB;

		.container {
			height: 70%;
			position: relative;

			.word {
				position: absolute;
				top: 80%;
				left: 50%;
                transform: translate(-50%, -50%);
				height: 150rpx;
				width: 100%;
				image {
					position: absolute;
					left: 50%;
					top: 80%;
					transform: translate(-50%, -50%);
					height: 150rpx;
					width: 100%;
				}
			}

			.dot {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				height: 150rpx;
				width: 150rpx;
				border-radius: 50%;
				background-color: #B2D3F1;

				image {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					height: 100rpx;
					width: 100rpx;
				}
			}
		}

		.button {
			position: relative;
			height: 30%;

			.buttonchild {
				width: 50%;
				position: absolute;
				left: 25%;
				top: 10%;

				navigator {
					width: 100%;
					height: 70rpx;
					border-radius: 50px;
					margin-bottom: 30rpx;

					button {
						color: #FFFFFF;
						line-height: 70rpx;
						font-size: 28rpx;
						border-radius: 50rpx;
						border: 1rpx solid #DADCE0;

					}

				}
			}
		}

	}
</style>
