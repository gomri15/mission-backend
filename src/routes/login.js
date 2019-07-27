const playerService = require('../services/playerService')

// please do not use let if you dont must too 

const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const username = req.body.username
        const { password } = req.body

        const query = { name: username }
        const [user] = await playerService.find(null, query)

        if (user.name && user.password === password) {
            res.status(200).json({ message: "Successfull login" })
        } else {
            res.status(404).json({ message: "Username or Password are incorrect" })
        }
    } catch (error) {
        console.log(error);
        // please return a response to the user
        res.sendStatus(400)
    }

});

module.exports = router;
