const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('Configuration', {
  souris: Joi.string().required(),
  police: Joi.number().required(),
  explication: Joi.string().required(),
  handicap: Joi.string().required(),
  idPatient: Joi.string(),
})
