import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  medicine: {
    type: String,
    required: true,
    trim: true,
  },
});

const medicineModel = mongoose.model('medicine', medicineSchema);

export default medicineModel;
