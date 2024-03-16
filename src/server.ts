import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'
import { Server } from 'http'

async function main() {
  let server: Server
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
