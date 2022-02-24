const router = require('express').Router();
// const { response } = require('express');
const File=require('../models/file');

router.get('/:uuid', async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });
  
  //  Link expired
   if(!file) {
        return res.render('download', { error: 'Link has been expired OR not found.'});
   } 
   const response = await file.save();
   const filePath = `${__dirname}/../${file.path}`;
   res.download(filePath)
});


module.exports = router;