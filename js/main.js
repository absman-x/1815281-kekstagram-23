import {getUsers} from './data.js';
import {renderPicturePreviews} from './picture.js';
import {addOpenHandler} from './bigpicture-viewer.js';
import {initImageUploader} from './image-uploader.js';

const picturesData = getUsers();
renderPicturePreviews(picturesData);
addOpenHandler(picturesData);
initImageUploader();
