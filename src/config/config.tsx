import { WechatOutlined, HistoryOutlined } from "@ant-design/icons";

const routes = [
    {
        routeName: "Live Chats",
        routeUrl: "/liveConversations",
        icon: <WechatOutlined />
    },
    {
        routeName: "Chat History",
        routeUrl: "/chatHistory",
        icon: <HistoryOutlined />
    }
];

export { routes };