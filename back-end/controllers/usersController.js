const Users = require('../models/usersModule');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

router.get('/users', async(req, res) => {
    try{
        const sCode = req.query.sCode;
        const users = await Users.find({name: sCode, isDeliveryMan: true}).lean();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

router.post('/register', async(req, res) =>{
    console.log('enteeeeeeeeer')
        console.log('1-Data: ', req.body);

    try{
        let data = JSON.parse(JSON.stringify(req.body));

        data.password = await bcrypt.hash(data.password, 10);        
        const isThere = await Users.findOne({name: req.body.name});

        if(isThere && !data.isDeliveryMan)
            return res.status(500).json('Username already exist!!');

        const user = await Users.create(data);    
        return res.status(200).json(user);
    }
    catch(err){
        console.error('Erreur serveur :', err);
        res.status(500).json('please fill all inputs');
    }
});

/*************Login************/
router.post('/login', async(req, res) => {
    let username = req.body.name;
    const password = req.body.password;

    const user = await Users.findOne( { $or: [{name: username}, {userName: username} ]}).lean();
    console.log('user: ', user);
    if (user)
        var nameCompare = user.isDeliveryMan ? user.userName : user.name;

        if(username === nameCompare){
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(passwordMatch){
                // Generate a JWT token
                const token = jwt.sign({id: user._id, name: user.name, userName: user.userName, email: user.email, isAdmin: user.isAdmin, isDeliveryMan: user.isDeliveryMan }, 'secret', { expiresIn: '1h' });
                return res.status(200).json({ token });
            }
        }

    return res.status(500).json({ message: 'Invalid credentials' });
});

router.put('/users/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const data = {
            id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            isAdmin: req.body.isAdmin
        }

        await Users.findByIdAndUpdate(id, data);
        res.status(200).json('Update With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.delete('/users/:id', async(req, res) => {
    try{
        const {id} = req.params;
        await Users.findByIdAndDelete(id);
        res.status(200).json('Deleted With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
})


// Update user data
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            name: req.body.name,
            email: req.body.email,
            isAdmin: req.body.isAdmin
        };

        // Hash the password only if it's provided in the body
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await Users.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedUser) {
            res.status(200).json('Update successful!');
        } else {
            res.status(404).json('User not found');
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});



module.exports = router;