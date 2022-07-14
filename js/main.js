import {openFullScreenContainer, closeFullScreenContainer} from './watch-big-pics.js';
openFullScreenContainer();
closeFullScreenContainer();
import {createPhotos} from './create-other-user-pictures.js';
import './user-form.js';
import './watch-big-pics.js';
import './api.js';

import {getData} from './api.js';
import {closeUploadForm, uploadNewPicture} from './user-form.js';

getData((photos) => {
  createPhotos(photos);
});
//uploadNewPicture(closeUploadForm);
