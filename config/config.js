// 开发中？
const develop = true
let host = 'https://www.crashcheck.net/api';
if (develop) host = 'https://www.crashcheck.net/api'; 
else '';
console.log = develop ? console.log : () => {};
console.info = develop ? console.info : () => {};

export {
	host
}