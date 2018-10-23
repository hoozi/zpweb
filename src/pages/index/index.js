import PageLayout from '@/layouts/PageLayout'
import content from './view';

const render = data => {
  return content(data);
}

export default new PageLayout({
  pageTitle: 'index'
}).render(render);