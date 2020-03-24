const { Router } = require('express');
const router = Router();
const path = require('path');
const {unlink} = require('fs-extra');

const Image = require('../models/image');


router.get('/', async (req,res) => {
    const images = await Image.find();
    res.render('index', {images});
});

router.get('/upload', (req,res) => {
    res.render('upload');
});

router.post('/upload', async (req,res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/'+ req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    image.created_at = req.file.created_at;

    await image.save();

    /* console.log(image);//ver en consola los datos
    console.log(req.file); */
    res.redirect('/');
});

router.get('/image/:id', async (req,res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    console.log(image);
    res.render('profile',{ image });
});

router.get('/image/:id/delete', async (req,res) => {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public/' + image.path))
    res.redirect('/');
});

module.exports = router;