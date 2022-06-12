const moment = require('moment');

const releaseDate = date => {
  return moment(date).format('Do MMMM YYYY');
}

module.exports = {
  releaseDate
};