const db = require("../../database/connection");

exports.deleteSubject = async(req, res) => {

    const {FolderID, UserID} = req.body;

    const deleteSubject = async() => {
        db.query(`DELETE FROM folders
                  WHERE Folders.FolderID = ?
                  AND folders.UserID = ?`,
                  [FolderID, UserID])
            .then(() => {
                res.send({delete: true})
            })
            .catch((err) => {
                console.log(err);
                res.send({delete: false})
            })
    }
    await deleteSubject();
}