import { Button } from 'react-bootstrap';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { IUser } from 'commons/interfaces';
import { cld } from 'services/Cloudinary';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IUserData {
  data: IUser;
  dashboard?: boolean;
  handleLogout?: () => Promise<void>;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const UserData = ({ data, dashboard, handleLogout, status }: IUserData) => {
  const profileImg = cld.image(`${data.fotoId}`);
  profileImg.resize(thumbnail().width(200).height(200));

  return (
    <div>
      <div className={cx(styles['user-data'])}>
        <AdvancedImage
          cldImg={profileImg}
          plugins={[lazyload(), placeholder('blur')]}
        />
        <div className={cx(styles['user-data__info'])}>
          <span>
            <span className="fw-bold">Email:</span> {data?.email}
          </span>
          <span>
            <span className="fw-bold">Direccion:</span> {data?.calle}{' '}
            {data?.altura}
            {data?.piso ? `, Piso ${data?.piso}` : ''}
            {data?.depto ? `, Depto ${data?.depto}` : ''}
          </span>
          <span>
            <span className="fw-bold">Código Postal:</span> {data?.codigoPostal}
          </span>
          <span>
            <span className="fw-bold">Edad:</span> {data?.edad}
          </span>
          <span>
            <span className="fw-bold">Teléfono:</span> {data?.telefono}
          </span>
          {dashboard && (
            <Button
              onClick={status === 'loading' ? undefined : handleLogout}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Procesando...' : 'Logout'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserData;
