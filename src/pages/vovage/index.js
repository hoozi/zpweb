import PageLayout from '@/layouts/PageLayout'
import content from './view';
import { services } from '@/config';

const PAGE_NAME = 'vovage';

const render = data => {
  return content({services, ...data});
}

export default new PageLayout({
  pageTitle: '船期查询',
  current: `${PAGE_NAME}.html`
}).render(render);