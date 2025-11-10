import { PortableText as PortableTextReact } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '../lib/sanity'

// Custom components for rendering Portable Text blocks
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8" style={{ color: 'var(--gray-900)' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-6" style={{ color: 'var(--gray-900)' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-4" style={{ color: 'var(--gray-900)' }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 mt-3" style={{ color: 'var(--gray-900)' }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg mb-4 leading-relaxed" style={{ color: 'var(--gray-700)' }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote 
        className="border-l-4 pl-4 py-2 my-4 italic"
        style={{ 
          borderColor: 'var(--citrus-orange)',
          color: 'var(--gray-600)'
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2" style={{ color: 'var(--gray-700)' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2" style={{ color: 'var(--gray-700)' }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-[var(--citrus-orange)] hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      
      return (
        <figure className="my-6">
          <img
            src={urlFor(value).width(800).url() || ''}
            alt={value.alt || ''}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value.caption && (
            <figcaption 
              className="text-sm text-center mt-2 italic"
              style={{ color: 'var(--gray-600)' }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

interface PortableTextProps {
  value: any
  className?: string
}

export function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) return null
  
  return (
    <div className={`portable-text ${className}`}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
}
