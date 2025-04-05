import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
      {columns?.map((col, index) => {
  const {
    enableLink,
    link,
    richText,
    size,
    contentType,
    media,
    subColumnBlocks,
  } = col

  return (
    <div
      className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
        'md:col-span-2': size !== 'full',
      })}
      key={index}
    >
      {/* Main column content */}
      {contentType === 'richText' && richText && (
        <RichText data={richText} enableGutter={false} />
      )}

      {contentType === 'quote' && col.quoteText && (
        <p className="text-center text-2xl font-semibold mb-4">
          {col.quoteText}
        </p>
      )}



      {contentType === 'media' && typeof media === 'object' && (
        <Media resource={media} />
      )}

      {enableLink && <CMSLink {...link} />}

      {/* Sub Column Blocks */}
      {Array.isArray(subColumnBlocks) &&
        subColumnBlocks.map((sub, subIndex) => {
          if (sub.type === 'richText' && sub.richText) {
            return (
              <div key={subIndex} className="mt-4">
                <RichText data={sub.richText} enableGutter={false} />
              </div>
            )
          }

          if (sub.type === 'media' && typeof sub.media === 'object') {
            return (
              <div key={subIndex} className="mt-4">
                <Media resource={sub.media} />
              </div>
            )
          }

          if (sub.type === 'list' && Array.isArray(sub.list)) {
            return (
              <ul key={subIndex} className="list-disc pl-6 mt-4">
                {sub.list.map((itemObj, liIndex) => (
                  <li key={liIndex}>{itemObj.item}</li>
                ))}
              </ul>
            )
          }

          return null
        })}
    </div>
  )
})}

      </div>
    </div>
  )
}
