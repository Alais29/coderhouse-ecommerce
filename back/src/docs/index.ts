import basicInfo from './basicInfo';
import components from './components';
import products from './products';
import servers from './servers';
import tags from './tags';

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  ...products,
};
