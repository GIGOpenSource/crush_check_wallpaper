<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	beforeCreate: function () {
		(function (w, d, s, q, i) {
			w[q] = w[q] || [];
			var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
			j.async = true;
			j.id = 'beacon-aplus';
			j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js';
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'aplus_queue', '203467608');

		//集成应用的appKey
		aplus_queue.push({
			action: 'aplus.setMetaInfo',
			arguments: ['appKey', '69ba004c6f259537c77be760']
		});

		/* 如果使用的是单页面应用，例如：React、Vue、Angular等，则需要添加下面的代码 */
		/* 关闭自动PV发送，如果不是单页面应用，请删掉下方代码 */
		aplus_queue.push({
			action: 'aplus.setMetaInfo',
			arguments: ['aplus-waiting', 'MAN']
		});

		//是否开启调试模式 
		aplus_queue.push({
			action: 'aplus.setMetaInfo',
			arguments: ['DEBUG', true]
		});
	}
}
</script>

<style lang="scss">
@import "uview-plus/index.scss";
</style>
