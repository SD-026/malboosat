import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config({})

 cloudinary.config({
    cloud_name: 'davcawbru', 
    api_key: '911717546847471', 
    api_secret:'D307orJ9bMTU7C-83cEdUSBXZU8'
})

export default cloudinary

