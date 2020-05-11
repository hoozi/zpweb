import './common';
import { queryNewsList } from '@/api';
import moment from 'moment';

const tabItem = $('.tabs-nav__item');
const compiled = _.template($('#news-list--tpl').html());
const loadArea = $('#news-tabs-content-area');

async function getNewsList(params, callback) {
  const response = await queryNewsList({pageSize: 15, ...params});
  if(_.isUndefined(response) || response.flag !=1 ) return;
  callback && callback(response.list);
}

function renderNewsList(params) {
  loadArea.html('<div style="line-height: 200px; text-align: center; color: #1890ff">加载中...</div>')
  getNewsList(params, data=> {
    let html = compiled({data, moment})
    if(!data.length) {
      html = '<div style="line-height: 200px; text-align: center; color: #999">暂无数据</div>'
    }
    loadArea.html(html);
  })
}

renderNewsList({category: 1});

tabItem.on('click', function(){
  const category = $(this).data('category');
  tabItem.removeClass('active');
  $(this).addClass('active');
  renderNewsList({category});
})