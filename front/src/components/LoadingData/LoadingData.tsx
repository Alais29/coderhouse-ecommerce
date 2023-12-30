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
        src="https://lottie.host/5b8ee2d1-fc3b-4f4e-9662-7ed1a4bd269a/XH1c5afVds.json"
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
};

export default LoadingData;
