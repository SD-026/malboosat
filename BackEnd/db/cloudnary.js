import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config({})

 cloudinary.config({
    cloud_name: 'davcawbru', 
    api_key: '462573635967489', 
    api_secret:'9JV7BV-xFHN_NH6INpQIhPQMQS4'
})

export default cloudinary

