import { v2 as cloudinary } from 'cloudinary';
import Config from 'config';

cloudinary.config({
  cloud_name: Config.CLOUD_NAME,
  api_key: Config.CLOUD_API_KEY,
  api_secret: Config.CLOUD_API_SECRET,
});

export default cloudinary;
