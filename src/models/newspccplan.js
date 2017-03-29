import mongoose from 'mongoose';
import DrP from './drp';
import FacilityInfo from './facilityinfo';
let Schema = mongoose.Schema;

let SPCCPlanSchema = new Schema({
  facilityinfo: {type: Schema.Types.ObjectId, ref: 'FacilityInfo'},

  drps: [{type: Schema.Types.ObjectId, ref: 'DrP'}],

  stdquestion: [{type: Schema.Types.ObjectId, ref: 'StdQuestion'}],

  contactinfo: {
    name: String,
    phonenumber: String
  },

  totalsitecapacity: Number
});

module.exports = mongoose.model('SPCCPlan', SPCCPlanSchema);
