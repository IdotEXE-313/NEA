//if isAuth exists, then the user must be logged in (this is added when the user logs in)
exports.authUser = (req,res) => {
    if(req.session.isAuth){
        res.send({auth: true});
    }
    else{
        res.send({auth: false});
    }
}