import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { cld } from 'services/Cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IListFiles {
  files: (File | string)[];
  handleRemove: (fileToRemove: number, cldFile?: string) => void;
}

const ListFiles = ({ files, handleRemove }: IListFiles) => {
  return (
    <div className={cx('d-flex', 'mb-3', 'flex-wrap', 'gap-2')}>
      {files.map((file, index) => {
        switch (typeof file) {
          case 'string': {
            const image = cld.image(file);
            image.resize(thumbnail().width(150).height(150));
            return (
              <div key={`${file}`} className={styles['img-container']}>
                <AdvancedImage
                  cldImg={image}
                  plugins={[lazyload(), placeholder('blur')]}
                  style={{ height: '150px', width: '150px' }}
                />
                <div
                  onClick={() => handleRemove(index, file)}
                  className={cx(styles['img-container__remove'])}
                >
                  <FontAwesomeIcon icon="times-circle" size="lg" color="red" />
                </div>
              </div>
            );
          }
          default: {
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
          }
        }
      })}
    </div>
  );
};

export default ListFiles;
