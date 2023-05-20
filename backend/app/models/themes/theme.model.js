const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('Theme', {
  nom: Joi.string().required(),
  image: Joi.string(),
})
