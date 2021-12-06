import mongoose from 'mongoose';
const pollSchema = new mongoose.Schema({
  dbStatus: {
    type: String,
    enum: ['inactive', 'updated', 'outdated'],
    default: 'inactive'
  },
  typeOfId: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: 'true'
  }
});
const pollModel = mongoose.model('poll', pollSchema);
export default pollModel;