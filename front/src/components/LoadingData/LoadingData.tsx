import { Player } from '@lottiefiles/react-lottie-player';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface ILoadingData {
  style?: React.CSSProperties;
  mode: 'fullscreen' | 'partial';
}

const LoadingData = ({ style, mode }: ILoadingData) => {
  return (
    <div className={cx(styles[mode])} style={style}>
      <Player
        autoplay
        loop
        src="https://res.cloudinary.com/alais29/raw/upload/v1640633299/ecommerce-loading_bppouf.json"
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
};

export default LoadingData;
