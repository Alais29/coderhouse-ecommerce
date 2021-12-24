import { CSSProperties } from 'react';
import { Spinner } from 'react-bootstrap';
import Loading from 'images/loading.gif';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface ILoadingScreen {
  style?: CSSProperties;
}

const LoadingScreen = ({ style = {} }: ILoadingScreen) => {
  return (
    <div className={cx(styles['loading-screen'])} style={style}>
      <img src={Loading} alt="Loading" />
    </div>
  );
};

export default LoadingScreen;
