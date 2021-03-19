import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/report',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/report/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/report',
    method: 'put',
    data
  })
}

export function getReport(data) {
  return request({
    url: 'api/report',
    method: 'get',
    params: data
  })
}

export function issueTask(data) {
  return request({
    url: '/api/report/issueTask',
    method: 'post',
    data
  })
}

export default { add, edit, del }
