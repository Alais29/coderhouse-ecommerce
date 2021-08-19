import { IToastInfo } from 'commons/interfaces'
import { Toast } from 'react-bootstrap'
import cx from 'classnames/bind'
import styles from './styles.module.scss'

interface INotification {
  show: boolean
  handleToggleShowToast: (info?: IToastInfo) => void,
  toastInfo: IToastInfo
}

const Notification = ({ show, handleToggleShowToast, toastInfo }: INotification) => {
  return (
    <div className={cx(styles.notification, styles[toastInfo.type])}>
      <Toast show={show} onClose={() => handleToggleShowToast()} delay={3000} autohide>
        <div className="d-flex align-items-center justify-content-between">
          <Toast.Body>{toastInfo.text}</Toast.Body>
          <button type="button" className="btn-close ms-3 me-3" aria-label="Close" data-dismiss="toast" onClick={() => handleToggleShowToast()}></button>
        </div>
      </Toast>
    </div>
  )
}

export default Notification
