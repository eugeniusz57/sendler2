'use client';

import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import RSC from 'react-scrollbars-custom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Title from '@/components/Title';
import GreenButton from '@/components/buttons/GreenButton';
import Select from '@/components/Select';
import SelectTime from '@/components/SelectTime';
import AddAlfaNameForm from '@/components/forms/AddAlfaNameForm';
import AddClientPhoneNumberForm from '@/components/forms/AddClientPhoneNumberForm';
import RecipientsForm from '@/components/forms/RecipientsForm';
import EmailColorLinkBtn from '@/components/buttons/EmailColorLinkBtn';
import Modal from '@/components/Modal/Modal';
import OfferContract from '@/components/OfferContact';

import { getUserGroups } from '@/fetch-actions/groupsFetchActions';
import { getUser } from '@/fetch-actions/usersFetchActions';
import { sendSMS } from '@/fetch-actions/smsFetchActions';
import { charAndSmsCount } from '@/app/utils/charAndSmsCount';
import { getTimeOptionsValues } from '@/helpers/getTimeOptionsValues';

import { IUser } from '@/globaltypes/types';
import SendSmsModal from '@/components/SendSmsModal';

const MailingList = ({ params }: { params: { userId: string } }) => {
	const userId = Number(params.userId);
	const [charCount, setCharCount] = useState<number>(0);
	// const [doubleCharCount, setDoubleCharCount] = useState<number>(0);
	const [smsCount, setSmsCount] = useState<number>(0);
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>('Outlet');
	const [groupName, setGroupName] = useState<string>('');
	const [hour, setHour] = useState<string | undefined>('');
	const [minute, setMinute] = useState<string | undefined>('');
	const [second, setSecond] = useState<string | undefined>('');
	const [groupsNameArray, setGroupsNameArray] = useState<string[] | undefined>([]);
	const [date, setDate] = useState(new Date());
	const [recipients, setRecipients] = useState<(string | number)[]>([]);
	const [contentSMS, setContentSMS] = useState<string>('');
	const [update, setUpdate] = useState<boolean>(false);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
	const [isOfferContractChecked, setIsOfferContractChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [user, setUser] = useState<IUser>();

	// update page after update database
	const getUpdate = () => {
		setUpdate(!update);
	};

	const setDisabledSendBtn = () => {
		if (!isChecked && contentSMS && recipients.length > 0 && isOfferContractChecked) {
			return false;
		};

		if (
			isChecked &&
			contentSMS &&
			recipients.length > 0 &&
			date &&
			hour &&
			minute &&
			second &&
			isOfferContractChecked
		) {
			return false;
		}
		return true;
	};

	// check select is opened
	const openSelect = (isOpen: boolean) => {
		setIsSelectOpen(isOpen);
	};

	// set values of sms and character counters
	const setCharAndSmsCount = () => {
		const { charQuantity, smsQuantity } = charAndSmsCount(contentSMS);
		setCharCount(charQuantity);
		setSmsCount(smsQuantity);
	};

	const getUserName = (item: string) => {
		setUserName(item);
	};

	const getUserNamesArray = async (id: number) => {
		const res = await getUser(userId);
		const user = res?.data.user;
		if (user) {
			setUser(user);
		}
	};

	const getRecipients = (recipientsArray: (string | number)[]) => {
		setRecipients(recipientsArray);
	};

	const getGroupName = (item: string) => {
		setGroupName(item);
	};

	const getHour = (item: string | undefined) => {
		setHour(item);
	};

	const getMinute = (item: string | undefined) => {
		setMinute(item);
	};

	const getSecond = (item: string | undefined) => {
		setSecond(item);
	};

	const getIsOpened = () => {
		setIsOpened(!isOpened);
	};

	const handleChangeTextSms = (e: any) => {
		setContentSMS(e.target.value);
	};

	const handleClickAddGroup = () => {
		if (groupName) {
			// uniqueness control of name of group
			if (recipients.includes(groupName)) {
				toast.error('Цю групу вже додано.', {
					position: 'top-center',
					className: 'toast_error',
					style: {
						backgroundColor: '#0F3952',
						color: '#fa9c9c',
						fontSize: '24px',
						marginBottom: '50%',
					},
				});
				return;
			}
			const recipientsArray = [...recipients, groupName];
			setRecipients(recipientsArray);
		}
	};

	const handleClickAddPhoneNumber = (tel: number) => {
		if (tel) {
			// uniqueness control of phone number
			if (recipients.includes(tel)) {
				toast.error('Цей номер телефону вже додано.', {
					position: 'top-center',
					className: 'toast_error',
					style: {
						backgroundColor: '#0F3952',
						color: '#fa9c9c',
						fontSize: '24px',
						marginBottom: '50%',
					},
				});
				return;
			}
			const recipientsArray = [...recipients, tel];
			setRecipients(recipientsArray);
		};
	};

	const handleClickAddClientName = () => {
		setContentSMS(contentSMS + ' ' + `%ClientName%`);
	};

	const handleClickAddParam1 = () => {
		setContentSMS(contentSMS + ' ' + `%Parametr1%`);
	};

	const handleClickAddParam2 = () => {
		setContentSMS(contentSMS + ' ' + `%Parametr2%`);
	};

	// reset date and time if input is closed
	const handleClickChecked = () => {
		setIsChecked(isChecked => !isChecked);
		if (isChecked === false) {
			setDate(new Date());
			setHour('');
			setMinute('');
			setSecond('');
		};
	};

	const handleChekedOfferContract = () => {
		setIsOfferContractChecked(!isOfferContractChecked);
	};

	const handleClickSubmit = async () => {
		setIsDisabled(true);
		const dateString: string[] = String(date).split(' ');
		const dateSelected = new Date(`${dateString[1]} ${dateString[2]}, ${dateString[3]} ${hour}:${minute}:${second}`).getTime();
		if (((dateSelected) - new Date().getTime()) < 0 && isChecked === true) {
			toast.error('Ви ввели не вірну дату та час.', {
				position: 'bottom-center',
				className: 'toast_error',
				style: {
					backgroundColor: '#0F3952',
					color: '#fa9c9c',
					fontSize: '24px',
					marginBottom: '50%',
				},
			});
			setIsDisabled(false);
			return;
		};

		if (hour && minute && second && date) {
			await sendSMS(
				userName,
				recipients,
				contentSMS,
				date.toISOString().split('T')[0],
				`${hour}:${minute}:${second}`,
				'web'
			);
			setContentSMS('');
			setGroupName('');
			setRecipients([]);
			setDate(new Date());
			setHour('');
			setMinute('');
			setSecond('');
			setIsChecked(false);
			await getData();
			getUpdate();
			setIsDisabled(false);
			setIsOfferContractChecked(false);
			return;
		}

		// date and time completeness control
		if (!hour && !minute && !second && date) {
			await sendSMS(userName, recipients, contentSMS, '', '', 'web');
			setContentSMS('');
			setRecipients([]);
			setGroupName('');
			await getData();
			getUpdate();
			setIsDisabled(false);
			setIsOfferContractChecked(false);
			return;
		}

		toast.error('Введіть повну дату й час.', {
			position: 'bottom-center',
			className: 'toast_error',
			style: {
				backgroundColor: '#0F3952',
				color: '#fa9c9c',
				fontSize: '24px',
				marginBottom: '50%',
			},
		});
		setIsDisabled(false);
	};

	// get array of group's name
	const getData = async () => {
		const resGroups = await getUserGroups(userId);
		const groupsName = resGroups?.map(group => group.group_name);
		setGroupsNameArray(groupsName);
	};

	const memoizedgetData = useCallback(getData, [userId]);

	const memoizedsetDisabledSendBtn = useCallback(setDisabledSendBtn, [
		contentSMS,
		recipients,
		date,
		hour,
		minute,
		second,
		isChecked,
		isOfferContractChecked,
	]);
	const memoizedgetUserNamesArray = useCallback(getUserNamesArray, [userId]);
	const memoizedsetCharAndSmsCount = useCallback(setCharAndSmsCount, [contentSMS]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove('overflow-hidden');
	};

	useEffect(() => {
		memoizedsetCharAndSmsCount();
		memoizedsetDisabledSendBtn();
	}, [memoizedsetCharAndSmsCount, memoizedsetDisabledSendBtn]);

	useEffect(() => {
		memoizedgetData();
		memoizedgetUserNamesArray(userId);
	}, [memoizedgetData, memoizedgetUserNamesArray, userId, recipients, update]);

	const handleChangeDate = (date: Date) => {
		setDate(date);
	};
	return (
		<>
			<Title type="h1" color="dark">
				Розсилка SMS
			</Title>
			<div className="flex flex-col md:gap-[80px] gap-[50px] md:mt-[60px] mt-[28px]">
				<div className="sms-page-box">
					<p className="lg:w-[724px] md:w-[640px] w-[308px] text-mainTextColor md:text-base text-sm md:leading-6 leading-[21px] font-montserrat">
						Виберіть підпис (Ім&#39;я відправника), який буде відображатися замість номера
						відправника SMS-повідомлення
					</p>
					<p className=" text-mainTextColor font-normal md:text-xl text-base md:mt-[50px] mt-[40px] label">
						Ім’я відправника
					</p>
					<div className="flex md:flex-row flex-col gap-8 md:gap-[22px] gap-6 items-center md:mt-3 mt-2">
						<div className="md:w-[474px] w-[308px]">
							<Select
								openSelect={(a: boolean) => a}
								selectOptions={user?.alfa_names_active}
								getSelect={getUserName}
								selectedOption={userName}
								// widthValue={474}
								startValue="Обрати"
								defaultValue="Outlet"
							/>
						</div>
						<GreenButton size="normal" onClick={getIsOpened}>
							Додати ім’я
						</GreenButton>
					</div>
					{isOpened && (
						<AddAlfaNameForm
							userId={userId}
							getUserNamesArray={getUserNamesArray}
							getIsOpened={getIsOpened}
						/>
					)}
					{!(
						user?.alfa_names_disable?.length === undefined || user?.alfa_names_disable?.length === 0
					) && (
							<div className="text-mainTextColor text-base font-montserrat">
								<p className="mb-2 font-normal">Імена що знаходяться на узгодженні</p>
								<ul className="w-64 h-32 flex flex-wrap gap-2  overflow-auto">
									<RSC>
										{user?.alfa_names_disable.map((item, index) => (
											<li key={index} className="text-disableAlfaName">
												{item}
											</li>
										))}
									</RSC>
								</ul>
							</div>
						)}
				</div>

				<div className="sms-page-box">
					<p className="lg:w-[724px] md:w-[640px] w-[308px] text-mainTextColor md:text-base text-sm md:leading-6 leading-[21px] font-montserrat">
						Введіть SMS-повідомлення. Слідкуйте за розміром повідомлення. Пам&#39;ятайте: для
						кирилиці в одній SMS може поміститися 70 знаків, для латиниці - 160 символів.
					</p>
					<p className=" text-mainTextColor font-normal md:text-xl text-base md:mt-[50px] mt-[28px] lg:mb-[3px] md:mb-8 mb-[20px]">Текст повідомлення</p>
					<div className="flex lg:flex-row flex-col-reverse md:gap-8 gap-[20px]">
						<div className=" inline-block  lg:w-[636px] md:w-[596px] w-[308px] mt-1">
							<div className="flex justify-end gap-5 font-roboto md:text-sm text-[12px] text-mainTextColor">
								{' '}
								<span>Символів: {charCount}</span>
								<span>SMS: {smsCount}</span>
							</div>
							<textarea
								value={contentSMS}
								onChange={handleChangeTextSms}
								placeholder="Text SMS"
								className="resize-none w-full md:h-[220px] h-[205px] p-3 rounded-[18px] border-[1px] border-[#E6E6E6] mt-2 input"
							></textarea>
						</div>
						<div className="md:flex lg:flex-col md:flex-row gap-[18px] lg:justify-center md:justify-start">
							<div className="text-base md:mb-0 mb-4 text-mainTextColor leading-6">Додати шаблон</div>
							<div className='flex lg:flex-col md:flex-row gap-[18px] lg:justify-center md:justify-start'>
								<button
									type="button"
									onClick={handleClickAddClientName}
									className="text-base text-emailColorLink cursor-pointer leading-6"
								>
									Ім&#39;я клієнта
								</button>
								<button
									type="button"
									onClick={handleClickAddParam1}
									className="text-base text-emailColorLink cursor-pointer leading-6"
								>
									Параметр 1
								</button>
								<button
									type="button"
									onClick={handleClickAddParam2}
									className="text-base text-emailColorLink cursor-pointer leading-6"
								>
									Параметр 2
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="sms-page-box">
					<p className="lg:w-[724px] md:w-[640px] text-mainTextColor md:text-base text-sm md:leading-6 leading-[21px] font-montserrat">
						Виберіть групу контактів, якій Ви бажаєте надіслати SMS-повідомлення. У Вас є можливість
						ввести новий номер або вибрати один із контактів.
					</p>
					<p className=" text-mainTextColor font-normal lg:text-xl md:text-lg text-base leading-6 md:mt-[50px] mt-[28px]">
						Групи та номери телефонів, яким буде надіслано SMS- повідомлення
					</p>
					<div className="flex lg:flex-row flex-col-reverse md:gap-8 gap-[20px] md:mt-8 mt-[28px] mb-8">
						<RecipientsForm recipients={recipients} getRecipients={getRecipients} />
						<div className="flex flex-col md:gap-8 gap-[22px] justify-start">
							<AddClientPhoneNumberForm handleClick={handleClickAddPhoneNumber} />
							<div className='xl:w-[474px] lg:w-[420px] md:w-[474px] w-full'>
								<Select
									openSelect={openSelect}
									selectOptions={groupsNameArray}
									getSelect={getGroupName}
									selectedOption={groupName}
									startValue="Обрати"
								/>
								<div className={`${isSelectOpen && 'hidden'}`}>
									<EmailColorLinkBtn
										onClick={handleClickAddGroup}
										isDisabled={groupName ? false : true}
										type="button"
									>
										Додати групу до списку
									</EmailColorLinkBtn>
								</div>
							</div>
						</div>
					</div>
					<span className="flex items-center gap-1">
						{!isChecked ? (
							<Image
								src="/svg/checkbox-empty.svg"
								width={24}
								height={24}
								alt="Check box"
								onClick={handleClickChecked}
							/>
						) : (
							<Image
								src="/svg/checkbox-checked.svg"
								width={24}
								height={24}
								alt="Check box checked"
								onClick={handleClickChecked}
							/>
						)}
						Запланувати розсилання
					</span>
					{isChecked && (
						<div className="mt-5 flex lg:flex-row flex-col lg:items-center items-start">
							{' '}
							<div className='md:mb-3 mb-2'>
								<label htmlFor="calendar" className="text-xl text-mainTextColor flex cursor-pointer ">
									Дата{' '}
									<Image
										src="/svg/calendar.svg"
										width={24}
										height={24}
										alt="Check box"
										className="ml-2 mr-4"
									/>
								</label>
							</div>
							<div>
								<DatePicker
									id="calendar"
									selected={date ? new Date(date) : null}
									onChange={handleChangeDate}
									className="xl:w-[474px] lg:w-[250px] md:w-[474px] w-full h-12 lg:mb-0 md:mb-[50px] mb-[28px] rounded-[18px] border border-inputBorder outline-none text-xl text-mainTextColor pr-[50px] pl-[50px] cursor-pointer"
								/>
							</div>
							<p className=" text-xl text-mainTextColor  md:ml-5 md:mr-2 md:mb-3 mb-2">Час</p>
							<div className="flex gap-3 items-center">
								<div className='md:w-[150px] w-[93px]'>
									<SelectTime
										openSelect={(a: boolean) => a}
										selectOptions={getTimeOptionsValues(0, 24)}
										getSelect={getHour}
										selectedOption={hour}
										startValue=""
									/>
								</div>
								<p className='md:block hidden'>год</p>
								<div className='md:w-[150px] w-[93px]'>
									<SelectTime
										openSelect={(a: boolean) => a}
										selectOptions={getTimeOptionsValues(0, 60)}
										getSelect={getMinute}
										selectedOption={minute}
										startValue=""
									/>
								</div>
								<p className='md:block hidden'>хв</p>
								<div className='md:w-[150px] w-[93px]'>
									<SelectTime
										openSelect={(a: boolean) => a}
										selectOptions={getTimeOptionsValues(0, 60)}
										getSelect={getSecond}
										selectedOption={second}
										startValue=""
									/>
								</div>
								<p className='md:block hidden'>сек</p>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-center items-center flex-col mt-[50px]">
				<div className="flex lg:items-center items-start gap-1 mb-4">
					{!isOfferContractChecked ? (
						<Image
							src="/svg/checkbox-empty.svg"
							width={24}
							height={24}
							alt="Check box"
							onClick={handleChekedOfferContract}
						/>
					) : (
						<Image
							src="/svg/checkbox-checked.svg"
							width={24}
							height={24}
							alt="Check box checked"
							onClick={handleChekedOfferContract}
						/>
					)}
					<div className=" text-redStar"> * </div>
					<div className='md:text-base text-sm md:leading-6 leading-[21px]'>
						Натискаючи кнопку Надіслати ви підтверджуєте відправлення форми, та що всі данні введенні
						правильно, а також підверджуєте ознайомлення з
						<span onClick={openModal} className={`text-emailColorLink  md:text-base text-sm md:leading-6 leading-[21px] ml-1`}>
							договором оферти.
						</span>
					</div>
					<Modal isOpen={isModalOpen} onClose={closeModal}>
						<OfferContract />
					</Modal>
				</div>
				<SendSmsModal
					handleClickSubmit={handleClickSubmit}
					setDisabledSendBtn={setDisabledSendBtn}
					isDisabled={isDisabled}
					recipients={recipients}
					balance={user?.balance}
				/>
			</div>
		</>
	);
};

export default MailingList;
