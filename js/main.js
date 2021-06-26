import {getUsers} from './data.js';
import {renderPicturePreviews} from './picture.js';
import {BigPictureSelector} from './bigpicture.js';

const picturesData = getUsers();
renderPicturePreviews(picturesData);
BigPictureSelector(picturesData);
