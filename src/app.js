const express = require('express');
const app = express();
const multer = require('multer');
require('./db/conn')
const imageSchema = require('./models/imageSchema')
const port = process.env.PORT || 1000;

app.use(express.json());

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: Storage
}).single('testImage')

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new imageSchema({
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })
            newImage.save()
                .then(() => res.send('Successfully Upload'))
                .catch((err) => console.log(err))
        }
    })
})

app.listen(port, () => {
    console.log(`The Port is Running at ${port}`)
})