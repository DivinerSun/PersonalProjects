<template>
	<view class="search-page">
		<view class="search-top">
			<input class="search-input" />
			<image src="../../static/images/search.png"></image>
			<text class="search-cancel">取消</text>
		</view>
		<view class="search-content">
			<view class="search-users">
				<text class="title">用 户</text>
			</view>
			<view class="search-groups">
				<text class="title">群 组</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.search-page {
	.search-top {
		padding: 14rpx 32rpx;
		border-bottom: 1px solid #eaeaea;
		position: relative;
		
		.search-input {
			width: 500rpx;
			height: 60rpx;
			background: #F3F4F6;
			border-radius: 10rpx;
			padding: 0 60rpx 0 40rpx;
		}
		
		image {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 20rpx;
			left: 580rpx;
			filter: invert(0.8);
		}
		
		.search-cancel {
			width: 56rpx;
			height: 40rpx;
			font-size: 14px;
			color: #272832;
			position: absolute;
			top: 28rpx;
			right: 32rpx;
		}
	}
	
	.search-content {
		.title {
			display: block;
			margin-top: 34rpx;
			font-size: 22px;
			color: #272832;
		}
	}
}
</style>
