import { pageHideCheck_tool } from "../../utils/tools";
import { i18n } from "../../i18n"
const { t } = i18n.global
const state = {
    pages: [
        {
            title: 'menu.sysStatus',
            icon: "CopyOutlined",
            key: "1",
            child: [
                {
                    title: 'menu.devicestatus',
                    key: "1-1",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.dhcpinfo',
                    key: "1-2",
                    route: "",
                    show: 1//隐藏位
                },
                {
                    title: 'menu.wifi2info',
                    key: "1-3",
                    route: "",
                    show: 2
                },
                {
                    title: 'menu.wifi5info',
                    key: "1-4",
                    route: "",
                    show: 3
                }
            ]
        },
        {
            title: 'menu.networkset',
            icon: "ControlOutlined",
            key: "2",
            child: [
                {
                    title: 'menu.networkset',
                    key: "2-1",
                    route: "",
                    show: true
                },

                {
                    title: 'menu.andlink',
                    key: "2-2",
                    route: "",
                    show: 4
                }
            ]
        },
        {
            title: 'menu.wifiSet',
            icon: "WifiOutlined",
            key: "3",
            child: [
                {
                    title: 'menu.wifiSet',
                    key: "3-1",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.secwifiset',
                    key: "3-2",
                    route: "",
                    show: 5
                },
                {
                    title: 'menu.wifitiming',
                    key: "3-3",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.wpsset',
                    key: "3-4",
                    route: "",
                    show: true
                }
            ]
        },
        {
            title: 'menu.terminalInfo',
            icon: "HddOutlined",
            key: "4",
            child: [
                {
                    title: 'menu.terminalInfo',
                    key: "4-1",
                    route: "",
                    show: true
                }
            ]
        },
        {
            title: 'menu.deviceset',
            icon: "MobileOutlined",
            key: "5",
            child: [
                {
                    title: 'menu.dhcpset',
                    key: "5-1",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.routeset',
                    key: "5-2",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.mesh',
                    key: "5-3",
                    route: "",
                    show: true
                }
            ]
        },
        {
            title: 'menu.safeset',
            icon: "SafetyCertificateOutlined",
            key: "6",
            child: [
                { title: 'menu.dmz', key: "6-1", route: "", show: true },
                {
                    title: 'menu.portmap',
                    key: "6-2",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.filterrul',
                    key: "6-3",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.ipmacband',
                    key: "6-4",
                    route: "",
                    show: true
                },

                {
                    title: 'menu.arpband',
                    key: "6-5",
                    route: "",
                    show: 6
                },
                {
                    title: 'menu.acl',
                    key: "6-6",
                    route: "",
                    show: 7
                },
                {
                    title: 'menu.upnp',
                    key: "6-7",
                    route: "",
                    show: 8
                },
                {
                    title: 'menu.speed',
                    key: "6-8",
                    route: "",
                    show: 9
                }
            ]
        },
        {
            title: 'menu.sysset',
            icon: "SettingOutlined",
            key: "7",
            child: [
                {
                    title: 'menu.deviceinfo',
                    key: "7-1",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.systemset',
                    key: "7-2",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.syslog',
                    key: "7-3",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.sysupgrade',
                    key: "7-4",
                    route: "",
                    show: true
                },
                {
                    title: 'menu.nettools',
                    key: "7-5",
                    route: "",
                    show: true
                },

                {
                    title: 'menu.logexport',
                    key: "7-6",
                    route: "",
                    show: 10
                },
                {
                    title: 'menu.configup',
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
            { name: "relay_setting", title: "2.4G中继设置", show: 1 },
            { name: "relay_setting", title: "5G中继设置", show: 1 },
            { name: "relay", title: "无线中继", show: true }
        ],
        '2-2': [
            { name: "andlink", title: "ANDLINK", show: 1 }
        ],
        '3-1': [
            { name: "wifisetting", title: "Wi-Fi设置", show: true }
        ],
        '7-1': [
            { name: "device_info", title: "设备信息", show: true }
        ]
    },
    route: [{ name: "device_status", title: t('menu.devicestatus'), show: true }],
    breadcrumbItems: {
        "0": t('menu.sysStatus'),
        "1": t('menu.devicestatus')
    }
}
const getters = {
    pages: state => {
        let pages = JSON.parse(JSON.stringify(state.pages))
        for (let n in pages) {
            pages[n].title = t(pages[n].title)
            let child = pages[n].child, newChild = [];
            if (child.length > 0) {
                for (let i in child) {
                    child[i].title = t(child[i].title)
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