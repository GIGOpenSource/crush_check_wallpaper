import { onShow, onHide } from '@dcloudio/uni-app'
export function usePageStay(options = {}) {
  let startTime = null
  let pageStayTimer = null
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

  const trackPageStay = (stayDuration) => {
    try {
      const params = {
         userId: uni.getSystemInfoSync().deviceId,
        appVersion: uni.getSystemInfoSync().appVersion || '1.0.0',
        eventTime: formatDateTime(),
        pageName: getCurrentPagePurePath(),
        deviceType: uni.getSystemInfoSync().deviceType,
        region: uni.getSystemInfoSync().language,
        stayDuration: stayDuration // 停留时长（秒）
      }
      const { aplus_queue } = window;
      aplus_queue.push({
        action: 'aplus.record',
        arguments: ['page_stay', 'CLK', params]
    })
    } catch (error) {
      console.error('页面停留时长统计发送失败:', error)
    }
  }
  onShow(() => {
    startTime = Date.now()
    if (pageStayTimer) {
      clearTimeout(pageStayTimer)
      pageStayTimer = null
    }

    if (options.onShowCallback && typeof options.onShowCallback === 'function') {
      options.onShowCallback()
    }
  })


  onHide(() => {
    if (startTime) {
      const endTime = Date.now()
      const stayDuration = Math.floor((endTime - startTime) / 1000) // 转换为秒
      
      // 只统计停留时长大于0的情况
      if (stayDuration > 0) {
        trackPageStay(stayDuration)
      }
      
      startTime = null
    }

    // 执行自定义回调
    if (options.onHideCallback && typeof options.onHideCallback === 'function') {
      options.onHideCallback()
    }
  })

  // 返回清理函数，用于手动清理（可选）
  return {
    clear: () => {
      if (pageStayTimer) {
        clearTimeout(pageStayTimer)
        pageStayTimer = null
      }
      startTime = null
    }
  }
}
