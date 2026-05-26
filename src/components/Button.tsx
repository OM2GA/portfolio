import React from 'react';
import { Loader2 } from 'lucide-react';
import './Button.css';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  className = '',
  target,
  rel,
  ...props
}: ButtonProps) {
  // Combine CSS classes dynamically
  const baseClass = 'custom-btn';
  const variantClass = `${baseClass}-${variant}`;
  const sizeClass = `${baseClass}-${size}`;
  const loadingClass = loading ? 'is-loading' : '';
  const combinedClasses =
    `${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${className}`.trim();

  // If loading is active, disable standard click and interaction
  const isCurrentlyDisabled = disabled || loading;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (isCurrentlyDisabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  // Render spinner when in loading state
  const renderLoadingSpinner = () => (
    <Loader2 size={16} className="btn-spinner" aria-hidden="true" />
  );

  const content = (
    <>
      {loading && renderLoadingSpinner()}
      {!loading && leftIcon && <span className="btn-icon btn-icon-left">{leftIcon}</span>}
      <span className="btn-text">{children}</span>
      {!loading && rightIcon && <span className="btn-icon btn-icon-right">{rightIcon}</span>}
    </>
  );

  // If href is specified, render as anchor link
  if (href) {
    // If a link is disabled, we remove href to make it unfocusable and unclickable
    const linkHref = isCurrentlyDisabled ? undefined : href;
    const accessibilityRole = isCurrentlyDisabled ? undefined : 'link';

    return (
      <a
        href={linkHref}
        className={combinedClasses}
        onClick={handleClick}
        target={target}
        rel={target === '_blank' && !rel ? 'noopener noreferrer' : rel}
        role={accessibilityRole}
        aria-disabled={isCurrentlyDisabled ? true : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  // Otherwise, render as a standard HTML button
  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={handleClick}
      disabled={isCurrentlyDisabled}
      aria-busy={loading ? true : undefined}
      {...props}
    >
      {content}
    </button>
  );
}
