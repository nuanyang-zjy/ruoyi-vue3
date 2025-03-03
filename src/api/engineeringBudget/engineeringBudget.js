import request from '@/utils/request'

// 查询工程概算列表
export function listEngineeringBudget() {
  return request({
    url: '/engineeringBudget/engineeringBudget/list',
    method: 'get'
  })
}
//多条件查询
export function listEngineeringBudgetBy(query) {
  return request({
    url: '/engineeringBudget/engineeringBudget/select',
    method: 'get',
    params: query
  })
}

// 查询工程概算详细
export function getEngineeringBudget(budgetId) {
  return request({
    url: '/engineeringBudget/engineeringBudget/' + budgetId,
    method: 'get'
  })
}

//查询工程概算树
export function getEngineeringBudgetTree() {
  return request({
    url: '/engineeringBudget/engineeringBudget/tree',
    method: 'get'
  })
}

// 新增工程概算
export function addEngineeringBudget(data) {
  return request({
    url: '/engineeringBudget/engineeringBudget',
    method: 'post',
    data: data
  })
}

// 修改工程概算
export function updateEngineeringBudget(data) {
  return request({
    url: '/engineeringBudget/engineeringBudget',
    method: 'put',
    data: data
  })
}

// 删除工程概算
export function delEngineeringBudget(budgetId) {
  return request({
    url: '/engineeringBudget/engineeringBudget/' + budgetId,
    method: 'delete'
  })
}
