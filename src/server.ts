import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaught Exception', err => {
  console.log('Uncaught exception is detected.')
  errorlogger.error(err)
  process.exit()
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connected successfully')

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database : ', err)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection is detected. we are closing our server.')
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
