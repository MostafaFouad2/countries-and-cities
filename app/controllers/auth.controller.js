
const db = require("../models");
const User = db.user;
const Address = db.Address;

exports.signup = async(req, res) => {
  try{
    if(!req.body.username||!req.body.country||!req.body.citey){
      res.status(500).send("All fields are required")
    }else{
      const user = await  User.findOne({username: req.body.username});
    if(user){
      res.status(500).send("this name is exist")
    }else{
      const country = await  Address.findOne({_id: req.body.country, citey:false})
      if(!country){
        res.status(500).send("this country id is NOT exist")
      }else{
        const citey = await  Address.findOne({_id: req.body.citey, citey:true, country_id:req.body.country})
        const cities = await  Address.findOne({citey:true, country_id:req.body.country})
        if(!citey){
          res.status(500).send({message: "this citey is NOT exist in this country Pleaze choose one of this ", cities:cities})
        }else{
            const user = new User({
              username: req.body.username,
              adress: {
                country:req.body.country,
                citey:req.body.citey
              }
            });
            user.save((err, user) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }else{
                  res.send({ message: `User ${user.username} was registered successfully!` });
              }
            });
        }
      }
    }
    }
  }catch (err) {
       res.send(err);
    }
  
};

exports.upUser = async(req, res) => {
  try {
    const user = await User.findById({_id: req.params.id})
    if(user){
      const uptadedUser ={};
      if(req.body.username){
        uptadedUser.username = req.body.username;
      }
      
      if(req.body.country){
        uptadedUser.adress={};
        const country = await  Address.findOne({_id: req.body.country, citey:false})
        if(!country){
          res.status(500).send("this country id is NOT exist")
        }else{
          uptadedUser.adress.country=req.body.country;
          if(req.body.citey){
            const citey = await  Address.findOne({_id: req.body.citey, citey:true, country_id:req.body.country})
            const cities = await  Address.findOne({citey:true, country_id:req.body.country})
            if(!citey){
              res.status(500).send({message: "this citey is NOT exist in this country Pleaze choose one of this ", cities:cities})
            }else{
              uptadedUser.adress.citey=req.body.citey;
            }
          }
        }
      }
      if(!req.body.country&&req.body.citey){
        uptadedUser.adress={};
        const citey = await  Address.findOne({_id: req.body.citey, citey:true, country_id:user.adress.country})
        const cities = await  Address.findOne({citey:true, country_id:user.adress.country})
        if(!citey){
          res.status(500).send({message: "this citey is NOT exist in this country Pleaze choose one of this ", cities:cities})
        }else{
          uptadedUser.adress.citey=req.body.citey;
        }

      }
      const uptaded = await User.findOneAndUpdate(
        { _id: req.params.id },
        uptadedUser,
        {
          new: true
        }
      );
      res.send(uptaded);
    }else{
      throw new Error("invalid user id ")
    }
  }catch (err) {
    res.status(400).json({success: false, message:err.message})
 
  }

};




