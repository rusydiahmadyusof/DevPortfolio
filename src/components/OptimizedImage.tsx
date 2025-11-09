import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  errorFallback?: ReactNode;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Simple Image Component with error handling
 */
const OptimizedImage = ({
  src,
  alt,
  fallbackSrc,
  errorFallback,
  className = '',
  onError,
  priority = false,
  fetchPriority = 'auto',
  loading: loadingProp,
  ...props
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

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
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      loading={loadingProp ?? (priority ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;

