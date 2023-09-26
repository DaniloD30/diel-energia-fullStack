import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/tasks/:title', async (req) => {
    const paramsSchema = z.object({
      title: z.string(),
    })

    const { title } = paramsSchema.parse(req.params)

    const tasks = await prisma.task.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        tags: true,
      },
    })
    return tasks
  })
  app.get('/tasks/tag', async (req) => {
    const bodySchema = z.object({
      title: z.string(),
      taskId: z.array(z.string()).optional(),
      taskIdString: z.string().optional(),
    })
    console.log('req.query', req.query)
    const { taskId, title } = bodySchema.parse(req.query)
    const tasks = await prisma.task.findMany({
      where: {
        AND: [
          {
            tags: {
              some: {
                id: {
                  in: taskId?.map((item) => item),
                },
              },
            },
          },
          {
            AND: [
              {
                title: {
                  contains: title,
                },
              },
            ],
          },
        ],
      },
      include: {
        tags: true,
      },
    })

    return tasks
  })
  app.get('/tasks', async () => {
    const tasks = await prisma.task.findMany({
      include: {
        tags: true,
      },
    })
    return tasks
  })

  app.post('/tasks', async (req) => {
    const tag = z.object({
      id: z.string().uuid(),
      title: z.string(),
    })

    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      dateHour: z.string().datetime(),
      duration: z.string().datetime(),
      tags: z.array(tag),
    })

    const { title, description, dateHour, duration, tags } = bodySchema.parse(
      req.body,
    )
    console.log('tags', tags)

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dateHour,
        duration,
        tags: {
          create: tags.map((tagId) => ({ title: tagId.title })),
        },
      },
      include: {
        tags: true,
      },
    })

    return task
  })

  app.put('/tasks/:idTask', async (req) => {
    const paramsSchema = z.object({
      idTask: z.string().uuid(),
    })

    const { idTask } = paramsSchema.parse(req.params)

    const tag = z.object({
      id: z.string(),
      title: z.string(),
    })

    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      dateHour: z.string().datetime(),
      duration: z.string().datetime(),
      tags: z.array(tag),
    })
    const { title, description, dateHour, duration, tags } = bodySchema.parse(
      req.body,
    )

    let task = await prisma.task.findUniqueOrThrow({
      where: {
        id: idTask,
      },
    })

    task = await prisma.task.update({
      where: {
        id: idTask,
      },
      data: {
        title,
        description,
        dateHour,
        duration,
        tags: {
          set: tags.map((tagId) => ({ id: tagId.id, title: tagId.title })),
        },
      },
      include: {
        tags: true,
      },
    })

    return task
  })

  app.delete('/tasks/:idTask', async (req) => {
    const paramsSchema = z.object({
      idTask: z.string().uuid(),
    })
    const { idTask } = paramsSchema.parse(req.params)

    await prisma.task.delete({
      where: {
        id: idTask,
      },
    })
  })
}
