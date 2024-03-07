import {WS_BASE_URL} from '@/config/WsConfig'
import eventBus from "@/eventbus";
import VueCookies from "vue-cookies";

const wsUrl = WS_BASE_URL + '/websocket'

const defaultOnOpenHandler = () => {

    console.log('ws连接成功')
}

const defaultOnCloseHandler = () => {
    console.log('ws连接关闭')
}

const defaultOnErrorHandler = (err) => {
    console.log('ws连接错误', err)
}

const defaultOnMessageHandler = (event) => {
    console.log('ws接收到事件', event)

    const data = JSON.parse(event.data);

    // 任务更新事件
    if (data.taskId !== undefined) {
        eventBus.$emit('taskUpdate', data);
    }
}

const defaultSendHeartbeatHandler = (socketInstance) => {
    setInterval(() => {
        socketInstance.send('clientHeartBeat');
        console.log('ws心跳');
    }, 15000);
}

const initBaseWs = (
    onOpenHandler = defaultOnOpenHandler,
    onCloseHandler = defaultOnCloseHandler,
    onErrorHandler = defaultOnErrorHandler,
    onMessageHandler = defaultOnMessageHandler,
    sendHeartbeatHandler = defaultSendHeartbeatHandler
) => {
    const userToken = VueCookies.get('token');

    const baseSocket = new WebSocket(`${wsUrl}/${userToken}`);

    baseSocket.onopen = onOpenHandler;
    baseSocket.onclose = onCloseHandler;
    baseSocket.onerror = onErrorHandler;
    baseSocket.onmessage = onMessageHandler;

    console.log('ws连接', `${wsUrl}/${userToken}`);

    sendHeartbeatHandler(baseSocket);

    return baseSocket;
}

const closeBaseWs = (baseSocket) => {
    if (baseSocket) {
        baseSocket.close();
    }
}

export default {
    initBaseWs,
    closeBaseWs,
}