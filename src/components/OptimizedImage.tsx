import { useState, useCallback, type ImgHTMLAttributes, type ReactNode } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  errorFallback?: ReactNode;
}

/**
 * Optimized Image Component
 * Handles image loading errors and provides fallback UI
 * Includes performance optimizations
 */
const OptimizedImage = ({
  src,
  alt,
  fallbackSrc,
  errorFallback,
  className = '',
  onError,
  ...props
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    setIsLoading(false);
    if (onError) {
      onError(e);
    }
  }, [onError]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (hasError) {
    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          onError={() => setHasError(true)}
          {...props}
        />
      );
    }

    if (errorFallback) {
      return <>{errorFallback}</>;
    }

    // Default error fallback
    return (
      <div
        className={`${className} flex items-center justify-center bg-surface border border-white/10`}
        role="img"
        aria-label={alt || 'Image failed to load'}
      >
        <div className="text-center p-4">
          <ImageOff className="w-8 h-8 text-text-muted mx-auto mb-2" />
          <p className="text-xs text-text-muted">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div
          className={`${className} absolute inset-0 bg-surface animate-pulse flex items-center justify-center`}
          aria-hidden="true"
        >
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;

