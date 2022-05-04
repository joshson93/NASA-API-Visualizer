const Picture = require('../models');

const sendToDB = (info, callback) => {
  const data = info.data[0];
  const links = info.links[0];
  const id = data.nasa_id;
  const title = data.title;
  const image = links.href;
  const description = data.description;
  const location = data.location || '';
  const author = data.photographer || data.secondary_creator || '';
  const allPics = Picture.find({});
  allPics.then((data) => {
    const savedId = data.find((pic) => pic.id === id);
    if (savedId) {
      let message = 'cannot save multiple photos';
      callback(message, null);
      return;
    } else {
      const pic = new Picture({
        id,
        title,
        image,
        description,
        location,
        author,
      });
      pic.save((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    }
  });
};

const fetchFromDB = async () => {
  const allPics = await Picture.find({});
  return allPics;
};

const deleteFromDB = (id) => {
  return Picture.findByIdAndDelete({ _id: id });
};

module.exports = { sendToDB, fetchFromDB, deleteFromDB };
