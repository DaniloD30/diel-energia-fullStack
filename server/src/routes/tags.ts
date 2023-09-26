import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function tagsRoutes(app: FastifyInstance) {
  app.get('/tags', async () => {
    const tags = await prisma.tag.findMany({
      include: {
        tasks: true,
      },
    })
    return tags
  })

  app.post('/tags', async (req) => {
    const bodySchema = z.object({
      title: z.string(),
    })

    const { title } = bodySchema.parse(req.body)

    const tag = await prisma.tag.create({
      data: {
        title,
      },
    })

    return tag
  })

  app.put('/tags/:idTag', async (req) => {
    const paramsSchema = z.object({
      idTag: z.string().uuid(),
    })
    const { idTag } = paramsSchema.parse(req.params)

    const task = z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      dateHour: z.string().datetime(),
      duration: z.string().datetime(),
    })

    const bodySchema = z.object({
      title: z.string(),
      tasks: z.array(task),
    })

    const { title, tasks } = bodySchema.parse(req.body)

    let tagEdit = await prisma.tag.findUniqueOrThrow({
      where: {
        id: idTag,
      },
    })

    tagEdit = await prisma.tag.update({
      where: {
        id: idTag,
      },
      data: {
        title,
        tasks: {
          set: tasks.map((task) => ({
            id: task.id,
            title: task.title,
            duration: task.duration,
            description: task.description,
            dateHour: task.dateHour,
          })),
        },
      },
    })
    return tagEdit
  })

  app.delete('/tags/:idTag', async (req) => {
    const paramsSchema = z.object({
      idTag: z.string().uuid(),
    })
    const { idTag } = paramsSchema.parse(req.params)

    await prisma.tag.delete({
      where: {
        id: idTag,
      },
    })
  })
}
