const db = require("../models");
const translate = require("../../translate.js");
const Address = db.Address;
const User = db.user;

exports.newAddr = async(req, res) => {
  
  if(!req.body.citey&&req.body.country_id){
    try{
      const Addr = new Address({
        nameEn: req.body.nameEn,
        citey: req.body.citey,
        nameAr:req.body.nameAr
      });
      await Addr.populate('country_id');
      await Addr.save();
      const resMsg = "country was created successfully!";
      res.send({message:{En:resMsg , Ar:translate(resMsg)}, country:Addr });
    }catch (err) {
      res.status(400).json({success: false, message:err.message})
   }
  }else{
    try{
      const Addr = new Address({
        nameEn: req.body.nameEn,
        citey: req.body.citey,
        nameAr:req.body.nameAr,
        country_id:req.body.country_id
      });
      await Addr.populate('country_id');
      await Addr.save();
      const resMsg = "citey was created successfully!";
      res.send({message:{En:resMsg , Ar:translate(resMsg)}, citey:Addr });
    }catch (err) {
      res.status(400).json({success: false, message:err.message})
   }
  }
      
}

exports.upAddress = async(req, res) => {
  try {
    const addr = await Address.findById({_id: req.params.id})
    
    if(addr){
      if(req.body.citey==undefined&&!req.body.country_id){
        const uptadedAddr = await Address.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true
          }
        );
        res.send(uptadedAddr);
      }else{
        const resMsg = "you can not turn the country into city or vice versa";
        res.status(500).send({En:resMsg , Ar:translate(resMsg)});
      }
      
    }else{
      throw new Error("invalid id")
    }
  }catch (err) {
    res.status(400).json({success: false, message:err.message})
 
  }
}

exports.delAddress = async(req, res) => {
  try {
    const addr = await Address.findById({_id: req.params.id})
    
    if(addr){
      if(!addr.citey){
        await Address.deleteMany({ citey: true, country_id:req.params.id });
        await User.updateMany({ country: req.params.id}, { $set: {adress: {country: null, citey: null} } });
      }
      await Address.findByIdAndDelete(req.params.id,{new:true});
      const resMsg = "Address was deleted successfully";
      res.send({En:resMsg , Ar:translate(resMsg)});
    }else{
      throw new Error("invalid id")
    }
  }catch (err) {
    res.status(400).json({success: false, message:err.message})
  }
}

exports.getCountries = async(req, res) => {
  try {
    const Countries = await  Address.find({citey:false});
    if(Countries.length>0){
      res.send(Countries);
    }else{
      const resMsg = "No Countries Found";
      res.status(404).send({En:resMsg , Ar:translate(resMsg)});
    }
    
} catch (error) {
    res.send(error);
}
}

exports.getCountriesCities = async(req, res) => {
  try {
    const Country = await  Address.findById({_id:req.params.id});
    if(!Country){
      const resMsg = "No Country Found with this Id";
      
      res.status(404).send({En:resMsg , Ar:translate(resMsg)});
    }else{
      const CountriesCities = await  Address.find({citey:true, country_id:req.params.id});
      if(CountriesCities.length>0){
        res.send(CountriesCities);
      }else{
        const resMsg = "No Cities in this Country Found";
        res.status(404).send({En:resMsg , Ar:translate(resMsg)});
      }
    }
    
} catch (error) {
    res.send(error);
}
}