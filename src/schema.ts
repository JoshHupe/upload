import { makeSchema, core } from 'nexus'
import { join } from 'path'
import * as path from 'path'
import * as types from './types'
export const schema = makeSchema({
  types,
  features: {
    abstractTypeStrategies: {
      isTypeOf: false,
      resolveType: true,
      __typename: false,
    },
    abstractTypeRuntimeChecks: true,
  },
  outputs: {
    schema: path.join(__dirname, './schema.graphql'),
    typegen: path.join(__dirname, './generated/typegen.ts'),
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    alias: 'contextModule',
    export: 'Context',
  },
})
