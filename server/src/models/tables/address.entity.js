const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Address = new Schema({
  country: {
    type: String,
    default: 'ALG',
    uppercase: true,
  },

  wilaya: {
    type: Number,
  },

  daira: {
    type: String,
  },

  subAddress: {
    type: String,
  },
});

Address.methods.AddressInfo = () => {
  return {};
};

Address.plugin(mongoosePaginate);

module.exports = mongoose.model('Address', Address);
