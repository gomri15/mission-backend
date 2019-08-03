const customInvalidJSONError = 'INVALID REQUEST'

const sendError = (res, customerErrorMessage) => {
    res.status(400).json({ message: customerErrorMessage })
}

module.exports = { customInvalidJSONError, sendError }