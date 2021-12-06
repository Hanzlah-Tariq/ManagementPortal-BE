import mongoose from 'mongoose';
import { getCurrentDate } from "../../../common/utils";
import { getCurrentTime } from "../../../common/utils";
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  totalPatients: {
    type: Number,
    required: true,
    default: 0
  },
  joinDate: {
    type: String,
    default: getCurrentDate()
  },
  time: {
    type: String,
    default: getCurrentTime()
  }
});
const doctorModel = mongoose.model('doctor', doctorSchema);
export default doctorModel;