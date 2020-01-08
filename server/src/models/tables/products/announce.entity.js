const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Announce = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    type: {
      type: String,
    },

    weight: {
      type: Number,
      required: [true, 'weight is required'],
    },

    price: {
      type: Number,
      required: [true, 'price is required'],
    },

    quantity: {
      type: Number,
      required: [true, 'price is required'],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },

    imagesUrl: {
      type: String,
    },

    phone: {
      type: String,
      required: [true, 'phone is required'],
      unique: true,
      lowercase: true,
      min: [13, 'phone min is 13'],
      max: [13, 'phone max is 13'],
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
  },
  {
    timestamps: true,
  },
);

Announce.methods.AnnounceInfo = () => {
  return {};
};

Announce.plugin(mongoosePaginate);

module.exports = mongoose.model('Announce', Announce);
