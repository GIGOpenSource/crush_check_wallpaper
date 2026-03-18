// qrcode.js 工具文件
// 使用 qrcode.js 库生成二维码

export default {
	CorrectLevel: {
		L: 1,
		M: 0,
		Q: 3,
		H: 2
	},
	
	toCanvas(canvasId, text, options, callback) {
		const width = options.width || 200;
		const margin = options.margin || 2;
		const colorDark = options.colorDark || '#000000';
		const colorLight = options.colorLight || '#FFFFFF';
		const correctLevel = options.correctLevel || 0;
		
		// 创建 canvas 上下文
		const ctx = uni.createCanvasContext(canvasId);
		
		// 设置背景色
		ctx.setFillStyle(colorLight);
		ctx.fillRect(0, 0, width, width);
		
		// 使用在线 API 生成二维码图片，然后绘制到 canvas
		// 二维码 API: https://api.qrserver.com/v1/create-qr-code/
		const eccLevel = ['L', 'M', 'Q', 'H'][correctLevel] || 'M';
		const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${width}x${width}&data=${encodeURIComponent(text)}&color=${colorDark.replace('#', '')}&bgcolor=${colorLight.replace('#', '')}&margin=${margin}&ecc=${eccLevel}`;
		
		// 下载二维码图片
		uni.downloadFile({
			url: qrApiUrl,
			success: (res) => {
				if (res.statusCode === 200) {
					// 将图片绘制到 canvas
					ctx.drawImage(res.tempFilePath, 0, 0, width, width);
					ctx.draw(false, () => {
						if (callback) callback(null);
					});
				} else {
					if (callback) callback(new Error('生成二维码失败'));
				}
			},
			fail: (err) => {
				if (callback) callback(err);
			}
		});
	}
}
