// 开发中？
const develop = true
let host = 'http://192.168.77.43:8002';
if (develop) host = 'http://192.168.77.43:8002'; 
else '';
console.log = develop ? console.log : () => {};
console.info = develop ? console.info : () => {};

export {
	host
}