import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  fee: {
    type: Number,
    required: true,
    default: 10,
  },
});

const feeModel = mongoose.model('fee', feeSchema);

export default feeModel;
