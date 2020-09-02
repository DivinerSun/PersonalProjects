import request from '../utils/request.js'

// 验证码获取
export const getCode = (data) => {
	return request({
		url: '/common/mail',
		method: 'POST',
		data,
	})
}

// 用户注册
export const signup = (data) => {
	return request({
		url: '/user/signup',
		method: 'POST',
		data,
	})
}


// 用户登录
export const signin = (data) => {
	return request({
		url: '/user/signin',
		method: 'POST',
		data,
	})
}