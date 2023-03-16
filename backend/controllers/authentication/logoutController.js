exports.logoutUser = async(req, res) => {
    await req.session.destroy((err) => {
        if(!err){
            res.send({loggedOut: true});
        }
    })
}