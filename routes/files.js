const router = require('express').Router();
const multer = require('multer');
const path = require('path'); 
const File=require('../models/file');
const { v4: uuidv4 } = require('uuid');

//set storage configuration
let storage = multer.diskStorage({
  //set file destination
  destination: (req, file, callback) => {
    callback(null, "uploadFiles/");
  },
  //set file name
  filename: (req, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.random() * 1E8}${path.extname(file.originalname)}`
    callback(null, uniqueName);
  }
});

//multer configuration
let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single('clientFile');   //we need to enter field name which is comming from our clientSide || use name of attribute which is comming from HTML input Field

//route
router.post('/upload', (req, res) => {

  //validate request
  

  upload(req, res, async(err) => {
    //validate request
   if (!req.file) {
      res.status(409).send({ error: "Select a file" });
    }
   
    if (err) {
      return res.status(500).send({ error: err.massage })
    }
    //store data into database
    
    const fileData=new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      uuid: uuidv4(),
    })

    const uploadStatus=await fileData.save();
    return res.json({File : `${process.env.BASE_URL}/files/download/${uploadStatus.uuid}`})
})

})


// // send Email Config
// router.post('/send',async(req,res)=>{
//   const{uuid,emailTo,emailFrom}=req.body;
  
//   //request validate
//   if (!uuid||!emailTo||!emailFrom) {
//     res.status(422).send({Error:'All fields are required'})    
//   }

//   //getdata from database
//   const file=await File.findOne({uuid});
//   if (file.sender) {
//     res.status(422).send({Error:'Email already sent !'})  
//  }

//  file.sender=emailFrom;
//  file.receiver=emailTo;
//  await file.save();

// //  import mail configuration
//  const sendMail = require('../Email/emailService');
//     sendMail({
//       from: emailFrom,
//       to: emailTo,
//       subject: 'ShareByLink-file sharing',
//       text: `${emailFrom} shared a file with you.`,
//       html: require('../Email/EmailTemplate')({
//                 emailFrom, 
//                 downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}` ,
//                 size: parseInt(file.size/1000) + ' KB',
//                 expires: '24 hours'
//             })
//     }).then(() => {
//       return res.json({success: true});
//     })
// }


// )


module.exports = router;