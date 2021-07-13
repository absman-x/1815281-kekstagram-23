//import {getUsers} from './data.js';
import {renderPicturePreviews} from './picture.js';
import {addOpenHandler} from './bigpicture-viewer.js';
import {initImageUploader} from './image-uploader.js';
import {getData} from './server-api.js';

/*
const dataURL = 'https://23.javascript.pages.academy/kekstagram/data';
fetch(dataURL).then((response) => response.json()).then((picturesData) => {
  renderPicturePreviews(picturesData);
  addOpenHandler(picturesData);
});
*/

//const picturesData = getUsers();
//console.log(picturesData);
//renderPicturePreviews(picturesData);
//addOpenHandler(picturesData);
getData((picturesData) => {
  renderPicturePreviews(picturesData);
  addOpenHandler(picturesData);
});
initImageUploader();
