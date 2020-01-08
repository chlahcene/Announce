const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const SuperAdmin = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

SuperAdmin.methods.SuperAdminInfo = () => {
  return {
    id: this.id,
    user: this.user,
  };
};

SuperAdmin.plugin(mongoosePaginate);

module.exports = mongoose.model('SuperAdmin', SuperAdmin);
