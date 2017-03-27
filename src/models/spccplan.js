import mongoose from 'mongoose';
import DrP from './drp';
import PreviousDischarge from './previousdischarge';
let Schema = mongoose.Schema;

let SPCCPlanSchema = new Schema({
  drps: [{type: Schema.Types.ObjectId, ref: 'DrP'}],

  facilityname: String,
  facilityaddress: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  },
  facilityowner: String,
  owneraddress: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  },
  facilitydescription: String,
  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: {
      lat: Number,
      long: Number
    }
  },
  businesstype: String,
  beghours: String,
  endhours: String,
  schedule: String,
  security: {
    twentyfourhours: Boolean,
    beghours: String,
    endhours: String,
    days: String
  },

  stdquestion: [{type: Schema.Types.ObjectId, ref: 'StdQuestion'}],

  contactinfo: {
    name: String,
    phonenumber: String
  },

//  drps: [{type: Schema.Types.ObjectId, ref: 'DrP'}],

  tankinfo: [{type: Schema.Types.ObjectId, ref: 'TankInfo'}],

  loadingareaexists: Boolean,
  loadingareaproperties: [{type: Schema.Types.ObjectId, ref: 'LoadingArea'}],

  loadingracksexists: Boolean,
  loadingareaproperties: [{type: Schema.Types.ObjectId, ref: 'LoadingRacks'}],

  loadingoperations: {
    exists: Boolean,
    specific: Boolean,
    procedures: String
  },

  onsiterefueling: {
    exists: Boolean,
    specific: Boolean,
    procedures: String
  },

  previousdischargeexists: Boolean,
  previousdischarge: [{type: Schema.Types.ObjectId, ref: 'PreviousDischarge'}],

  registered: Boolean,
  totalsitecapacity: Number
});

module.exports = mongoose.model('SPCCPlan', SPCCPlanSchema);
