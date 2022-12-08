exports.authUser = (req,res) => {
    if(req.session.isAuth){
        res.send({auth: true});
    }
    else{
        res.send({auth: false});
    }
}