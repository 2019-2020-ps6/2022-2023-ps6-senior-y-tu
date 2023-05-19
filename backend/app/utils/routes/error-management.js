const manageAllErrors = (res, err) => {
  if (err.name === 'ValidationError') {
    res.status(400).json(err.extra)
  } else if (err.name === 'NotFoundError') {
    res.status(404).end()
  } else {
    res.status(500).json(err)
  }
}

module.exports = manageAllErrors
