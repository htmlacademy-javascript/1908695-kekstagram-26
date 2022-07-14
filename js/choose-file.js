import {uploadButton} from './user-form.js';

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

const uploadFile = () => {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
};

export {uploadFile};
