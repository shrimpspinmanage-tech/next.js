import { nextTestSetup } from 'e2e-utils'
import { retry } from 'next-test-utils'

// This suite inspects the local `next start` output, which deployment tests
// do not expose.
// @force-gate !deploy
describe('preloadEntriesOnStart', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('evaluates the Node.js proxy module before the first request', async () => {
    // No request is made here on purpose: the module must be loaded by the
    // server start itself.
    await retry(async () => {
      // `next.cliOutput` includes both `next build` and `next start`; only
      // look at the part after the server became ready.
      const serverLog = next.cliOutput.split('Ready in')[1] ?? ''

      expect(serverLog).toContain('proxy:module-evaluated')
    })
  })
})
