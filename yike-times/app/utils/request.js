import { baseUrl } from '../config/index.js'

/**
 * 封装请求方法
 * 	config：请求参数
 * 		- url: 请求地址；必须
 * 		- method: 请求方法；为了兼容各平台，仅支持 GET 和 POST
 * 		- data: 请求数据
 */
export default function request(config) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl}${config.url}`,
			method: config.method || 'GET',
			data: config.data || {},
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}