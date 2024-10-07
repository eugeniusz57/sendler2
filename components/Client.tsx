import EditClient from './EditClient';
import { IClientDatabase } from '@/globaltypes/types';
import { useTranslations } from 'next-intl';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
	convertClient: IClientDatabase;
	groupId?: number | undefined;
	updateClients: () => void;
	getUpdate: () => void;
	register: UseFormRegister<FieldValues>
	onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Client: React.FC<Props> = ({
	convertClient,
	groupId,
	updateClients,
	getUpdate,
	register,
	onSelect }) => {
	const t = useTranslations('ClientsList');

	return (
		<li className="block lg:flex w-full gap-x-6 px-[26px] items-center lg:h-[48px] text-base font-montserrat font-normal border-b border-rowUnderLine">
			<div className='block md:flex mt-[14px] lg:mt-0'>
				<p className=' lg:hidden w-full md:w-2/6 mb-2 md:mb-0 font-base md:font-lg font-roboto font-bold'>{t('nameCol_1ClientsTable')}</p>
				<div className='flex gap-x-2 md:gap-x-4 w-full md:w-4/6 lg:w-full'>
					<input
						id={String(convertClient.client_id)}
						{...register(`${convertClient.client_id}`)}
						placeholder="bluebill1049@hotmail.com"
						type="checkbox"
						onChange={onSelect}
					/>
					<label htmlFor={String(convertClient.client_id)}></label>
					<div className="lg:w-[128px] text-left overflow-hidden">
						{convertClient.tel}
					</div>
				</div>
			</div>
			<div className='md:flex block mt-6 lg:mt-0 mb-6 lg:mb-0'>
				<p className='lg:hidden w-full md:w-2/6 mb-2 md:mb-0 font-base md:font-lg font-roboto font-bold'>{t('nameCol_2ClientsTable')}</p>
				<div className="flex w-full md:w-4/6 gap-x-2 flex-wrap lg:flex-nowrap lg:w-[195px] xl:w-[354px] text-left">
					{convertClient.last_name
						&& convertClient.first_name
						&& convertClient.middle_name
						&& <div className='hidden lg:block lg:truncate'>{convertClient.last_name + ' ' + convertClient.first_name + ' ' + convertClient.middle_name}</div>}
					<div className='truncate lg:hidden'>{convertClient.last_name}</div>
					<div className='truncate lg:hidden'>{convertClient.first_name}</div>
					<div className='truncate lg:hidden'>{convertClient.middle_name}</div>
				</div>
			</div>
			<div className='md:flex block w-full lg:w-[190px] mb-6 lg:mb-0'>
				<p className='lg:hidden w-full md:w-2/6 mb-2 md:mb-0 font-base md:font-lg font-roboto font-bold'>{t('nameCol_3ClientsTable')}</p>
				<div className="w-full md:w-4/6 lg:w-[190px] text-left overflow-hidden">
					{convertClient.ua_date_of_birth}
				</div>
			</div>
			<div className='md:flex block w-full lg:w-[154px] mb-6 lg:mb-0'>
				<p className='lg:hidden w-full md:w-2/6 mb-2 md:mb-0 font-base md:font-lg font-roboto font-bold'>{t('nameCol_4ClientsTable')}</p>
				<div className="w-full md:w-4/6 lg:w-[130px] text-left truncate overflow-hidden">
					{convertClient.parameter_1}
				</div>
			</div>
			<div className='md:flex block w-full lg:w-[154px] mb-2 md:mb-4 lg:mb-0'>
				<p className='lg:hidden w-full md:w-2/6 mb-2 md:mb-0 font-base md:font-lg font-roboto font-bold'>{t('nameCol_5ClientsTable')}</p>
				<div className="w-full md:w-4/6 lg:w-[130px] text-left truncate">
					{convertClient.parameter_2}
				</div>
			</div>
			<div className='text-right lg:text-left mb-4 lg:mb-0'>
				<EditClient
					groupId={groupId}
					client={convertClient}
					updateClients={updateClients}
					getUpdate={getUpdate}
				/>
			</div>
		</li>
	);
};

export default Client;

