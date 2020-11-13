import { pageHideCheck_tool } from "../../utils/tools";
const state = {
    pages: [
        {
            title: "系统状态",
            icon: "CopyOutlined",
            key: "1",
            child: [
                {
                    title: "设备状态",
                    key: "1-1",
                    route: "",
                    show: true
                },
                {
                    title: "DHCP状态信息",
                    key: "1-2",
                    route: "",
                    show: 1//隐藏位
                },
                {
                    title: "WIFI-2.4G状态信息",
                    key: "1-3",
                    route: "",
                    show: 2
                },
                {
                    title: "WIFI-5G状态信息",
                    key: "1-4",
                    route: "",
                    show: 3
                }
            ]
        },
        {
            title: "上网设置",
            icon: "ControlOutlined",
            key: "2",
            child: [
                {
                    title: "上网设置",
                    key: "2-1",
                    route: "",
                    show: true
                },

                {
                    title: "ANDLINK",
                    key: "2-2",
                    route: "",
                    show: 4
                }
            ]
        },
        {
            title: "Wi-Fi配置",
            icon: "WifiOutlined",
            key: "3",
            child: [
                {
                    title: "Wi-Fi配置",
                    key: "3-1",
                    route: "",
                    show: true
                },
                {
                    title: "辅Wi-Fi配置",
                    key: "3-2",
                    route: "",
                    show: 5
                },
                {
                    title: "Wi-Fi定时",
                    key: "3-3",
                    route: "",
                    show: true
                },
                {
                    title: "WPS配置",
                    key: "3-4",
                    route: "",
                    show: true
                }
            ]
        },
        {
            title: "终端信息",
            icon: "HddOutlined",
            key: "4",
            child: [
                {
                    title: "终端信息",
                    key: "4-1",
                    route: "",
                    show: true
                }
            ]
        },
        {
            title: "设备配置",
            icon: "MobileOutlined",
            key: "5",
            child: [
                {
                    title: "DHCP配置",
                    key: "5-1",
                    route: "",
                    show: true
                },
                {
                    title: "路由设置",
                    key: "5-2",
                    route: "",
                    show: true
                },
                {
                    title: "MESH",
                    key: "5-3",
                    route: "",
                    show: true
                }
            ]
        },
        {
            title: "安全设置",
            icon: "SafetyCertificateOutlined",
            key: "6",
            child: [
                { title: "DMZ", key: "6-1", route: "", show: true },
                {
                    title: "端口映射",
                    key: "6-2",
                    route: "",
                    show: true
                },
                {
                    title: "过滤规则",
                    key: "6-3",
                    route: "",
                    show: true
                },
                {
                    title: "IP MAC绑定",
                    key: "6-4",
                    route: "",
                    show: true
                },

                {
                    title: "静态ARP绑定",
                    key: "6-5",
                    route: "",
                    show: 6
                },
                {
                    title: "ACL过滤",
                    key: "6-6",
                    route: "",
                    show: 7
                },
                {
                    title: "UPNP",
                    key: "6-7",
                    route: "",
                    show: 8
                },
                {
                    title: "网速限制",
                    key: "6-8",
                    route: "",
                    show: 9
                }
            ]
        },
        {
            title: "系统管理",
            icon: "SettingOutlined",
            key: "7",
            child: [
                {
                    title: "设备信息",
                    key: "7-1",
                    route: "",
                    show: true
                },
                {
                    title: "系统设置",
                    key: "7-2",
                    route: "",
                    show: true
                },
                {
                    title: "系统日志",
                    key: "7-3",
                    route: "",
                    show: true
                },
                {
                    title: "系统升级",
                    key: "7-4",
                    route: "",
                    show: true
                },
                {
                    title: "网络工具",
                    key: "7-5",
                    route: "",
                    show: true
                },

                {
                    title: "日志导出",
                    key: "7-6",
                    route: "",
                    show: 10
                },
                {
                    title: "配置升级",
                    key: "7-7",
                    route: "",
                    show: 11
                }
            ]
        }
    ],
    routesArr: {
        '1-1': [
            { name: "device_status", title: "设备状态", show: true },
        ],
        '1-2': [
            { name: "dhcp_status", title: "DHCP", show: true },
            { name: "lan_list", title: "LAN设备列表", show: 1 },
        ],
        '1-3': [
            { name: "wifi_status", title: "2.4G", show: true },
            { name: "wifi_status", title: "2.4G_1", show: true },
            { name: "wifi_status", title: "2.4G_2", show: true },
            { name: "wifi_status", title: "2.4G_3", show: true },
            { name: "connect_list", title: "连接客户端列表", show: true },
        ],
        '1-4': [
            { name: "wifi_status", title: "5G", show: true },
            { name: "wifi_status", title: "5G_1", show: true },
            { name: "wifi_status", title: "5G_2", show: true },
            { name: "wifi_status", title: "5G_3", show: true },
            { name: "connect_list", title: "连接客户端列表", show: true },
        ],
        '2-1': [
            { name: "broadband", title: "宽带设置", show: true },
            { name: "/relay_setting", title: "2.4G中继设置", show: 1 },
            { name: "/relay_setting", title: "5G中继设置", show: 1 },
            { name: "relay", title: "无线中继", show: true }
        ],
        '2-2': [
            { name: "andlink", title: "ANDLINK", show: 1 }
        ],
        '7-1': [
            { name: "device_info", title: "设备信息", show: true }
        ]
    },
    route: [{ name: "device_status", title: "设备状态", show: true }],
    breadcrumbItems: {
        "0": "系统状态",
        "1": "设备状态"
    }
}
const getters = {
    pages: state => {
        let pages = JSON.parse(JSON.stringify(state.pages))
        for (let n in pages) {
            let child = pages[n].child, newChild = [];
            if (child.length > 0) {
                for (let i in child) {
                    if (pageHideCheck_tool(child[i].show) || child[i].show === true) {
                        newChild.push(child[i])
                    }
                }
            }
            pages[n]["child"] = newChild;
        }
        return pages;
    },
    route: state => {
        let route = JSON.parse(JSON.stringify(state.route)), newRoute = [];
        for (let i in route) {
            if (pageHideCheck_tool(route[i].show) || route[i].show === true) {
                newRoute.push(route[i])
            }
        }
        return newRoute
    },
    breadcrumbItems: state => state.breadcrumbItems
}
const mutations = {
    setRoute: (state, data) => {
        state.route = state.routesArr[data]
    },
    setBreadcrumbItems: (state, data) => {
        state.breadcrumbItems[data.index] = data.value
    }
}
const actions = {}
export default { state, getters, mutations, actions }