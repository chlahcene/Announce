const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const SubCategory = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    lowercase: true,
  },

  urlPhoto: {
    type: String,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

SubCategory.methods.SubCategoryInfo = () => {
  return {
    id: this.id,
    name: this.name,
    urlPhoto: this.urlPhoto,
    category: this.category,
  };
};

SubCategory.plugin(mongoosePaginate);

module.exports = mongoose.model('SubCategory', SubCategory);
