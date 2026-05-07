import React from 'react'
import Image from 'next/image'
import { STATIC_ASSET_URLS } from '../lib/storagePublicUrls'
import { cn } from '../lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  containerClassName?: string
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fill?: boolean
  style?: React.CSSProperties
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  fallbackSrc?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  containerClassName = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  style,
  objectFit = 'cover',
  fallbackSrc = STATIC_ASSET_URLS.logo
}) => {
  const [imgSrc, setImgSrc] = React.useState(src || fallbackSrc)
  const seoAlt = alt || 'CEUS image'
  
  // Update imgSrc if src prop changes
  React.useEffect(() => {
    if (src) setImgSrc(src)
  }, [src])

  const imageProps = {
    src: imgSrc,
    alt: seoAlt,
    priority,
    className: cn(
      "transition-all duration-300", 
      objectFit === 'cover' && "object-cover",
      objectFit === 'contain' && "object-contain",
      className
    ),
    sizes,
    quality,
    placeholder,
    blurDataURL: placeholder === 'blur' ? (blurDataURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=') : undefined,
    onError: () => setImgSrc(fallbackSrc),
    style
  }

  if (fill) {
    return (
      <div className={cn("relative w-full h-full overflow-hidden", containerClassName)}>
        <Image {...imageProps} fill />
      </div>
    )
  }

  return (
    <Image 
      {...imageProps} 
      width={width} 
      height={height} 
    />
  )
}

export default OptimizedImage
