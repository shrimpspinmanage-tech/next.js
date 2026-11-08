import { NextResponse } from 'next/server'

// Logged when the proxy module is evaluated, not when it handles a request.
console.log('proxy:module-evaluated')

export function proxy() {
  return NextResponse.next()
}
