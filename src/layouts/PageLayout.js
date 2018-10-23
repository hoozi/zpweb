import Header from '@/components/Header';
import Footer from '@/components/Footer';
import view from './view';
import { menuData } from '@/config';


export default class PageLayout {
  view = view
  constructor(props) {
    this.data = props;
  }
  renderHeader() {
    return Header({
      menuData,
      ...this.data
    });
  }
  renderFooter() {
    return Footer(this.data);
  }
  render(content) {
    const pageContent = content(this.data);
    return this.view({
      header: this.renderHeader(),
      content: pageContent,
      footer: this.renderFooter()
    })
  }
}