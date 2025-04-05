'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { Page, Media } from '@/payload-types'

export const Hero: React.FC<Page['hero']> = ({
  headline,
  leftColumn,
  middleImage,
  rightColumn,
}) => {
  // safely cast related docs
  const leftCTA = typeof leftColumn?.cta === 'object' ? leftColumn.cta as Page : null
  const rightCTA = typeof rightColumn?.cta === 'object' ? rightColumn.cta as Page : null
  const image = typeof middleImage === 'object' ? middleImage as Media : null

  return (
    <section className="hero-section py-16">
      <div className="container mx-auto">
        {headline && <h1 className="text-4xl font-bold mb-8 text-center">{headline}</h1>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumn?.text && <p>{leftColumn.text}</p>}
            {leftCTA?.slug && (
              <Link href={`/${leftCTA.slug}`} className="text-blue-500 underline">
                Call to Action
              </Link>
            )}
          </div>

          {/* Middle Image */}
          <div className="flex justify-center items-center">
            {image?.url && (
              <Image
                src={image.url}
                alt={image.alt || 'Hero Image'}
                width={400}
                height={300}
                className="object-cover"
              />
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumn?.text && <p>{rightColumn.text}</p>}
            {rightCTA?.slug && (
              <Link href={`/${rightCTA.slug}`} className="text-blue-500 underline">
                Call to Action
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
