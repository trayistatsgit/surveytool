import React from 'react';
import { Container } from '../index';

interface CardData {
	title: string;
	content: string;
	loi: string;
}

interface CardGridProps {
	cardsData: CardData[];
}
export const CardGrid: React.FC<CardGridProps> = () => {
	return (
		<Container backgroundColor='blue'>
		</Container>
	);
};
