import {createPhotos, showFilters} from './create-other-user-pictures.js';
import './user-form.js';
import './watch-big-pics.js';

import {getData} from './api.js';
import {debounce} from './util.js';

getData((photos) => {
  createPhotos(photos);
  showFilters(photos, debounce(createPhotos));
});

