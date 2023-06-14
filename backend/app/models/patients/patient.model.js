const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('Patient', {
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  image: Joi.string(),
  dateNaissance: Joi.string(),
})
