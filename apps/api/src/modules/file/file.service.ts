import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Express } from 'express'

@Injectable()
export class FileService {
  private s3Client: S3Client
  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.get('aws.region'),
      credentials: {
        accessKeyId: configService.get('aws.accessKeyId'),
        secretAccessKey: configService.get('aws.secretAccessKey'),
      },
    })
  }

  async getUploadUrl(fileName: string) {
    try {
      const Key = this.configService.get('aws.rootPath') + fileName
      const command = new PutObjectCommand({
        Bucket: this.configService.get('aws.bucket'),
        Key,
      })
      const signed = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
        signableHeaders: new Set(''),
      })
      return {
        signedUrl: signed,
        publicUrl: this.configService.get('aws.url') + '/' + Key,
      }
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException()
    }
  }

  async postUploadFile(file: Express.Multer.File, fileName: string) {
    if (!file) throw new BadRequestException('No File Upload')
    const ext = file.originalname.split('.').at(-1)
    const fullName = fileName + '.' + ext
    try {
      const command = new PutObjectCommand({
        Bucket: this.configService.get('aws.bucket'),
        Key: this.configService.get('aws.rootPath') + fullName,
        Body: file.buffer,
      })
      await this.s3Client.send(command)
      return fullName
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException()
    }
  }

  async getDownloadUrl(fileName: string): Promise<string> {
    if (!fileName) return null
    try {
      const command = new GetObjectCommand({
        Bucket: this.configService.get('aws.bucket'),
        Key: this.configService.get('aws.rootPath') + fileName,
      })
      const signed = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
        signableHeaders: new Set(''),
      })
      return signed
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException()
    }
  }
}
