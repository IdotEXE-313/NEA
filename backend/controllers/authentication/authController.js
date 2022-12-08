exports.authUser = (req,res) => {
    res.send({auth: req.session.isAuth});
}