'use client';

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";

import { schemaAddClientNumber } from "@/models/users";
import { EnterOnlyFigures } from "@/helpers/EnterOnlyFigures";
import EmailColorLinkBtn from "../buttons/EmailColorLinkBtn";

import { ITel } from "@/globaltypes/types";


type Props = {
	handleClick: (tel: number) => void;
};

const AddClientPhoneNumberForm: React.FC<Props> = ({ handleClick }) => {
	const [tel, setTel] = useState('');
	const t = useTranslations('MailList');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ITel>({
		resolver: async (data) => {
			try {
				await schemaAddClientNumber.validateAsync(data, { abortEarly: false });
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

	const onSubmit: SubmitHandler<ITel> = async (data) => {
		handleClick(Number('380' + data.tel));
		reset({ tel: '' });
		setTel('');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTel(e.target.value);
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='relative'>
				<span className="absolute left-3 top-[12px]">+380</span>
				<input id="tel"
					type='text'
					defaultValue={''}
					{...register("tel")}
					className='xl:w-[474px] lg:w-[420px] md:w-[474px] w-full border py-[11px] pr-11 pl-[50px] input'
					placeholder="675555544"
					required
					maxLength={9}
					onKeyDown={EnterOnlyFigures}
					onChange={handleChange}
				/>
				{errors.tel && (
					<span className="text-red-500 ">{errors.tel.message}</span>
				)}
				<div>
					<EmailColorLinkBtn isDisabled={tel.length < 9 ? true : false} type='submit'>{t('textButtonInputRecipientPhone')}</EmailColorLinkBtn>
				</div>
			</div>
		</form>
	);
};

export default AddClientPhoneNumberForm;
