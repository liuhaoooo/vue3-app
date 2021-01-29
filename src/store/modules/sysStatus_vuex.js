import { axiosRequest_post, axiosRequest_get } from "../../utils/request";
import { CMD } from "../../config/cmd";
import { date_tool } from "../../utils/tools";
const state = {
    loading:false,
    deviceInfo: {},
    networkInfo: {},
    networkInfo_post: {},
    wifi5gInfo: {},
    meshStatus:{}
}
const getters = {
    loading: (state) => state.loading,
    deviceInfo: (state) => {
        let deviceInfo = JSON.parse(JSON.stringify(state.deviceInfo))
        try {
            deviceInfo.uptime = date_tool(state.deviceInfo.uptime)
            deviceInfo.memory1 = state.deviceInfo.memory.split(',')[0]
            deviceInfo.memory2 = state.deviceInfo.memory.split(',')[1]
            deviceInfo.memory3 = state.deviceInfo.memory.split(',')[2]
        } catch (error) { }
        return deviceInfo
    },
    networkInfo: (state) => state.networkInfo,
    wanMode: (state) => state.networkInfo_post.real_wan_mode,
    wifi5gInfo: (state) => state.wifi5gInfo,
    meshOpen: (state) => {
        return state.meshStatus.mesh_switch == '1'
    },
}
const mutations = {
    setLoading:(state,data)=>{
        state.loading = data
    },
    setDeviceInfo: (state, data) => {
        state.deviceInfo = data
    },
    setNetworkInfo: (state, data) => {
        state.networkInfo = data
    },
    setNetworkInfo_post: (state, data) => {
        state.networkInfo_post = data
    },
    setWifi5gInfo: (state, data) => {
        state.wifi5gInfo = data
    },
    setMeshStatus: (state, data) => {
        state.meshStatus = data
    },
}
const actions = {
    getDeviceInfo: async (state, data) => {
        let res = await axiosRequest_get({ cmd: CMD.DEVICE_INFO });
        state.commit('setDeviceInfo', res)
    },
    getNetworkInfo: async (state, data) => {
        let res = await axiosRequest_get({ cmd: CMD.NETWORK_INFO });
        state.commit('setNetworkInfo', res)
    },
    getNetworkInfo_post: async (state, data) => {
        let res = await axiosRequest_post({ cmd: CMD.NETWORK_INFO });
        state.commit('setNetworkInfo_post', res)
    },
    getWifi5gInfo: async (state, data) => {
        let res = await axiosRequest_get({ cmd: CMD.WIRELESS5G_CONFIG, subcmd: data.subcmd });
        state.commit('setWifi5gInfo', res)
    },
    getMeshStatus: async (state, data) => {
        let res = await axiosRequest_get({ cmd: CMD.MESH_SETTING, networking: '0' });
        state.commit('setMeshStatus', res)
    },
}
export default { state, getters, mutations, actions }