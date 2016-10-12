// Date() 固定的日期方法
var now = new Date();
// alert(now);
// 获取当前的秒数
var seconds = now.getSeconds();
// alert(seconds);
// 获取分钟数，按分记
var minutes = now.getMinutes();
// 获取当前的小时数，按时计，24小时计，表盘只有12个数，%取余
var hours = now.getHours() % 12;
// alert(hours);
var second = document.getElementById('s');
var minute = document.getElementById('m');
var hour = document.getElementById('h');
// 创建变量赋予当前animation-delay的值
var miao = -15 - seconds;
var fen = -15 * 60 - minutes * 60 - seconds;
var shi = -3 * 60 * 60 - hours * 60 * 60 - minutes * 60 -seconds;
// 标签的显示样式
// 标签.style.样式名称 = 样式值
s.style.animationDelay = miao + 's';
m.style.animationDelay = fen + 's';
h.style.animationDelay = shi + 's';
