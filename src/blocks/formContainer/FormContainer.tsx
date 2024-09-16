// import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
// import { textColors, fontWeights, fontSizes, Typography } from '../../blocks/index';
// import { polygon } from '../../assets/dropdown/index';
// import './FormContainer.scss';
// import { upArrow, downArrow } from '../../assets/common-image/index';
// import { cancel, tick } from '../../assets/myProfile/index';

// // TextInput Component
// interface InputProps {
// 	label?: string;
// 	className?: string;
// 	placeholder?: string;
// 	width?: string;
// 	height?: string;
// 	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
// 	value?: string;
// 	type?: string;
// 	disable?: boolean;
// 	fontSize?: string;
// 	typoColor?: keyof typeof textColors;
// 	typoWeight?: keyof typeof fontWeights;
// 	typoSize?: keyof typeof fontSizes;
// 	name?: string;
// 	isActive: boolean; // New prop to determine if the input is active
// 	onActivate?: (id: number) => void; // Function to activate the input
// 	id: number;
// 	datepicker?: boolean;
// }

// export const Input: React.FC<InputProps> = ({
// 	label,
// 	placeholder,
// 	width = '',
// 	height = '',
// 	onChange,
// 	value,
// 	disable = false,
// 	name = '',
// 	isActive,
// 	onActivate,
// 	datepicker = false,
// 	id, // Add the id prop
// }) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const dateInputRef = useRef<HTMLInputElement>(null);

// 	useEffect(() => {
// 		setIsOpen(isActive);
// 	}, [isActive]);

// 	const handleClick = () => {
// 		if (datepicker && dateInputRef.current) {
// 			dateInputRef.current.showPicker();
// 		}
// 	};
// 	const handleToggle = () => {
// 		if (onActivate) {
// 			onActivate(id); // Pass the id to onActivate
// 		}
// 		setIsOpen((prev) => !prev); // Toggle the open state
// 	};

// 	return (
// 		<div>
// 			<div className={isActive && isOpen ? 'question-text' : 'inactive-question'} onClick={handleToggle}>
// 				<Typography className='' isSpan={true} label={label} fontSize='fontSize14' fontWeight={isActive && isOpen ? 'bold' : 'regular'} textColor='black' />
// 				{/* {isActive && isOpen ? <img src={upArrow} alt='' /> : <img src={downArrow} alt='' className='normalArrow-img' />} */}
// 				{value ? <img src={tick} alt='tick' className='tick-image' /> : isActive && isOpen ? <img src={upArrow} alt='' /> : <img src={downArrow} alt='' className='normalArrow-img' />}
// 			</div>
// 			{isOpen && (
// 				<div className='input-wrapper'>
// 					<input
// 						type={datepicker ? 'date' : 'text'}
// 						placeholder={placeholder}
// 						className='question-input-field'
// 						onChange={onChange}
// 						value={value}
// 						disabled={disable}
// 						style={{
// 							width,
// 							height,
// 						}}
// 						ref={dateInputRef}
// 						onClick={handleClick}
// 						name={name}
// 					/>
// 				</div>
// 			)}
// 			<hr className='question-hr' />
// 		</div>
// 	);
// };

// // Dropdown Component
// interface DropdownProps {
// 	label?: string;
// 	options?: any;
// 	className?: string;
// 	imageUrl?: string;
// 	typoColor?: keyof typeof textColors;
// 	typoWeight?: keyof typeof fontWeights;
// 	typoSize?: keyof typeof fontSizes;
// 	name?: string;
// 	signup?: boolean;
// 	onSelect?: any;
// 	setSelectedData?: any;
// 	currentPage?: number;
// 	error?: boolean;
// 	isActive: boolean; // New prop to determine if the question is active
// 	onActivate?: (id: number) => void;
// 	id: number;
// 	isVisible?: boolean;
// }
// export const Dropdown: React.FC<DropdownProps> = ({ onSelect, options, label, currentPage, isActive, onActivate, id, isVisible }) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [dropdownVisible, setDropdownVisible] = useState(false);
// 	const [selectedOption, setSelectedOption] = useState<string | undefined>('');
// 	const [filterText, setFilterText] = useState('');
// 	const dropdownRef = useRef<HTMLDivElement>(null);
// 	const dropdownButtonRef = useRef<HTMLButtonElement>(null);
// 	const [optionMaxHeight, setOptionMaxHeight] = useState<number | undefined>(undefined);
// 	const [openDropdown, setOpenDropdown] = useState<'up' | 'down'>('down');
// 	const [dropdownMaxHeight, setDropdownMaxHeight] = useState<number | undefined>(undefined);

