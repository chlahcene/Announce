const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Client = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

Client.methods.ClientInfo = () => {
  return {
    id: this.id,
    user: this.user,
  };
};

Client.plugin(mongoosePaginate);

module.exports = mongoose.model('Client', Client);
