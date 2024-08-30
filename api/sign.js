import { get, post } from '@/utils/http'
import { stringify } from 'qs';


export const sendPostLogin = async (body) => {
    return await post(`/eduTouch/login`, body)
}