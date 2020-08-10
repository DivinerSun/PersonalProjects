<template>
	<view class="sign-in">
		<view class="logo">
			<image src="../../static/images/index/logo.png" ></image>
		</view>
		<view class="intro">
			<text class="title">登 录</text>
			<text class="welcome">您好，欢迎使用「逸刻时光」！</text>
		</view>
		<view class="login-form">
			<form @submit="formSubmit">
				<view>
					<input @focus="handleFocus" name="username" placeholder="请输入用户名或手机号" placeholder-class="ph" />
					<input @focus="handleFocus" :password="true" name="password" placeholder="请输入用户密码" placeholder-class="ph" />
					<text v-if="showTip" class="tip">{{tipContent}}</text>
				</view>
				<view>
					<button form-type="submit">登 录</button>
				</view>
			</form>
		</view>
		<view class="links">
			<text>
				暂无账号？
				<text class="link">去注册</text>
			</text>
			<text>
				忘记密码？
				<text class="link">重置密码</text>
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTip: false,
				tipContent: '',
			}
		},
		methods: {
			handleFocus: function() {
				this.showTip = false;
				this.tipContent = '';
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				if (!formdata.username || !formdata.password) {
					this.showTip = true;
					this.tipContent = '请填写用户名或密码';
				} else {
					uni.showModal({
						content: '表单数据内容：' + JSON.stringify(formdata),
						showCancel: false
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.sign-in {
	padding-top: var(--status-bar-height);
	
	.logo {
		display: flex;
		justify-content: center;
		padding-top: 256rpx;
		
		image {
			width: 194rpx;
			height: 92rpx;
		}
	}
	
	.intro {
		display: flex;
		flex-direction: column;
		margin-top: 54rpx;
		margin-left: 62rpx;
		
		.title {
			font-size: 56rpx;
			font-weight: 500;
		}
		
		.welcome {
			font-size: 40rpx;
			color:rgba(39,40,50,0.5);
		}
	}
	
	.login-form {
		display: flex;
		margin: 72rpx 62rpx 0;
		
		.ph {
			font-size: 12px;
			color: $uni-text-color-disable;
		}
		
		form {
			width: 100%;
			
			.tip {
				float: left;
				margin-top: -40rpx;
				font-size: 28rpx;
				color: $uni-color-error;
			}
			
			input {
				height: 44rpx;
				line-height: 44rpx;
				margin: 60rpx 0;
				border-bottom: 1px solid $uni-border-color;
			}
			
			button {
				margin-top: 120rpx;
				width: 520rpx;
				height:96rpx;
				border-radius: 48rpx;
				background: $uni-color-primary;
				box-shadow:0px 25px 16px -18px rgba(255,228,49,0.4);
			}
		}
	}
	
	.links {
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		text-align: right;
		margin: 72rpx 62rpx 0;
		color: $uni-text-color-grey;
		line-height: 80rpx;
		
		.link {
			color: $uni-color-success;
			cursor: pointer;
			font-size: 28rpx;
		}
	}
}
</style>
