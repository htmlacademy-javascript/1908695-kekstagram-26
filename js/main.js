import {createPhotos} from './create-other-user-pictures.js';
import './user-form.js';
import './watch-big-pics.js';

import {getData} from './api.js';

getData((photos) => {
  createPhotos(photos);
});

