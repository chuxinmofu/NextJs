import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const MENU_ITEMS = {
    APP: 'app',
    DASHBOARD: 'dashboard',
    STUMGT: 'stumgt',
    FEEMGT: 'feemgt',
    TEACHAFFAIRMGT: 'teachaffairmgt',
    MKTMGT: 'mktmgt',
    OPENAPI: 'openapi',
    BASICSET: 'basicset',
    ANNOUNCE: 'announce',
    TENANTMGT: 'tenantmgt',
    STATREPORT: 'statreport',
    ACTIVITY: 'activity',
    LOGIN: 'login',
    EXAM: 'exam',
    COMPONENT: 'component',
};

export const menuList = [
    {
        key: 'sub1',
        label: '管理相关',
        icon: <LaptopOutlined />,
        children: [
            { label: "全局", key: 'app', value: MENU_ITEMS.APP },
            { label: "首页", key: 'dashboard', value: MENU_ITEMS.DASHBOARD },
            { label: "学生管理", key: 'stumgt', value: MENU_ITEMS.STUMGT },
            { label: "收费管理", key: 'feemgt', value: MENU_ITEMS.FEEMGT },
            { label: "教务管理", key: 'teachaffairmgt', value: MENU_ITEMS.TEACHAFFAIRMGT },
            { label: "营销管理", key: 'mktmgt', value: MENU_ITEMS.MKTMGT },
            { label: "租户管理", key: 'tenantmgt', value: MENU_ITEMS.TENANTMGT },
        ],
    },
    {
        key: 'sub2',
        label: '设置相关',
        icon: <NotificationOutlined />,
        children: [
            { label: "基础设置", key: 'basicset', value: MENU_ITEMS.BASICSET },
        ],
    },
    {
        key: 'sub3',
        label: '其他',
        icon: <UserOutlined />,
        children: [
            { label: "通知公告", key: 'announce', value: MENU_ITEMS.ANNOUNCE },
            { label: "统计报表", key: "statreport", value: MENU_ITEMS.STATREPORT },
            { label: "活动中心", key: 'activity', value: MENU_ITEMS.ACTIVITY },
            { label: "登录页", key: 'login', value: MENU_ITEMS.LOGIN },
            { label: "考试相关", key: 'exam', value: MENU_ITEMS.EXAM },
            { label: "组件相关", key: 'component', value: MENU_ITEMS.COMPONENT },
        ],
    },
];