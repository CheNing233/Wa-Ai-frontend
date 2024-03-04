const listeners = {}

export default {
    // 监听
    $on(event, handler) {
        if (!listeners[event]) {
            listeners[event] = new Set()
        }
        // 同一个事件，可以绑定多个处理函数
        listeners[event].add(handler)
    },
    // 取消监听
    $off(event, handler) {
        if (listeners[event]) {
            listeners[event].delete(handler)
        }
    },
    // 触发监听，可传递参数
    $emit(event, ...args) {
        if (listeners[event]) {
            for (const handler of listeners[event]) {
                handler(...args)
            }
        }
    }
}