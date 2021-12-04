import { Spinner } from 'react-bootstrap';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface ILoadingData {
  style?: React.CSSProperties;
}

const LoadingData = ({ style }: ILoadingData) => {
  return (
    <div className={cx(styles['spinner-container'])} style={style}>
      <Spinner animation="grow" variant="primary" />
    </div>
  );
};

export default LoadingData;