// 	const toggleDropdownVisibility = () => {
// 		setDropdownVisible(!dropdownVisible);
// 	};

// 	useEffect(() => {
// 		if (options) {
// 			const selected = options.options.find((option: any) => option.isChecked === 1);
// 			if (selected) {
// 				setSelectedOption(selected.optionText);
// 			} else {
// 				setSelectedOption('');
// 			}
// 		}
// 	}, [options, currentPage]);

// 	useEffect(() => {
// 		if (isActive) {
// 			setIsOpen(true);
// 		} else {
// 			setIsOpen(false);
// 		}
// 	}, [isActive]);

// 	const handleSelect = (option: any) => {
// 		if (!options) return;
// 		const updatedOptions = options.options.map((opt: any) => {
// 			if (opt.id === option.id) {
// 				return { ...opt, isChecked: 1 };
// 			}
// 			return { ...opt, isChecked: 0 };
// 		});

// 		const selectedOptionData = {
// 			questionId: options.id,
// 			optionId: option.id,
// 			categoryId: options.categoryId,
// 			questionType: options.questionType,
// 			demoId: options.demoId,
// 			langId: options.langCode,
// 		};

// 		setSelectedOption(option.optionText);
// 		const data = {
// 			question: { ...options, options: updatedOptions },
// 			selectedOption: selectedOptionData,
// 		};

// 		if (onSelect) {
// 			onSelect(data);
// 		}
// 		setDropdownVisible(false);
// 	};

// 	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setFilterText(e.target.value);
// 	};

// 	const handleToggle = () => {
// 		if (onActivate) {
// 			onActivate(id);
// 		}
// 		setIsOpen((prev) => !prev);
// 	};

// 	const filteredOptions = options?.options?.filter((option: any) => option.optionText.toLowerCase().includes(filterText.toLowerCase()));

// 	const handleClickOutside = (event: MouseEvent) => {
// 		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// 			setDropdownVisible(false);
// 		}
// 	};

// 	useEffect(() => {
// 		document.addEventListener('mousedown', handleClickOutside);
// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside);
// 		};
// 	}, []);

// 	useLayoutEffect(() => {
// 		const calculateDropdownPosition = () => {
// 			if (dropdownButtonRef.current && dropdownRef.current) {
// 				const dropdownButton = dropdownButtonRef.current;
// 				const windowHeight = window.innerHeight;
// 				const dropdownButtonRect = dropdownButton.getBoundingClientRect();
// 				const heightAbove = dropdownButtonRect.top;
// 				const heightBelow = windowHeight - dropdownButtonRect.bottom;
// 				// const dropdownContentHeight = dropdownRef.current.scrollHeight;
// 				// && (!(dropdownContentHeight < heightBelow) || dropdownContentHeight == 119 || dropdownContentHeight == 136)
// 				if (heightAbove > heightBelow) {
// 					setOpenDropdown('up');
// 					const maxHeight = windowHeight - heightBelow - 150;
// 					const optionHeight = windowHeight - heightBelow - 210;
// 					setOptionMaxHeight(optionHeight);
// 					setDropdownMaxHeight(maxHeight);
// 				} else {
// 					setOpenDropdown('down');
// 					const maxHeight = windowHeight - heightAbove - 150;
// 					const optionHeight = windowHeight - heightAbove - 210;
// 					setDropdownMaxHeight(maxHeight);
// 					setOptionMaxHeight(optionHeight);
// 				}
// 			}
// 		};

// 		if (dropdownVisible) {
// 			calculateDropdownPosition();
// 			window.addEventListener('resize', calculateDropdownPosition);
// 		}

// 		return () => {
// 			window.removeEventListener('resize', calculateDropdownPosition);
// 		};
// 	}, [dropdownVisible]);

// 	// Apply dynamic styles based on dropdown position
// 	const dropdownContentStyle: React.CSSProperties = {
// 		maxHeight: dropdownMaxHeight,
// 		overflowY: 'hidden',
// 		position: 'absolute',
// 		zIndex: 1000,
// 	};
// 	const dropdownOptionStyle: React.CSSProperties = {
// 		maxHeight: optionMaxHeight,
// 		overflowY: 'auto',
// 		position: 'relative',
// 		zIndex: 1000,
// 	};

