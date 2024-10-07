import { useTranslations } from 'next-intl';

const TablePrices: React.FC = () => {
	const t = useTranslations('UserAccountPage');
	const PricesArray = [
		{ id: 1, count: '1-999', price: 1.07, desc: '' },
		{ id: 2, count: '1000-4999', price: 1.04, desc: '(' + t('textInBrackets') + ' 1 040 ' + t('currency') + ')' },
		{ id: 3, count: '5000-9999', price: 1.03, desc: '(' + t('textInBrackets') + ' 5 150 ' + t('currency') + ')' },
		{ id: 4, count: '10000-49999', price: 1.02, desc: '(' + t('textInBrackets') + ' 10 200 ' + t('currency') + ')' },
		{ id: 5, count: '50000-99999', price: 1.01, desc: '(' + t('textInBrackets') + ' 50 500 ' + t('currency') + ')' },
		{ id: 6, count: '100000-499999', price: 0.99, desc: '(' + t('textInBrackets') + ' 99 000 ' + t('currency') + ')' },
		{ id: 7, count: '500000 ' + t('textLastRowPriceSmsTable'), price: null, desc: t('kindPrice') },
	];

	return (
		<table className="w-full md:w-[626px] lg:w-[746px] ml-auto bg-priceTableBg  border border-priceTableBorderColor lg:ml-6">
			<thead className="bg-lightGreen">
				<tr>
					<th className="py-2 md:py-[10px] md:px-3 border font-roboto text-base md:text-xl font-normal text-center md:text-left">{t('nameCol_1PriceSmsTable')}</th>
					<th className="py-2 md:py-[10px] md:px-3 border font-roboto tetx-base md:text-xl font-normal text-center md:text-left">
						{t('nameCol_2PriceSmsTable')}
					</th>
				</tr>
			</thead>
			<tbody className="text-sm md:text-xl">
				{PricesArray.map(elem => (
					<tr key={elem.id}>
						<td className="py-2 md:py-4 px-3 border font-montserrat text-xs md:text-lg">{t('textRowPriceSmsTable')} {elem.count}</td>
						<td className="py-2 md:py-4 px-3 border font-montserrat text-xs md:text-lg">
							{elem.price} {elem.desc}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TablePrices;
