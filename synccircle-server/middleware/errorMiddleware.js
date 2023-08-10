const errorHandler = (err,res) => {
    const statusCode = res.statusCode ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: err.stack,
    })
}

module.exports = errorHandler;