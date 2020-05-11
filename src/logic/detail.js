import './common';
import { queryNewsDetailById } from '@/api';
import moment from 'moment';
import { parse } from 'qs';

const search = window.location.search.substring(1);
const { id } = parse(search);
const compiled = _.template($('#news-detail--tpl').html());

async function getNewsDetailById(id, callback) {
  const response = await queryNewsDetailById(id);
  if(_.isUndefined(response) || response.flag !=1 ) return;
  callback && callback(response.infoContentsDetail);
}

getNewsDetailById(id, data => {
  const html = compiled({...data, moment});
  $('#detail-content-area').html(html);
})