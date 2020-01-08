const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Category = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    lowercase: true,
  },

  urlPhoto: {
    type: String,
  },
});

Category.methods.CategoryInfo = () => {
  return {
    id: this.id,
    name: this.name,
    urlPhoto: this.urlPhoto,
  };
};

Category.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', Category);
