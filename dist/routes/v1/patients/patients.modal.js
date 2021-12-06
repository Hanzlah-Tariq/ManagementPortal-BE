import mongoose from 'mongoose';
import { getCurrentDate } from "../../../common/utils";
import { getCurrentTime } from "../../../common/utils";
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add a name'],
    trim: true
  },
  age: {
    type: String,
    required: [true, 'please add a name']
  },
  gender: {
    type: String,
    required: [true, 'please add gender'],
    enum: ['male', 'female', 'other']
  },
  doctor: {
    type: String,
    required: [true, 'please add a doctor name']
  },
  serial: {
    type: Number,
    default: 1
  },
  adminSerial: {
    type: Number,
    default: 1
  },
  medicine: {
    type: Array,
    default: null
  },
  disease: {
    type: String,
    default: null
  },
  joinDate: {
    type: String,
    default: getCurrentDate()
  },
  time: {
    type: String,
    default: getCurrentTime()
  },
  status: {
    type: String,
    enum: ['pending', 'waiting', 'completed'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: 'true'
  }
});
const patientModel = mongoose.model('patient', patientSchema);
export default patientModel;