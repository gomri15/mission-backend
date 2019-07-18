const playerService = require('../services/playerService')

let express = require("express");
let router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password

        const query = { name: username }
        const user = await playerService.find(id = null, query)

        if (user[0].name && user[0].password === password) {
            res.status(200).json({ message: "Successfull login" })
        } else {
            res.status(409).json({ message: "Username or Password are incorrect" })
        }
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;
