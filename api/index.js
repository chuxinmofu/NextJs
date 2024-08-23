import { get } from '@/utils/http'
import { stringify } from 'qs';
export const sendGetFileApi = async (key) => {
   return await get(`/eduTouch/getfile/${key}`)
}
