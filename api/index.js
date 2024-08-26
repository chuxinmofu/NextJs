import { get, post } from '@/utils/http'
import { stringify } from 'qs';
export const sendGetFileApi = async (key) => {
   return await get(`/eduTouch/getfile/${key}`)
}
export const sendGetFile = async (key) => {
   return await get(`/eduTouch/getfile`)
}
export const sendPostAddNew = async () => {
   return await post(`/eduTouch/addnew`)
}
