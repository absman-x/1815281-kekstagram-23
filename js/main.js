import {getUsers} from './data.js';
import {renderPicturePreviews} from './picture.js';
import {addOpenHandler} from './bigpicture-viewer.js';
import {newImageUploader} from './file-uploader.js';

const picturesData = getUsers();
renderPicturePreviews(picturesData);
addOpenHandler(picturesData);
newImageUploader();
