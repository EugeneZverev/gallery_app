const router = require('express').Router()
const aws = require('aws-sdk')
const verify = require('./verifyToken')

const multer = require('multer')
const upload = multer()
const uploadType = upload.single('file')

const Image = require('../model/Image')

const { v4: uuid } = require('uuid')

const { S3 } = require('aws-sdk')
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

router.get('/', verify, async (req, res) => {
    const userImages = await Image.find({ userId: req.user }).exec()

    async function getImages(array) {
        let imagesList = [] 

        for (let image of array) {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: image.imageKey
            }
            const data = await s3.getObject(params).promise()
            imagesList.push(data.Body)
        }
        
        return imagesList
    }

    getImages(userImages).then(images => res.send(JSON.stringify(images)))
})

router.post('/', verify, uploadType, (req, res) => {
    const userId = req.user._id
    const image = req.file.originalname.split('.')
    const imageType = image[image.length - 1]
    const uuidImageName = uuid()

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidImageName}.${imageType}`,
        Body: req.file.buffer
    }
    s3.upload(params, async (error, data) => {
        if (error) res.status(500).send(error)

        const imageKey = data.key
        const newImage = new Image({
            userId,
            imageKey
        })

        try {
            const savedImage = await newImage.save()
            res.send({ newImage: newImage._id })
        } catch (err) {
            res.status(400).send(err)
        }
    })
})

module.exports = router