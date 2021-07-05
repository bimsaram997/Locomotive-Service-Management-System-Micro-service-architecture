
const aws = require('aws-sdk');
const multer  = require('multer');
const multer3 =  require('multer-s3');
const express = require('express');
const router =  express.Router();

//----------
aws.config.update({
    secretAccessKey: 'raFmQl99V5b1cMCFyi/FJecJwDBHnAu8uSoOARXD',
    accessKeyId: 'AKIARDX7W7FD5X6JHFHU',
    acl : 'public-read',
    region: 'us-east-2'


})

//----------

//-----
const s3 = new aws.S3();
const upload =  multer({
 storage:multer3({
    s3:s3,
    bucket: 'locomotivebucket',
    metadata: function (req,resp,cb) {
        cb(null, {fieldName: 'TestingMeta'})

    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
    }
 })
}).array('image', 50 );

//-------
router.post('/saveImage', async function (req, resp) {
    try {
        upload(req, resp, function (error) {
            if(error){
                console.log(error);
                resp.status(500).json({state: 'failed', error:error})
            }else{
                //if file is not found!
                if(req.files==undefined){
                    console.log('No file selected');
                    resp.status(500).json({state: 'failed'})
                }else {
                    //if success
                    let fileArray = req.files, fileLocation;
                    const images =[];
                    for (let i = 0; i<fileArray.length; i++){
                        fileLocation = fileArray[i].location;
                        images.push(fileLocation);
                    }
                    return resp.status(200).json({
                        state: 'OK',
                        filesArray: fileArray,
                        locationArray: images
                    })
                }

            }
        })
    }catch (e) {

    }

});
module.exports = router;
