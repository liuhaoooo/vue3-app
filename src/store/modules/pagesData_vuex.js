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
                    show: true
                },
                {
                    title: "WIFI-2.4G状态信息",
                    key: "1-3",
                    route: "",
                    show: true
                },
                {
                    title: "WIFI-5G状态信息",
                    key: "1-4",
                    route: "",
                    show: true
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
                    show: true
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
                    show: true
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
                    show: true
                },
                {
                    title: "ACL过滤",
                    key: "6-6",
                    route: "",
                    show: true
                },
                {
                    title: "UPNP",
                    key: "6-7",
                    route: "",
                    show: true
                },
                {
                    title: "网速限制",
                    key: "6-8",
                    route: "",
                    show: true
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
                    show: true
                },
                {
                    title: "配置升级",
                    key: "7-7",
                    route: "",
                    show: true
                }
            ]
        }
    ],
}
const getters = {
    pages: (state) => {
        for (let n in state.pages) {
            let newitem = state.pages[n].child.filter(i => {
                return i.show;
            });
            state.pages[n]["child"] = newitem;
        }
        return state.pages;
    }
}
export default { state, getters }