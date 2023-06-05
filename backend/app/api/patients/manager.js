const {Patient} = require('../../models')


const BuildPatient = (patientId) => {
    const patient = Patient.getById(patientId)
    const configuration = filterConfiguration(patient.id)
    return {...patient, configuration}

    const buildPatient = () => {
        const patient = Patient.get()
        return patient.map((config) => buildPatient(patient.id))
    }
}