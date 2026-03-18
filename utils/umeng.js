const { aplus_queue } = window;
function formatDateTime(timestamp = Date.now()) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
function getCurrentPagePurePath() {
    const pages = getCurrentPages();
    if (pages.length === 0) return '/pages/index/index'; 
    return pages[pages.length - 1].route || '/pages/index/index';
}

const getparams = () => {
    return {
        userId: uni.getSystemInfoSync().deviceId,
        appVersion: uni.getSystemInfoSync().appVersion || '1.0.0',
        eventTime: formatDateTime(),
        pageName: getCurrentPagePurePath(),
        deviceType: uni.getSystemInfoSync().deviceType,
        region: uni.getSystemInfoSync().language
    }

}
//点击
const umengclick = (name) => {
    let params = getparams()
    aplus_queue.push({
        action: 'aplus.record',
        arguments: [name, 'CLK', params]
    })
}
//停留
const umengstay = (name) => {
    let params = getparams()
    aplus_queue.push({
        action: 'aplus.record',
        arguments: [name, 'CLK', params]
    })
}

export {
    umengclick,
    umengstay
}