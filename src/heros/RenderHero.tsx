import React from 'react'
import type { Page } from '@/payload-types'
import { Hero } from '.'

export const RenderHero: React.FC<Page['hero']> = (props) => {
  if (!props) return null
  return <Hero {...props} />
}
