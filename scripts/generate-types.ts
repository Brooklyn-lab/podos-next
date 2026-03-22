import config from '../payload.config.js'
import { getPayload } from 'payload'

async function main() {
  const payload = await getPayload({ config })
  const { generateTypes } = await import('payload/node')
  await generateTypes(payload.config)
  console.log('Done!')
  await payload.db.destroy()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