// 	return (
// 		<div ref={dropdownRef}>
// 			<div className={isActive && isOpen ? 'question-text' : 'inactive-question'} onClick={handleToggle}>
// 				<Typography isSpan={true} label={label} fontSize='fontSize14' fontWeight={isActive && isOpen ? 'bold' : 'regular'} textColor='black' />
// 				{selectedOption ? <img src={tick} alt='tick' className='tick-image' /> : isActive && isOpen ? <img src={upArrow} alt='' /> : <img src={downArrow} alt='' className='normalArrow-img' />}
// 			</div>
// 			{isOpen && (
// 				<div className='new-dropdown-div'>
// 					<button className='new-dropdown-button' onClick={toggleDropdownVisibility} ref={dropdownButtonRef}>
// 						<span className={selectedOption ? 'selected-option' : 'placeholder'}>{selectedOption ? selectedOption : 'Please select an option'}</span>
// 						<img className={isVisible ? 'dropdown-image-true' : 'dropdown-image-arrow'} src={polygon} alt='dropdown arrow' />
// 					</button>
// 					{dropdownVisible && (
// 						<div className={`${isVisible ? 'survey-parent-multiselect' : openDropdown === 'up' ? 'dropdown-up-open' : 'parent-multiselect'}`} style={dropdownContentStyle}>
// 							{/* // <div className={isVisible ? 'parent-multiselect' : 'survey-parent-multiselect'} style={dropdownContentStyle}> */}
// 							{openDropdown === 'down' && (
// 								<div className='search-div-profile'>
// 									<input type='text' placeholder='Search Here...' value={filterText} onChange={handleFilterChange} className={isVisible ? 'isVisible-dropdown-search' : 'dropdown-search'} />
// 								</div>
// 							)}
// 							{filteredOptions.length > 0 && openDropdown != 'up' ? <hr className='select-all-question-hr' /> : ''}
// 							<div className={`new-dropdown-content-dropdown ${filteredOptions.length === 0 ? 'no-option-found-container' : ''}`} style={dropdownOptionStyle}>
// 								{filteredOptions.length > 0 ? (
// 									filteredOptions.map((option: any) => (
// 										<div key={option.id} onClick={() => handleSelect(option)} className={option.isChecked ? 'new-dropdown-option new-dropdown-option-active' : 'new-dropdown-option'}>
// 											{option.optionText}
// 										</div>
// 									))
// 								) : (
// 									<div className='no-option-found'>No options found for "{filterText}"</div>
// 								)}
// 							</div>
// 							{openDropdown === 'up' && (
// 								<div>
// 									{filteredOptions.length > 0 && <hr className='select-all-question-hr' />}
// 									<div className='search-div-profile'>
// 										<input type='text' className='dropdown-search' placeholder='Search' value={filterText} onChange={handleFilterChange} />
// 									</div>
// 								</div>
// 							)}
// 						</div>
// 					)}
// 				</div>
// 			)}
// 			<hr className='question-hr'></hr>
// 		</div>
// 	);
// };

// // MultiSelect Component
// interface Option {
// 	id: number;
// 	optionText: string;
// 	isChecked: number;
// 	isPrefer: number;
// 	disabled: boolean;
// }

// interface Options {
// 	id: number;
// 	options: Option[];
// 	categoryId: number;
// 	questionType: number;
// 	demoId: number;
// 	langCode: number;
// }

// interface MultiSelectProps {
// 	onSelect: (data: any) => void;
// 	options: Options;
// 	label: string;
// 	currentPage: number;
// 	isActive: boolean;
// 	onActivate: (id: number) => void;
// 	id: number;
// }

// export const MultiSelect: React.FC<MultiSelectProps> = ({ onSelect, options, label, isActive, onActivate, id }) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [multiselectVisible, setMultiselectVisible] = useState(false);
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const dropdownRef = useRef<HTMLDivElement>(null);
// 	const dropdownButtonRef = useRef<HTMLButtonElement>(null);
// 	const [dropdownMaxHeight, setDropdownMaxHeight] = useState<number | undefined>(undefined);
// 	const [optionMaxHeight, setOptionMaxHeight] = useState<number | undefined>(undefined);
// 	const [openDropdown, setOpenDropdown] = useState<'up' | 'down'>('down');
// 	// const [selectAllChecked, setSelectAllChecked] = useState(false);
// 	useEffect(() => {
// 		setIsOpen(isActive);
// 	}, [isActive]);

