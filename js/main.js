import {getUsers} from './data.js';
import {renderPicturePreviews} from './picture.js';
import {addOpenHandler} from './bigpicture.js';

const picturesData = getUsers();
renderPicturePreviews(picturesData);
addOpenHandler(picturesData);
