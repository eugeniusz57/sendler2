'use client';
import { IPaymentHistory } from '@/globaltypes/types';
import RSC from "react-scrollbars-custom";
import Payment from './Payment';
import LoadMorePaymentHistory from './LoadMorePaymentsHistory';


type Props = {
	userId: number;
	arrayUserPaymentHistory: IPaymentHistory[] | undefined;
	isUpdated: boolean;
	LIMIT: number;
};

const PaymentsList: React.FC<Props> = ({
	userId,
	arrayUserPaymentHistory,
	isUpdated,
	LIMIT }) => {

	return (
		<div className="mt-10 w-full">
			<div className="hidden lg:flex gap-x-8 w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable">
				<p className="w-1/3">Дата поповнення</p>
				<p className="w-1/3">Сума, грн</p>
				<p className="w-1/3">Кількість, СМС</p>
			</div>
			<div className="lg:hidden block w-full md:pt-[18px] pt-2 md:pb-[13px] pb-2 md:text-lg text-white text-base text-center font-normal bg-headerTable">
				<p>Історія платежів</p>
			</div>
			<div className='h-[370px] md:h-[325px] lg:h-[180px] overflow-auto'>
				{arrayUserPaymentHistory?.length ? (
					<RSC style={{ height: "100%" }}>
						{arrayUserPaymentHistory?.map(payment => (
							<Payment
								key={payment.transaction_id}
								payment={payment}
							/>
						))}
						<LoadMorePaymentHistory
							userId={userId}
							isUpdated={isUpdated}
							LIMIT={LIMIT}
						/>
					</RSC>
				) :
					<>
						<div className="flex  px-[26px] items-center h-[48px]  text-base font-montserrat font-normal border-b border-rowUnderLine">
							<span>1</span>
						</div>
						<div className="h-12 border-b border-rowUnderLine">
						</div>
						<div className="h-12 border-b border-rowUnderLine">
						</div>
					</>}
			</div>
		</div>
	);
};

export default PaymentsList;
