import { axiosRequest_post, axiosRequest_get } from "../../utils/request";
import { CMD } from "../../config/cmd";
import { parseHexPageHide_tool } from "../../utils/tools";
const state = {
    configInfo:{}
}
const getters = {
    webPageFlag:(state)=>{
        let webPageFlag = parseHexPageHide_tool(state.configInfo.web_page_hide).split("").reverse()
        return webPageFlag
    }
}
const mutations = {
    setConfigInfo: (state, data) => {
        state.configInfo = data
    },
}
const actions = {
    getConfigInfo: async (state, data) => {
        let res = await axiosRequest_get({ cmd: CMD.INIT_PAGE });
        state.commit('setConfigInfo', res)
    },
}
export default { state, getters, mutations, actions }