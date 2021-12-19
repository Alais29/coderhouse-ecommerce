import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IListFiles {
  files: File[];
  handleRemove: (fileIndex: number) => void;
}

const ListFiles = ({ files, handleRemove }: IListFiles) => {
  return (
    <div className={cx('d-flex', 'mb-3')}>
      {files.map((file, index) => {
        const path = URL.createObjectURL(file);
        return (
          <div
            key={`${file.name}-${index}`}
            className={styles['img-container']}
          >
            <img
              src={path}
              alt={file.name}
              className={cx(styles['image-uploaded'])}
            />
            <div
              onClick={() => handleRemove(index)}
              className={cx(styles['img-container__remove'])}
            >
              <FontAwesomeIcon icon="times-circle" size="lg" color="red" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListFiles;
