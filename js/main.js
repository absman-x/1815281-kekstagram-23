import {renderPicturePreviews} from './picture.js';
import {addOpenHandler} from './bigpicture-viewer.js';
import {initImageUploader} from './image-uploader.js';
import {getData} from './server-api.js';

getData((picturesData) => {
  renderPicturePreviews(picturesData);
  addOpenHandler(picturesData);
});
initImageUploader();
