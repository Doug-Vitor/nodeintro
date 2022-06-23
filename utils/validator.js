module.exports= {
    user:(app, validationResult, request, result) => {
        let errors = validationResult(request).formatWith(({msg})=>msg);
        if (errors.isEmpty()) return true
        else {
            app.utils.error.send(errors, request, result)
            return false;
        }
    }
}