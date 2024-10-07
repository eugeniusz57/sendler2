"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";

import { validationSchemaCreateClient } from "@/models/forms";
import GreenButton from "../buttons/GreenButton";
import Image from 'next/image';
import SelectTime from "../SelectTime";
import { createGroupClient, updateUserClient } from "@/fetch-actions/clientsFetchActions";
import { getTimeOptionsValues } from '@/helpers/getTimeOptionsValues';

import { FormInputCreateClient, IClientDatabase } from "@/globaltypes/types";
import { useTranslations } from "next-intl";

interface Props {
	onClose: (() => void) | undefined;
	updateClients: () => void,
	getUpdate: () => void,
	openSelect: (isOpen: boolean) => void;
	title?: string;
	groupId?: number;
	groupName?: string;
	currentClient?: IClientDatabase;
};

const CreateClientForm: React.FC<Props> = ({
	onClose,
	updateClients,
	getUpdate,
	openSelect,
	title,
	groupName,
	currentClient,
	groupId }) => {

	const { data: session } = useSession();
	const userId = session?.user.user_id;
	const [isDisabled, setIsDisabled] = useState(false);
	const [day, setDay] = useState<string | undefined>(currentClient?.date_of_birth?.split('.')[0]);
	const [month, setMonth] = useState<string | undefined>(currentClient?.date_of_birth?.split('.')[1]);
	const [year, setYear] = useState<string | undefined>(currentClient?.date_of_birth?.split('.')[2]);
	const refForm = useRef<HTMLFormElement | null>(null);
	const t = useTranslations('ClientsList');

	const getDay = (item: string | undefined) => {
		setDay(item);
	};

	const getMonth = (item: string | undefined) => {
		setMonth(item);
	};

	const getYear = (item: string | undefined) => {
		setYear(item);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormInputCreateClient>({
		resolver: async (data) => {
			try {
				await validationSchemaCreateClient.validateAsync(data, {
					abortEarly: false,
				});
				return { values: data, errors: {} };
			} catch (error: any) {
				const validationErrors: Record<string, { message: string }> = {};
				if (error.details) {
					error.details.forEach(
						(detail: { context: { key: string | number }; message: any }) => {
							if (detail.context && detail.context.key) {
								validationErrors[detail.context.key] = {
									message: detail.message,
								};
							}
						}
					);
				}
				return {
					values: {},
					errors: validationErrors,
				};
			}
		},
	});

	const onSubmit: SubmitHandler<FormInputCreateClient> = async (data) => {
		let birthday: string | undefined;

		if (day && month && year) {
			birthday = `${year}.${month}.${day}`;
		};

		const clientData = {
			tel: `380${data.phone}`,
			last_name: data.lastName,
			first_name: data.firstName,
			middle_name: data.middleName,
			date_of_birth: birthday,
			parameter_1: data.parameter1,
			parameter_2: data.parameter2,
		};

		if (currentClient?.client_id) {
			updateUserClient(currentClient.client_id, clientData);
			updateClients();
			getUpdate();
		} else {
			createGroupClient(userId, groupId, clientData);
			updateClients();
			getUpdate();
		}
		reset();
		{
			onClose && onClose();
		}
		setIsDisabled(false);
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className="w-[328px] md:w-[526px] mx-auto pb-[28px] pt-11 px-[10px] md:px-[26px] flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg"
			ref={refForm}
		>
			<button
				className=" absolute top-4 right-4 transform transition-transform hover:rotate-90 hover:scale-110"
				onClick={onClose}
			>
				<Image src={'/svg/cross-circle.svg'} alt="close modal button" width={34} height={34} />
			</button>
			{title && !groupName && <p className="form-title mb-[22px] md:mb-8">{title}</p>}
			{title && groupName && <p className="form-title mb-[22px] md:mb-8">{`${title} - ${groupName}`}</p>}
			<div className="text-left w-full mb-[22px] mb-8">
				<label
					htmlFor="phone"
					className="font-roboto text-xs md:text-sm font-medium mb-2 block"
				>
					{t('phoneNumber')}
					<span className="ml-1 text-red-700">*</span>
				</label>
				<div className="flex relative">
					<span className="absolute left-3 top-[9px]">+380</span>
					<input
						id="phone"
						type="text"
						defaultValue={currentClient?.tel && (currentClient.tel).slice(3, (currentClient.tel).length)}
						{...register("phone")}
						className="w-full border py-2 pr-11 pl-[50px] focus:outline-none focus:border-blue-500 input"
						placeholder="675555544"
						maxLength={9}
						required
					/>
					{errors.phone && (
						<span className="form-errors">{errors.phone.message}</span>
					)}
				</div>


				<label
					htmlFor="lastName"
					className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block"
				>
					{t('lastName')}
				</label>
				<div className="flex relative">
					<input
						id="lastName"
						type="text"
						defaultValue={currentClient?.last_name && currentClient.last_name}
						{...register("lastName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Петренко"
					/>
					{errors.lastName && (
						<span className="form-errors">{errors.lastName.message}</span>
					)}
				</div>

				<label
					htmlFor="firstName"
					className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block"
				>
					{t('firstName')}
				</label>
				<div className="flex relative">
					<input
						id="firstName"
						type="text"
						defaultValue={currentClient?.first_name && currentClient.first_name}
						{...register("firstName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Петро"
					/>
					{errors.firstName && (
						<span className="form-errors">{errors.firstName.message}</span>
					)}
				</div>

				<label
					htmlFor="midleName"
					className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block"
				>
					{t('middleName')}
				</label>
				<div className="flex relative">
					<input
						id="middleName"
						type="text"
						defaultValue={currentClient?.middle_name && currentClient.middle_name}
						{...register("middleName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Олександрович"
					/>
					{errors.middleName && (
						<span className="form-errors">{errors.middleName.message}</span>
					)}
				</div>

				<label
					htmlFor="day"
					className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block"
				>
					{t('birthday')}
				</label>
				<div className="flex gap-x-2 md:gap-x-3 justify-center">
					<div className="w-[80px] md:w-[118px]">
						<SelectTime openSelect={openSelect} isModal={true} selectOptions={getTimeOptionsValues(1, 31)} getSelect={getDay} selectedOption={day} startValue='' />
					</div>
					<div className="w-[92px] md:w-[130px]">
						<SelectTime openSelect={openSelect} isModal={true} selectOptions={getTimeOptionsValues(1, 12)} getSelect={getMonth} selectedOption={month} startValue='' />
					</div>
					<div className="w-[120px] md:w-[194px]">
						<SelectTime openSelect={openSelect} isModal={true} selectOptions={getTimeOptionsValues(1900, new Date().getFullYear())} getSelect={getYear} selectedOption={year} startValue='' />
					</div>
				</div>

				<label
					htmlFor="parameter1"
					className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block"
				>
					{t('parameter_1')}
				</label>
				<div className="flex">
					<input
						id="parameter1"
						type="text"
						defaultValue={currentClient?.parameter_1 && currentClient.parameter_1}
						{...register("parameter1")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
					/>
					{errors.parameter1 && (
						<span className="form-errors">{errors.parameter1.message}</span>
					)}
				</div>

				<label
					htmlFor="parameter2"
					className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block"
				>
					{t('parameter_2')}
				</label>
				<div className="flex">
					<input
						id="parameter2"
						type="text"
						defaultValue={currentClient?.parameter_2 && currentClient.parameter_2}
						{...register("parameter2")}
						className="input block w-full border py-2 px-3 focus:outline-none focus:border-blue-500"
					/>
					{errors.parameter2 && (
						<span className="form-errors">{errors.parameter2.message}</span>
					)}
				</div>
			</div>
			<GreenButton size="big" isDisabled={isDisabled}>{t('textButtonSubmit')}</GreenButton>
		</form>
	);
};

export { CreateClientForm };
