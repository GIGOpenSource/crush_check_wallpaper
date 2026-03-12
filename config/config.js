// 开发中？
const develop = true
let host = 'https://markwallpapers.com/api';
if (develop) host = 'https://markwallpapers.com/api'; 
else '';
console.log = develop ? console.log : () => {};
console.info = develop ? console.info : () => {};

export {
	host
}