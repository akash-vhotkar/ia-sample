const SERVER_ERROR = { type: 'SERVER_ERROR', message: 'Something went wrong!' }

const handler = (res, data, error) => {
    console.log(error)
    if (data.code == 500) {
        return res.status(500).json(SERVER_ERROR);
    }
    return res.status(data.code).json(data)
}

module.exports = { handler }
