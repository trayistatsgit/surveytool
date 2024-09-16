import { useRef, useState, useEffect } from 'react';

const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

const useStickyNavbar = (wait: number) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			if (scrollContainerRef.current) {
				const scrolled = scrollContainerRef.current.scrollTop >= 1;
				if (scrolled !== isScrolled) {
					setIsScrolled(scrolled);
				}
			}
		};

		const debouncedHandleScroll = debounce(handleScroll, wait);

		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('scroll', debouncedHandleScroll);
		}

		return () => {
			if (container) {
				container.removeEventListener('scroll', debouncedHandleScroll);
			}
		};
	}, [isScrolled, wait]);

	return { scrollContainerRef, isScrolled };
};

export default useStickyNavbar;
