'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

import { schemaCreateAlfaName } from "@/models/users";
import { createAlfaName } from "@/fetch-actions/usersFetchActions";
import GreenButton from "@/components/buttons/GreenButton";
import { EnterOnlyLetters } from "@/helpers/EnterOnlyLetters";

import { IUserAlfaName } from "@/globaltypes/types";
import { useTranslations } from "next-intl";

type Props = {
	userId: number;
	getUserNamesArray: (id: number) => void;
	getIsOpened: () => void;
};

const AddAlfaNameForm: React.FC<Props> = ({ userId, getUserNamesArray, getIsOpened }) => {

	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [name, setName] = useState<string>('');
	const t = useTranslations('MailList');

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IUserAlfaName>({
		resolver: async (data) => {
			try {
				await schemaCreateAlfaName.validateAsync(data, { abortEarly: false });
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
				};
				return {
					values: {},
					errors: validationErrors,
				};
			}
		},
	});

	const onSubmit: SubmitHandler<IUserAlfaName> = async (data) => {
		await createAlfaName(data.alfa_name, userId);
		getUserNamesArray(userId);
		getIsOpened();
		reset({ alfa_name: '' });
	};

	useEffect(() => {
		if (name) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		};
	}, [name]);

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className='mt-8'>
			<p className="hidden md:block mb-[22px] text-mainTextColor dark:text-textColorDarkTheme text-base font-montserrat">
				{t('textAddAlfaNameFormBox')}
			</p>
			<label htmlFor='alfa_name' className='block mb-3.5 label'>
				{t('titleInputAddAlfaNameForm')}
			</label>
			<div className="flex md:flex-row flex-col md:gap-[22px] gap-6 items-center md:mt-3 mt-2">
				<div className="md:w-[474px] w-[308px]">
					<input id="alfa_name"
						type='text'
						{...register("alfa_name")}
						className='w-full h-12 mr-8 px-4 input'
						required
						onKeyDown={EnterOnlyLetters}
						onChange={handleOnChange}
						maxLength={11}
					/>
					{errors.alfa_name && (
						<span className="text-red-500 ">{errors.alfa_name.message}</span>
					)}
				</div>
				<GreenButton isDisabled={isDisabled} type="submit" size="normal">{t('textButtonAddAlfaNameForm')}</GreenButton>
			</div>
		</form>
	);
};

export default AddAlfaNameForm;
