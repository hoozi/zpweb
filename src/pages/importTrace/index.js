import PageLayout from '@/layouts/PageLayout'
import content from './view';
import { services } from '@/config';

const PAGE_NAME = 'importTrace';

const render = data => {
  return content({services, ...data});
}

export default new PageLayout({
  pageTitle: '进口跟踪',
  current: `${PAGE_NAME}.html`
}).render(render);