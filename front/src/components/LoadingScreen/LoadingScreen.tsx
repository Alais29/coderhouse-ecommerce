import { CSSProperties } from 'react';
import { Spinner } from 'react-bootstrap';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface ILoadingScreen {
  style?: CSSProperties;
}

const LoadingScreen = ({ style = {} }: ILoadingScreen) => {
  return (
    <div className={cx(styles['loading-screen'])} style={style}>
      <Spinner animation="grow" variant="primary" />
    </div>
  );
};

export default LoadingScreen;
