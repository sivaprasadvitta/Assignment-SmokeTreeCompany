import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Address = mongoose.model('Address', addressSchema);
export default Address;