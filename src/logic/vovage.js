import './common';
import 'layui-src/dist/layui.all';
import 'layui-src/dist/css/layui.css';
import { queryVovage, queryBranchVovage } from '@/api';

const table = layui.table;
const laypage = layui.laypage;
const branchCompiled = _.template($('#branch-temp').html());
const initParam = {
  port: 'CNZPU',
  code: '',
  vesselEname: '',
  vesselCname: '',
  voyageIn: '',
  voyageOut: '',
  gotoPage: 1
}

function mergeParam(param) {
  return $.extend(initParam, param);
}

function getParam() {
  const values = {}
  $('.form-control').each(function(){
    const id = this.id;
    if(!id) return;
    values[id] = $(this).val();
  });
  return values;
}


async function getVovage(params, callback) {
  const response = await queryVovage(params);
  callback && callback(response.list.map(item=>{
    return {
      ...item,
      ...item.voyageInfo
    }
  }), response.page);
} 

async function getBranchVovage(id, callback) {
  const response = await queryBranchVovage(id);
  callback && callback(response);
}

table.on('tool(result-table)', e => {
  const { data } = e;
  renderBranch(data.id)
});

function renderBranch(id) {
  $('#load-branch').html('<div style="line-height: 200px; text-align: center; color: #1890ff">加载中...</div>')
  getBranchVovage(id, data => {
    const html = branchCompiled({data});
    $('#load-branch').html(html);
  })
}

function renderTable(data) {
  table.render({
    elem: '#result-table',
    cellMinWidth: 130,
    limit: 20,
    cols: [[
      {field: 'codeCvalue', title: '停靠码头'}
      ,{field: 'vesselEname', title: '英文船名'}
      ,{field: 'vesselCname', title: '中文船名'}
      ,{field: 'voyageIn', title: '进口航次'} 
      ,{field: 'voyageOut', title: '出口航次'}
      ,{field: 'tradeFlag', title: '内外贸'}
      ,{field: 'vesselUncode', title: 'UN代码'}
      ,{field: 'cTNCloseTime', title: '海关截关时间', sort: true}
      ,{field: 'cTNStopTime', title: '码头截单时间', sort: true}
      ,{field: 'cTNBeginTime', title: '进箱开始时间', sort: true}
      ,{field: 'cTNEndTime', title: '进箱截止时间', sort: true}
      ,{field: 'dependPlanTime', title: '预计抵港时间', sort: true}
      ,{fixed: 'right', title:'支线船期', width: 90, templet: data => {
        return data.arrivalPort === 'CNZPU' ? '<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event data-toggle="modal" data-target="#branch-modal">查看</a>' : '-'
      }}
    ]],
    data,
    even: true
  })
}

function renderPaging(count, curr, limit) {
  laypage.render({
    elem: 'paging'
    ,curr
    ,count
    ,limit
    ,theme: '#1E9FFF'
    ,jump: function(page, first) {
      const {curr: gotoPage} = page;
      const params = mergeParam({gotoPage});
      if(!first) {
        renderAll(params);
      }
    }
  });
}

$('.init-selectpicker').on('change', function(e) {
  const name = e.target.id;
  mergeParam({
    [name]: $(this).val()
  });
});

$('#search-btn').on('click', function(e) {
  const params = mergeParam(getParam());
  renderAll(params);
})
function renderAll(params) {
  $('#search-btn').button('loading');
  getVovage(params, (data, page) => {
    $('#search-btn').button('reset');
    renderTable(data);
    renderPaging(page.count, page.currentPage, page.onePageCount)
  })
}

renderAll(initParam);