// 	// useEffect(() => {
// 	// 	const allSelected = options.options.every((opt: Option) => opt.isChecked === 1);
// 	// 	setSelectAllChecked(allSelected);
// 	// }, [options]);
// 	const handleSelect = (option: Option) => {
// 		const updatedOptions = options.options.map((opt: Option) => {
// 			if (opt.id === option.id) {
// 				return { ...opt, isChecked: opt.isChecked === 1 ? 0 : 1 };
// 			}
// 			return opt;
// 		});
// 		const updatedData = updatedOptions.map((item) => {
// 			const hasPreferredSelected = updatedOptions.some((option) => option.isChecked === 1 && option.isPrefer === 1);
// 			return hasPreferredSelected ? (item.isChecked === 1 && item.isPrefer === 1 ? { ...item, disabled: false } : { ...item, disabled: true, isChecked: 0 }) : { ...item, disabled: false };
// 		});
// 		const selectedOptionIds = updatedData.filter((opt) => opt.isChecked === 1).map((opt) => opt.id.toString());
// 		const data = {
// 			question: { ...options, options: updatedData },
// 			selectedOption: {
// 				questionId: options.id,
// 				optionId: selectedOptionIds.join(','),
// 				categoryId: options.categoryId,
// 				questionType: options.questionType,
// 			},
// 		};
// 		if (onSelect) {
// 			onSelect(data);
// 		}
// 	};

// 	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setSearchTerm(e.target.value);
// 	};

// 	// const handleSelectAll = () => {
// 	// 	const toggleValue = selectAllChecked ? 0 : 1;
// 	// 	const updatedOptions = options.options.map((opt: Option) => ({
// 	// 		...opt,
// 	// 		isChecked: toggleValue,
// 	// 	}));

// 	// 	const selectedOptionIds = updatedOptions.filter((opt) => opt.isChecked === 1).map((opt) => opt.id.toString());
// 	// 	const data = {
// 	// 		question: { ...options, options: updatedOptions },
// 	// 		selectedOption: {
// 	// 			questionId: options.id,
// 	// 			optionId: selectedOptionIds.join(','), // Comma-separated string of selected option IDs
// 	// 			categoryId: options.categoryId,
// 	// 			questionType: options.questionType,
// 	// 		},
// 	// 	};
// 	// 	if (onSelect) {
// 	// 		onSelect(data);
// 	// 	}

// 	// 	setSelectAllChecked(!selectAllChecked);
// 	// };

// 	const handleToggle = () => {
// 		if (onActivate) {
// 			onActivate(id);
// 		}
// 		setIsOpen((prev) => !prev);
// 	};

// 	const filteredOptions = options.options.filter((option: Option) => option.optionText.toLowerCase().includes(searchTerm.toLowerCase()));
// 	const selectedOptions = options.options.filter((opt: Option) => opt.isChecked === 1);

// 	const handleClickOutside = (event: MouseEvent) => {
// 		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// 			setMultiselectVisible(false);
// 		}
// 	};

// 	useEffect(() => {
// 		document.addEventListener('mousedown', handleClickOutside);
// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		const calculateDropdownPosition = () => {
// 			if (dropdownButtonRef.current && dropdownRef.current) {
// 				const dropdownButton = dropdownButtonRef.current;
// 				const windowHeight = window.innerHeight;
// 				const dropdownButtonRect = dropdownButton.getBoundingClientRect();
// 				const heightAbove = dropdownButtonRect.top;
// 				const heightBelow = windowHeight - dropdownButtonRect.bottom;
// 				// const dropdownContentHeight = dropdownRef.current.scrollHeight;
// 				// && (!(dropdownContentHeight < heightBelow) || dropdownContentHeight == 119 || dropdownContentHeight == 136)
// 				if (heightAbove > heightBelow) {
// 					setOpenDropdown('up');
// 					const maxHeight = windowHeight - heightBelow - 150;
// 					const optionHeight = windowHeight - heightBelow - 210;
// 					setOptionMaxHeight(optionHeight);
// 					setDropdownMaxHeight(maxHeight);
// 				} else {
// 					setOpenDropdown('down');
// 					const maxHeight = windowHeight - heightAbove - 150;
// 					const optionHeight = windowHeight - heightAbove - 210;
// 					setDropdownMaxHeight(maxHeight);
// 					setOptionMaxHeight(optionHeight);
// 				}
// 			}
// 		};

// 		if (multiselectVisible) {
// 			calculateDropdownPosition();
// 			window.addEventListener('resize', calculateDropdownPosition);
// 		}

// 		return () => {
// 			window.removeEventListener('resize', calculateDropdownPosition);
// 		};
// 	}, [multiselectVisible]);

