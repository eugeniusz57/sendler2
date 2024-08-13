import { IPaymentHistory } from "@/globaltypes/types"

interface Props {
	payment: IPaymentHistory
};

const Payment: React.FC<Props> = ({ payment }) => {
	return (
		<div>
			<li key={payment.transaction_id} className="block lg:flex lg:flex-row items-center text-base font-montserrat font-normal border-b border-rowUnderLine">
				<div data-title='Дата поповнення' className="flex lg:w-1/3 lg:mt-0 mt-[22px] lg:mb-0 mb-[22px] lg:pl-[26px] md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center overflow-hidden before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">{payment.transactions_date.toLocaleString()}</div>
				<div data-title='Сума, грн' className="flex lg:w-1/3 lg:mt-0 mt-[22px] lg:mb-0 mb-[22px] lg:pl-[26px] md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center overflow-hidden before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">{payment.money_count}</div>
				<div data-title='Кількість' className="flex  lg:w-1/3 lg:mt-0 mt-[22px] lg:mb-0 mb-[22px] lg:pl-[26px] md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center overflow-hidden before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">{payment.sms_count}</div>
			</li>
		</div>
	)
};

export default Payment
