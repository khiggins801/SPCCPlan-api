import mongoose from 'mongoose';
import { Router } from 'express';
import SPCCPlan from '../models/spccplan';
import TankCategory from '../models/tankcategory';
import StdQuestion from '../models/stdquestion';
import DrP from '../models/drp';
import TankInfo from '../models/tankinfo';
import LoadingAreaProperties from '../models/loadingareaproperties';
import LoadingRackProperties from '../models/loadingrackproperties';
import PreviousDischarge from '../models/previousdischarge';

export default({config, db }) => {
  let api = Router();
console.log('inside spcc controller');

  //'/v1/spccplan/add'
api.post('/add', (req, res) => {
  let newSPCCPlan = new SPCCPlan();
  newSPCCPlan.facilityname = req.body.facilityname;
  newSPCCPlan.facilityaddress.street = req.body.facilityaddress.street;
  newSPCCPlan.facilityaddress.city = req.body.facilityaddress.city;
  newSPCCPlan.facilityaddress.state = req.body.facilityaddress.state;
  newSPCCPlan.facilityaddress.zipcode = req.body.facilityaddress.zipcode;

  newSPCCPlan.facilityowner = req.body.facilityowner;
  newSPCCPlan.owneraddress.street = req.body.owneraddress.street;
  newSPCCPlan.owneraddress.city = req.body.owneraddress.city;
  newSPCCPlan.owneraddress.state = req.body.owneraddress.state;
  newSPCCPlan.owneraddress.zipcode = req.body.owneraddress.zipcode;

  newSPCCPlan.facilitydescription = req.body.facilitydescription;
  newSPCCPlan.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
  newSPCCPlan.geometry.coordinates.long = req.body.geometry.coordinates.long;

  newSPCCPlan.businesstype = req.body.businesstype;
  newSPCCPlan.beghours = req.body.beghours;
  newSPCCPlan.endhours = req.body.endhours;
  newSPCCPlan.schedule = req.body.schedule;

  newSPCCPlan.security.twentyfourhours = req.body.twentyfourhours;
  newSPCCPlan.security.beghours = req.body.security.beghours;
  newSPCCPlan.security.endhours = req.body.security.endhours;
  newSPCCPlan.security.days = req.body.security.days;

  newSPCCPlan.contactinfo.name = req.body.contactinfo.name;
  newSPCCPlan.contactinfo.phonenumber = req.body.contactinfo.phonenumber;

  newSPCCPlan.loadingareaexists = req.body.loadingareaexists;

  newSPCCPlan.loadingracksexists = req.body.loadingracksexists;

  newSPCCPlan.loadingoperations.exists = req.body.loadingoperations.exists;
  newSPCCPlan.loadingoperations.specific = req.body.loadingoperations.specific;
  newSPCCPlan.loadingoperations.procedures = req.body.loadingoperations.procedures;

  newSPCCPlan.previousdischargeexists = req.body.previousdischargeexists;
  newSPCCPlan.registered = req.body.registered;
  newSPCCPlan.totalsitecapacity = req.body.totalsitecapacity;

  newSPCCPlan.drps = [];

  newSPCCPlan.save(err => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "SPCCPlan saved successfully"});
  });
});

//'/v1/spccplan - read'
api.get('/', (req, res) => {
SPCCPlan.find({}, (err, spccplans) => {
  if (err) {
    res.send(err);
  }
  res.json(spccplans);
});
});

// '/v1/spccplan/:id - get individual item'
api.get('/:id', (req, res) => {
  SPCCPlan.findById(req.params.id, (err, spccplan) => {
    if (err) {
      res.send(err);
    }
    res.json(spccplan);
  });
});

// '/v1/spccplan/:id - Put (update) an item'
api.put('/:id', (req, res) => {
  SPCCPlan.findById(req.params.id, (err, spccplan) => {
    if (err) {
      res.send(err);
    }
    spccplan.facilityname = req.body.facilityname;
    spccplan.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "SPCC Plan info updated" });
    });
  });
});

// '/v1/spccplan/:id - delete an item'
api.delete('/:id', (req, res) => {
  SPCCPlan.remove({
    _id: req.params.id
  },(err, spccplan)=> {
    if (err) {
      res.send(err);
    }
    res.json({ message: "SPCC Plan successfully removed." });
  });
});

// add DRP to spccplan
//'/v1/spccplan/drp/add/id'
api.post('/drp/add/:id', (req, res) => {
  SPCCPlan.findById(req.params.id, (err, spccplan) => {

    if (err) {
      res.send(err);
    }
    let newDRP = DrP();

    newDRP.name = req.body.name;
    newDRP.title = req.body.title;
    newDRP.phone = req.body.phone;
    newDRP.locofplan = req.body.locofplan;
    newDRP.alternate = req.body.alternate;
    newDRP.spccplan = spccplan._id;
    newDRP.save((err, newDRP) => {
      if (err) {
        res.send(err);
      }
      spccplan.drps.push(newDRP);
      spccplan.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'DRP for spccplan saved' });
      });
    });
  });
});

// get drps for a specific spccplan
// '/v1/spccplan/drp/:id'
api.get('/drp/:id', (req, res) => {
  DesignatedRP.find({spccplan: req.params.id}, (err, designatedRPs) => {
    if (err) {
      res.send(err);
    }
    res.json(designatedRPs);
  });
});

// add category to spccplan
//'/v1/spccplan/:id'
api.put('/:id', (req, res) => {
  SPCCPlan.findById(req.params.id, (err, spccplan) => {
    if (err) {
      res.send(err);
    }
    spccplan.category = req.body.id;
    spccplan.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Category added to spccplan" });
    });
  });
});

// add previousdischarge
//'/v1/spccplan/previousdischarge/add/:id'
api.post('/previousdischarge/add/:id', (req, res) => {
  SPCCPlan.findById(req.params.id, (err, spccplan) => {
    if (err) {
      res.send(err);
    }
    console.log('inside prev discharge post');
    let newPreviousDischarge = PreviousDischarge();
    console.log('getting new prev disch');
    console.log(newPreviousDischarge);


    newPreviousDischarge.properties.date = req.body.date;
    newPreviousDischarge.properties.material = req.body.material;
    newPreviousDischarge.properties.volume = req.body.volume;
    newPreviousDischarge.properties.location = req.body.location;
    newPreviousDischarge.spccplan = spccplan._id;
    newPreviousDischarge.save((err, spccplan) => {
      if (err) {
        res.send(err);
      }

      spccplan.previousdischarge.push(newPreviousDischarge);
      spccplan.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Previous Discharge info saved' });
     });
    });
  });
});

return api;

}
