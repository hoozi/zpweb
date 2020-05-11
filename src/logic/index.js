import './common';
import { queryNewsList } from '@/api';
import moment from 'moment';
import '@/vendors/jquery.cycle.js';

const tabItem = $('.tabs-nav__item');
const compiled = _.template($('#news-list--tpl').html());
const loadArea = $('#news-tabs-content-area');

async function getNewsList(category, callback) {
  const response = await queryNewsList({category});
  if(_.isUndefined(response) || response.flag !=1 ) return;
  callback && callback(response.list, category);
}


function renderNewsList(category) {
  loadArea.html('<li style="line-height: 200px; text-align: center; color: #1890ff">加载中...</li>')
  getNewsList(category, data=> {
    let html = compiled({data, moment})
    if(!data.length) {
      html = '<li style="line-height: 200px; text-align: center; color: #999">暂无数据</li>'
    }
    loadArea.html(html);
  })
}

renderNewsList(1);

tabItem.on('click', function(){
  const category = $(this).data('category');
  tabItem.removeClass('active');
  $(this).addClass('active');
  renderNewsList(category);
})

getNewsList(2, (data, category) => {
  $('#notice-content').html(compiled({data, moment})).cycle({ 
    fx: 'scrollDown', 
    speed: 1000,
    pause:  1 
  });
});
