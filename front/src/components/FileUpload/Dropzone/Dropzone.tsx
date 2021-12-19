import { useDropzone } from 'react-dropzone';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IDropzone {
  handleDrop: (acceptedFiles: File[]) => void;
}

const Dropzone = ({ handleDrop }: IDropzone) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/jpeg, image/jpg, image/png',
  });
  return (
    <div {...getRootProps({ className: cx(styles['dropzone'], 'mb-3') })}>
      <input {...getInputProps()} type="file" />
      <p className="mb-0">
        Arrastra las imagenes acá o click aquí para seleccionarlas
      </p>
      <p className="mb-0">
        (Solo se aceptan archivos con extensión .jpeg, .jpg y .png)
      </p>
    </div>
  );
};

export default Dropzone;
