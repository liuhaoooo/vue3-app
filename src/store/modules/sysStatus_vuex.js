import { axiosRequest_post, axiosRequest_get } from "../../utils/request";
import { CMD } from "../../config/cmd";
import { date_tool } from "../../utils/tools";
const state = {
    deviceInfo: {},
    networkInfo: {},
    wifi5gInfo: {}
}
const getters = {
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
    wifi5gInfo: (state) => state.wifi5gInfo,
}
const mutations = {
    setDeviceInfo: (state, data) => {
        state.deviceInfo = data
    },
    setNetworkInfo: (state, data) => {
        state.networkInfo = data
    },
    setWifi5gInfo: (state, data) => {
        state.wifi5gInfo = data
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
        console.log(res)
    },
    getWifi5gInfo: async (state, data) => {
        let res = await axiosRequest_get({ cmd: CMD.WIRELESS5G_CONFIG, subcmd: data.subcmd });
        state.commit('setWifi5gInfo', res)
    },
}
export default { state, getters, mutations, actions }