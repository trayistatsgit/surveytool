import React from 'react';
import './Pagination.scss';

interface PaginationProps {
	Count: number; // Number of total pages
	currentPage: number; // Current active page
	setCurrentpage: (page: number) => void; // Setter function for current page
}

const Pagination: React.FC<PaginationProps> = ({ Count, currentPage, setCurrentpage }) => {
	// Calculate the range of pages to display
	const maxVisiblePages = 5;
	let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
	const endPage = Math.min(Count, startPage + maxVisiblePages - 1);

	// Adjust startPage if endPage is less than maxVisiblePages
	if (endPage - startPage < maxVisiblePages - 1) {
		startPage = Math.max(1, endPage - maxVisiblePages + 1);
	}

	// Create an array with page numbers within the calculated range
	const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

	return (
		<div className='pagination'>
			{/* Previous Page Button */}
			<a
				href='#'
				onClick={(e) => {
					e.preventDefault();
					if (currentPage > 1) {
						setCurrentpage(currentPage - 1);
					}
				}}>
				&laquo;
			</a>

			{/* Map through the calculated page numbers */}
			{pages.map((page) => (
				<a
					key={page}
					href='#'
					className={page === currentPage ? 'active' : ''}
					onClick={(e) => {
						e.preventDefault();
						setCurrentpage(page);
					}}>
					{page}
				</a>
			))}

			{/* Next Page Button */}
			<a
				href='#'
				onClick={(e) => {
					e.preventDefault();
					if (currentPage < Count) {
						setCurrentpage(currentPage + 1);
					}
				}}>
				&raquo;
			</a>
		</div>
	);
};

export default Pagination;
