import {picturesFilterHandler} from './similar-pictures.js';
import {addOpenHandler} from './big-picture-viewer.js';
import {initImageUploader} from './image-uploader.js';
import {getData} from './server-api.js';

getData((picturesData) => {
  const pictures = picturesData;
  picturesFilterHandler(pictures);
  addOpenHandler(pictures);
});

initImageUploader();
