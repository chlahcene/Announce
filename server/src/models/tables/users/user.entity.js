const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { roles, userRole } = require('../../../utils/role');

const { Schema } = mongoose;

const User = new Schema(
  {
    idFirebase: {
      type: String,
      required: [true, 'id firebase is required'],
      unique: true,
    },

    name: {
      type: String,
      required: [true, 'name is required'],
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, 'phone is required'],
      unique: true,
      lowercase: true,
      min: [13, 'phone min is 13'],
      max: [13, 'phone max is 13'],
    },

    role: {
      type: String,
      enum: roles,
      default: userRole,
      uppercase: true,
    },
  },
  {
    timestamps: true,
  },
);

User.methods.userInfo = () => {
  return {
    id: this.id,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    name: this.name,
    phone: this.phone,
    role: this.role,
    idFirebase: this.idFirebase,
  };
};

User.plugin(mongoosePaginate);

module.exports = mongoose.model('User', User);
