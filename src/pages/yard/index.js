import PageLayout from '@/layouts/PageLayout'
import content from './view';
import { services } from '@/config';

const PAGE_NAME = 'yard';

const render = data => {
  return content({services, ...data});
}

export default new PageLayout({
  pageTitle: '箱源查询',
  current: `${PAGE_NAME}.html`
}).render(render);