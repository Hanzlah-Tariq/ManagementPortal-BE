import mongoose from 'mongoose';
import { getCurrentDate } from "../../../common/utils";
import { getCurrentTime } from "../../../common/utils";
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add a name'],
    maxlength: [20, 'Name cannot be longer than 20 characters'],
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
  email: {
    type: String,
    unique: true,
    required: [true, 'please add a email'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'please add a valid email']
  },
  address: {
    type: String,
    required: false
  },
  designation: {
    type: String,
    required: [true, 'please add a designation'],
    maxlength: [20, 'Designation name cannot be longer than 20 characters'],
    trim: true
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  joinDate: {
    type: String,
    default: getCurrentDate()
  },
  time: {
    type: String,
    default: getCurrentTime()
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: 'true'
  },
  poll: {
    type: mongoose.Schema.ObjectId,
    ref: 'poll',
    required: 'true'
  }
}); // Cascade delete employee account when a employee record is deleted
// eslint-disable-next-line func-names

employeeSchema.pre('remove', async function (next) {
  await this.model('user').findByIdAndDelete(this.user);
  next();
});
employeeSchema.pre('remove', async function (next) {
  await this.model('poll').findByIdAndDelete(this.poll);
  next();
});
const employeeModel = mongoose.model('employee', employeeSchema);
export default employeeModel;