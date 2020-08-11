import request from '../utils/request.js'

export const test = (data) => {
	return request({
		url: '/test',
		method: 'GET',
		data,
	})
}