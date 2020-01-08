const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Admin = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

Admin.methods.AdminInfo = () => {
  return {
    id: this.id,
    user: this.user,
  };
};

Admin.plugin(mongoosePaginate);

module.exports = mongoose.model('Admin', Admin);
