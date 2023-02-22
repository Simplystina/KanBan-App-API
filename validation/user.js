const Joi = require('joi');



const validationSchema =  Joi.object().keys({
    fullName:  Joi.string().required().alphanum().min(5).max(30),
     password: Joi.string().required(),
     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  })

const validateRequest = async (req, res, next) => {
   try {
    await validationSchema.validateAsync(req.body);

    return next();
   } catch (error) {
      console.log(error)
      res.status(404).send({message: error.details[0].message})
   }
  };


  module.exports = validateRequest