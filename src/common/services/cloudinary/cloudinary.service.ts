import { Readable } from 'node:stream'
import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async upload(file: Express.Multer.File, id: string, folder: string): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: id,
          folder: folder,
        },
        (error, result) => {
          if (error || !result) {
            reject(error)
          } else {
            const url = cloudinary.url(result.public_id, {
              quality: 'auto',
              fetch_format: 'auto',
            })

            resolve({ url })
          }
        },
      )

      const readableStream = new Readable()

      readableStream.push(file.buffer)
      readableStream.push(null)
      readableStream.pipe(uploadStream)
    })
  }
}
