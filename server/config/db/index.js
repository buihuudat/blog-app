const mongoose = require('mongoose');

const connect = async (URI) => {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure \n', error);
  }
}

module.exports = connect;