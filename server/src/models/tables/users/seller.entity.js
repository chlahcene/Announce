const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Seller = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

Seller.methods.SellerInfo = () => {
  return {
    id: this.id,
    user: this.user,
  };
};

Seller.plugin(mongoosePaginate);

module.exports = mongoose.model('Seller', Seller);
