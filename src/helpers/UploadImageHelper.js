import uuidv4 from 'uuid';
const hexlist = '0123456789abcdef';
const b64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+';

export const guid_to_base64 = (g, le) => {
  let s = g.replace(/[^0-9a-f]/ig, '').toLowerCase();
  if (s.length !== 32) return '';

  if (le) s = s.slice(6, 8) + s.slice(4, 6) + s.slice(2, 4) + s.slice(0, 2) +
    s.slice(10, 12) + s.slice(8, 10) +
    s.slice(14, 16) + s.slice(12, 14) +
    s.slice(16);
  s += '0';

  let a, p, q;
  let r = '';
  let i = 0;
  while (i < 33) {
    a = (hexlist.indexOf(s.charAt(i++)) << 8) |
      (hexlist.indexOf(s.charAt(i++)) << 4) |
      (hexlist.indexOf(s.charAt(i++)));

    p = a >> 6;
    q = a & 63;

    r += b64list.charAt(p) + b64list.charAt(q);
  }

  return r;
}; // guid_to_base64()

export const combineUuid = (id) => {
  return guid_to_base64(id) + '-' + guid_to_base64(uuidv4())
};

export const generateImageData = (id, image) => {
  let data = null;
  let idCombined = combineUuid(id);
  data = {
    id: idCombined,
    image: {
      type: image.substring("data:image/".length, image.indexOf(";base64")),
      private: false,
      data: image.substr(image.indexOf(',') + 1)
    }
  };

  return data;
};


export const saveImageWithId = (state, uid) => {
  let data = null;
  let id = uid !== undefined ? combineUuid(uid) : null;
  if (state.croppedImage !== null) {
    let image = state.croppedImage;
    data = {
      id: id,
      image: {
        type: image.substring("data:image/".length, image.indexOf(";base64")),
        private: false,
        data: image.substr(image.indexOf(',') + 1)
      }
    }
  }
  return data
};