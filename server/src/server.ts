import fastify from 'fastify'
import { tasksRoutes } from './routes/tasks'
import { tagsRoutes } from './routes/tags'
import { fastifyCors } from '@fastify/cors'

const app = fastify()
app.register(fastifyCors, {
  origin: '*',
})

app.register(tasksRoutes)
app.register(tagsRoutes)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333 🤞')
  })
