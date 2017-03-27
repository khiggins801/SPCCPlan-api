import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let PreviousDischargeSchema = new Schema ({
  properties: {
    date: String,
    material: String,
    volume: String,
    location: String,
    spccplan: {type: Schema.Types.ObjectId, ref: 'SPCCPlan'}
  }
});

module.exports = mongoose.model('PreviousDischarge', PreviousDischargeSchema);
