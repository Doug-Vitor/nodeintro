module.exports = {
    send: (error, request, result, code = 400) => {
        console.log(`Error: ${error}`);
        result.status(code).json({
            error
        })
    }
}