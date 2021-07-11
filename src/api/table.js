import request from '@/common/js/request'

export const allSites = (data) => request.post('/data/allSites', data)
export const addClass = (data) => request.post('/data/addClass', data)
export const delClass = (data) => request.post('/data/delClass', data)
export const updateClass = (data) => request.post('/data/updateClass', data)
export const addWeb = (data) => request.post('/data/addWeb', data)
export const delWeb = (data) => request.post('/data/delWeb', data)
export const updateWeb = (data) => request.post('/data/updateWeb', data)
export const addSite = (data) => request.post('/data/addSite', data)
export const delSite = (data) => request.post('/data/delSite', data)
export const updateSite = (data) => request.post('/data/updateSite', data)
export const getIcon = (data) => request.post('/data/getIcon', data)
