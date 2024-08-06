import { PricesArray } from '@/data/data';

const TablePrices: React.FC = () => {
	return (
		<table className="w-full md:w-[626px] lg:w-[746px] ml-auto bg-priceTableBg  border border-priceTableBorderColor lg:ml-6">
			<thead className="bg-lightGreen">
				<tr>
					<th className="py-2 md:py-[10px] md:px-3 border font-roboto text-base md:text-xl font-normal text-center md:text-left">СМС</th>
					<th className="py-2 md:py-[10px] md:px-3 border font-roboto tetx-base md:text-xl font-normal text-center md:text-left">
						Ціна одного SMS, грн.
					</th>
				</tr>
			</thead>
			<tbody className="text-sm md:text-xl">
				{PricesArray.map(elem => (
					<tr key={elem.id}>
						<td className="py-2 md:py-4 px-3 border font-montserrat text-xs md:text-lg">Від {elem.count}</td>
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
