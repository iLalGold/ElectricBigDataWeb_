import Ajax from '@/api/tools/customajax'
import { API_BASEURL, API_TIMEOUT } from '@/utils/config'
export default {
    /**
     * 参数
     * @param {Object} params
     */
    // 总体电压合格
    userLogout(params) {
        const url = API_BASEURL + '/auth/login/out'
        const result = Ajax.post(url, params)
        return result
    },
}
