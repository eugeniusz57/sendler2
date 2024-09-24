import TableDebts from '@/components/TableDebts';
import BackBtn from '@/components/buttons/BackBtn';
import React from 'react';

const Debts: React.FC = async () => {
	return (
		<>
			<BackBtn />
			<div className='mt-10'>
				<TableDebts />
			</div>
		</>
	);
};

export default Debts;
