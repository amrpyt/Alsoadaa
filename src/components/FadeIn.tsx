import { useEffect, useRef, useState } from 'react';
import { cn } from './ui/utils';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    fullWidth?: boolean;
}

export function FadeIn({
    children,
    className,
    delay = 0,
    direction = 'up',
    fullWidth = false
}: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const getDirectionClasses = () => {
        switch (direction) {
            case 'up':
                return 'translate-y-8';
            case 'down':
                return '-translate-y-8';
            case 'left':
                return 'translate-x-8';
            case 'right':
                return '-translate-x-8';
            case 'none':
                return '';
            default:
                return 'translate-y-8';
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getDirectionClasses()}`,
                fullWidth ? 'w-full' : '',
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
