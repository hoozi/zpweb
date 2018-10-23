import Header from '@/components/Header';
import Footer from '@/components/Footer';
import view from './view';

const PageLayout = data => {
  const { content='' } = data;
  return view({
    header: Header(data),
    content,
    footer: Footer(data)
  })
}

export default PageLayout;