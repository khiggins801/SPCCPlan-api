import mongoose from 'mongoose';
import SPCCPlan from './spccplan';
let Schema = mongoose.Schema;

let FacilityInfoSchema = new Schema ({

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

  previousdischargeexists: Boolean,
  previousdischarge: [{type: Schema.Types.ObjectId, ref: 'PreviousDischarge'}],

  registered: Boolean,

})

module.exports = mongoose.model('FacilityInfo', FacilityInfoSchema);
