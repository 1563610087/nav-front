import request from '@/common/js/request'

export const login = (data) => request.post('/user/login', data)
export const logout = (data) => request.post('/data/allSites', data)
