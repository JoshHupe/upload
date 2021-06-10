import {
  inputObjectType,
  objectType,
  mutationField,
  nonNull,
  arg,
  asNexusMethod,
} from 'nexus'
import * as fs from 'fs'
import { GraphQLUpload } from 'graphql-upload'
import { gql } from 'apollo-server-express'

export const Upload = asNexusMethod(GraphQLUpload, 'upload')

export const uploadInput = inputObjectType({
  name: 'uploadInput',
  definition(t) {
    t.nonNull.field('file', { type: Upload })
  },
})

export const UploadPayload = objectType({
  name: 'File',
  definition(t) {
    t.id('id')
    t.string('path')
    t.string('filename')
    t.string('mimetype')
    t.string('encoding')
  },
})

export const upload = mutationField('upload', {
  type: UploadPayload,
  args: {
    input: nonNull(arg({ type: uploadInput })),
  },
  resolve: async (_parent, { input: { file } }, { prisma }) => {
    // even this line is not reached
    const { createReadStream, filename, mimetype, encoding } = await file

    // save file from here
    const writable = fs.createWriteStream('./upload.txt')
    console.log('uploading file2')

    createReadStream.pipe(writable).on('finish', () => {
      return { filename, mimetype, encoding, url: '' }
    })

    return { filename, mimetype, encoding, url: '' }
  },
})
