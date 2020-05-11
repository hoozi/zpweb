import $ from 'jquery';
import 'layui-src/dist/layui.all';
import 'layui-src/dist/css/layui.css';
import 'layui-src/dist/css/modules/layer/default/layer.css'
const layer = layui.layer;
const statusMap = {
  '500': '内部服务器错误',
  '504': '内部服务器错误',
  '404': '资源未找到'
}
const blackList = [
  
]

let xhrs = window.xhrs = {};
function error(xhr, status) {
  $('[data-loading-text]').button('reset');
  if(xhr.statusText == 'abort') {
    return;
  }
  const messageText = xhr.status == '0' ?  (xhr.statusText == 'timeout' ? '请求超时' : statusText) : statusMap[xhr.status]; 
  return layer.msg(messageText)
}
function json(json) {
  return json
}

export default function request(url, options) {
  let _url = ''
  if(url.indexOf('?') != -1) {
    _url = url.split('?')[0];
  } else {
    _url = url;
  }
  if(xhrs[_url] && _.some(blackList, item => _url.indexOf(item) !=-1 )) {
    xhrs[_url].abort();
    delete xhrs[_url];
  }
  let xhr = null;
  const { type='GET', data='' } = options || {};
  const body = type == 'POST' ? JSON.stringify(data) : '';
  xhr = $.ajax({
    url,
    timeout: 60000,
    data: body,
    ...options
  });
  if(!xhrs[_url]) {
    xhrs[_url] = xhr
  }
  return xhr.then(json).fail(error);
}