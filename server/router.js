const express = require('express');
const router = express.Router();
const content = require('./Modals/content')
const mainData = require('./Modals/mainData')
const verify = require('./Modals/verify')
const {schemaChat} = require('./joiSchemaChat')
const {schemaVerify} = require('./joiSchemaVerify')
const {schemaMain} = require('./joiSchemaMain')
const {connectDB} = require('./db')
require('dotenv').config()
connectDB()


function validateInput(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
}


function errorHandler(err, req, res, next) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: 'Internal Server Error' });
}

async function updateDocument(Model, id, updateData, res) {
    try {
        const updatedDocument = await Model.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if (!updatedDocument) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json(updatedDocument);
    } catch (error) {
        next(error); 
    }
}

router.get('/contents', async (req, res, next) => {
    try {
        const data = await content.find();
        res.send(data);
    } catch (error) {
        next(error);
    }
});

router.get('/mainDatas', async (req, res, next) => {
    try {
        const data = await mainData.find();
        res.send(data);
    } catch (error) {
        next(error);
    }
});

router.get('/verifys', async (req, res, next) => {
    try {
        const data = await verify.find();
        res.send(data);
    } catch (error) {
        next(error);
    }
});


router.post('/contents', validateInput(schemaChat), async (req, res, next) => {
    try {
        const newPost = new content(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
});

router.post('/verifys', validateInput(schemaVerify), async (req, res, next) => {
    try {
        const newPost = new verify(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
});

router.post('/mainDatas', validateInput(schemaMain), async (req, res, next) => {
    try {
        const newPost = new mainData(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
});


router.put('/contents/:id', validateInput(schemaChat), async (req, res, next) => {
    updateDocument(content, req.params.id, req.body, res, next);
});

router.put('/verifys/:id', validateInput(schemaVerify), async (req, res, next) => {
    updateDocument(verify, req.params.id, req.body, res, next);
});

router.put('/mainDatas/:id', validateInput(schemaMain), async (req, res, next) => {
    updateDocument(mainData, req.params.id, req.body, res, next);
});



router.use(errorHandler);

module.exports = router;