import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/laboratory',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/laboratory/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/laboratory',
    method: 'put',
    data
  })
}

export function getLab(data) {
  return request({
    url: 'api/laboratory',
    method: 'get',
    params: data
  })
}

export default { add, edit, del, getLab }
