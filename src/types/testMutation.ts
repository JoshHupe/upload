import { inputObjectType, objectType, mutationField, nonNull, arg } from 'nexus'

export const testInput = inputObjectType({
  name: 'testInput',
  definition(t) {
    t.nonNull.string('anything')
  },
})

export const TestPayload = objectType({
  name: 'TestPayload',
  definition(t) {
    t.boolean('done')
  },
})

export const test = mutationField('test', {
  type: TestPayload,
  args: {
    input: nonNull(arg({ type: testInput })),
  },
  resolve: async (_parent, { input: { anything } }, { prisma }) => {
    console.log(anything)
    return { done: true }
  },
})
