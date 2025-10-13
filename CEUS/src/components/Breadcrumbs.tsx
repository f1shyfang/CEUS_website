import React from 'react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            
            {item.current ? (
              <span
                className="text-gray-900 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Predefined breadcrumb configurations
export const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const baseItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ]

  switch (pathname) {
    case '/':
      return [{ label: 'Home', current: true }]
    
    case '/about':
      return [
        ...baseItems,
        { label: 'About', current: true }
      ]
    
    case '/events':
      return [
        ...baseItems,
        { label: 'Events', current: true }
      ]
    
    case '/team':
      return [
        ...baseItems,
        { label: 'Team', current: true }
      ]
    
    case '/sponsors':
      return [
        ...baseItems,
        { label: 'Sponsors', current: true }
      ]
    
    case '/contact':
      return [
        ...baseItems,
        { label: 'Contact', current: true }
      ]
    
    case '/publications':
      return [
        ...baseItems,
        { label: 'Publications', current: true }
      ]
    
    default:
      return baseItems
  }
}

export default Breadcrumbs
