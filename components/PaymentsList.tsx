'use client';
import { IPaymentHistory } from '@/globaltypes/types';

type Props = {
	arrayUserPaymentHistory: IPaymentHistory[] | undefined;
};

export default function PaymentsList({ arrayUserPaymentHistory }: Props) {
	return (
		<table className="mt-10 w-full">
			<thead className="hidden lg:table-header-group">
				<tr className="bg-headerTable text-white text-xl font-roboto  leading-[30px]">
					<th className="w-1/3 pl-[26px] pt-[18px] pb-[13px] text-left font-normal bg-headerTable">Дата поповнення</th>
					<th className="w-1/3 pl-[26px] pt-[18px] pb-[13px] text-left font-normal bg-headerTable">Сума, грн</th>
					<th className="w-1/3 pl-[26px] pt-[18px] pb-[13px] text-left font-normal bg-headerTable">Кількість, СМС</th>
				</tr>
			</thead>
			<thead className="lg:hidden table-header-group">
				<tr className='text-xl text-white font-roboto bg-headerTable'>
					<th className='md:pt-[18px] pt-2 md:pb-[13px] pb-2 md:text-lg text-base text-center font-normal'>Історія платежів</th>
				</tr>
			</thead>
			<tbody>
				{arrayUserPaymentHistory?.length ? arrayUserPaymentHistory?.map(payment => (
					<tr key={payment.transaction_id} className="block lg:table-row items-center text-base font-montserrat font-normal border-b border-rowUnderLine">
						<td data-title='Дата поповнення' className="flex lg:table-cell lg:mt-0 mt-[22px] lg:mb-0 mb-[22px] lg:pl-[26px] md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center overflow-hidden before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">{payment.transactions_date.toLocaleString()}</td>
						<td data-title='Сума, грн' className="flex lg:table-cell lg:mt-0 mt-[22px] lg:mb-0 mb-[22px] lg:pl-[26px] md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center overflow-hidden before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">{payment.money_count}</td>
						<td data-title='Кількість' className="flex lg:table-cell lg:mt-0 mt-[22px] lg:mb-0 mb-[22px] lg:pl-[26px] md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center overflow-hidden before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">{payment.sms_count}</td>
					</tr>
				))
					:
					<>
						<tr className="h-12 border-b border-rowUnderLine">
						</tr>
						<tr className="h-12 border-b border-rowUnderLine">
						</tr>
						<tr className="h-12 border-b border-rowUnderLine">
						</tr>
					</>}
			</tbody>
		</table>
	);
}
