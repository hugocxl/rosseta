// Dependencies
import { cac } from 'cac'
import { extractAndWrite } from '@rosseta/extractor'
import { logger } from '@rosseta/logger'
import { runtime } from '@rosseta/node'
import pkg from '../package.json'
import updateNotifier from 'update-notifier'

export async function main() {
  updateNotifier({ pkg, distTag: 'latest' }).notify()

  const cwd = runtime.cwd()
  const cli = cac('rosseta')

  cli
    .command('extract', "Initialize the rosseta's extraction")
    .action(async () => {
      const done = logger.time.info('✨ Rosseta extraction')

      logger.info('cli', `Rosseta v${pkg.version}\n`)
      logger.info('cli', `Rosseta v${cwd}\n`)

      extractAndWrite(
        [
          '/Users/hugocxl/repos/rosseta/extract-demo/test1.tsx',
          '/Users/hugocxl/repos/rosseta/extract-demo/test2.tsx'
        ],
        {
          outFile: runtime.path.resolve(cwd, 'output.ts')
        }
      )

      done()
    })

  cli.help()
  cli.version(pkg.version)
  cli.parse(process.argv, { run: false })

  try {
    await cli.runMatchedCommand()
  } catch (error) {
    logger.error('cli', error)

    if (logger.isDebug) {
      console.error(error)
    }

    process.exit(1)
  }
}
