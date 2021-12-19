import Dropzone from './Dropzone/Dropzone';
import ListFiles from './ListFile/ListFile';

interface IFileUpload {
  files: (File | string)[];
  handleRemove: (fileToRemove: number, cldFile?: string) => void;
  handleDrop: (acceptedFiles: File[]) => void;
}

const FileUpload = ({ files, handleRemove, handleDrop }: IFileUpload) => {
  return (
    <>
      <ListFiles files={files} handleRemove={handleRemove} />
      <Dropzone handleDrop={handleDrop} />
    </>
  );
};

export default FileUpload;
