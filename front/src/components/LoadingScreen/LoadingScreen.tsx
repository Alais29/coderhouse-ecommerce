import { Spinner } from 'react-bootstrap'
import cx from 'classnames/bind'
import styles from './styles.module.scss'

const LoadingScreen = () => {
  return (
    <div className={cx(styles['loading-screen'])}>
      <Spinner animation="grow" variant="primary" />
    </div>
  )
}

export default LoadingScreen