// 	const handleInputClick = () => {
// 		setMultiselectVisible(!multiselectVisible);
// 	};
// 	// Apply dynamic styles based on dropdown position
// 	const multiSelectContentStyle: React.CSSProperties = {
// 		maxHeight: dropdownMaxHeight,
// 		overflowY: 'hidden',
// 		position: 'absolute',
// 		zIndex: 1000,
// 	};
// 	const multiSelectOptionStyle: React.CSSProperties = {
// 		maxHeight: optionMaxHeight,
// 		overflowY: 'auto',
// 		position: 'relative',
// 		zIndex: 1000,
// 	};

// 	return (
// 		<div ref={dropdownRef}>
// 			<div className={isActive && isOpen ? 'question-text' : 'inactive-question'} onClick={handleToggle}>
// 				<Typography isSpan={true} label={label} fontSize='fontSize14' fontWeight={isActive && isOpen ? 'bold' : 'regular'} textColor='black' />
// 				{selectedOptions.length > 0 ? <img src={tick} alt='tick' className='tick-image' /> : isActive && isOpen ? <img src={upArrow} alt='' /> : <img src={downArrow} alt='' className='normalArrow-img' />}
// 			</div>
// 			{isOpen && (
// 				<div className='new-dropdown-multiselect'>
// 					<button className='new-dropdown-button' onClick={handleInputClick} ref={dropdownButtonRef}>
// 						<span className={selectedOptions.length > 0 ? 'selected-option' : 'placeholder'}>
// 							{selectedOptions.length > 0 ? (
// 								<>
// 									{selectedOptions.slice(0, 3).map((opt) => (
// 										<div key={opt.id} className='selected-option-item'>
// 											{opt.optionText}
// 											<img
// 												className='remove-option'
// 												onClick={(e) => {
// 													e.stopPropagation();
// 													handleSelect(opt);
// 												}}
// 												src={cancel}
// 												alt='cancel'
// 											/>
// 										</div>
// 									))}
// 									{selectedOptions.length > 3 && <div className='selected-option-item'>+{selectedOptions.length - 3}..</div>}
// 								</>
// 							) : (
// 								<span className='placeholder'>Please select an option</span>
// 							)}
// 						</span>
// 						<img className='dropdown-image-arrow' src={polygon} alt='dropdown arrow' />
// 					</button>
// 					{multiselectVisible && (
// 						// Place accordingly when need
// 						// 	{/* {filteredOptions.length > 0 && (
// 						// 		<div className='select-all-div' onClick={handleSelectAll}>
// 						// 			<input type='checkbox' className='checkbox-multiselect' checked={selectAllChecked} />
// 						// 			<label className='select-all-text'>Select all</label>
// 						// 		</div>
// 						// 	)} */}
// 						<div className={openDropdown === 'up' ? 'dropdown-up-open' : 'parent-multiselect'} style={multiSelectContentStyle}>
// 							{openDropdown === 'down' && (
// 								<div className='search-div-profile'>
// 									<input type='text' className='dropdown-search' placeholder='Search' value={searchTerm} onChange={handleSearchChange} />
// 								</div>
// 							)}
// 							{filteredOptions.length > 0 && openDropdown != 'up' ? <hr className='select-all-question-hr' /> : ''}
// 							<div className={`new-dropdown-content-multiselect ${filteredOptions.length === 0 ? 'no-option-found-container' : ''}`} style={multiSelectOptionStyle}>
// 								{filteredOptions.length > 0 ? (
// 									filteredOptions.map((option: Option) => (
// 										<div key={option.id} onClick={() => !option.disabled && handleSelect(option)} className={`new-multiselect-option ${option.disabled ? 'disabled' : ''}`}>
// 											<input type='checkbox' className='checkbox-multiselect' checked={option.isChecked === 1} readOnly id={`checkbox-${option.id}`} disabled={option.disabled} />
// 											<label htmlFor={`checkbox-${option.id}`}>{option.optionText}</label>
// 										</div>
// 									))
// 								) : (
// 									<div className='no-option-found'>No options found for "{searchTerm}"</div>
// 								)}
// 							</div>
// 							{openDropdown === 'up' && (
// 								<div>
// 									{filteredOptions.length > 0 && <hr className='select-all-question-hr' />}
// 									<div className='search-div-profile'>
// 										<input type='text' className='dropdown-search' placeholder='Search' value={searchTerm} onChange={handleSearchChange} />
// 									</div>
// 								</div>
// 							)}
// 						</div>
// 					)}
// 				</div>
// 			)}
// 			<hr className='question-hr' />
// 		</div>
// 	);
// };
