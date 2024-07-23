'use client';

import { useForm, SubmitHandler } from "react-hook-form";

import { schemaSearchClient } from "@/models/clients";
import { useState } from "react";
import GreenButton from "../buttons/GreenButton";
import { EnterOnlyFigures } from "@/helpers/EnterOnlyFigures";

interface IFormInput {
	tel: string;
}

interface Props {
	getFilter: (e: any) => void;
	resetFilter: () => void;
}

export default function SearchClientForm({ getFilter, resetFilter }: Props) {
	const [isDisabled, setIsDisabled] = useState(true);
	const [filter, setFilter] = useState('380');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: async (data) => {
			try {
				await schemaSearchClient.validateAsync(data, { abortEarly: false });
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

	const onChange = (e: any) => {
		getFilter(e);
		setFilter(e.target.value);
		if (e.target.value) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		};
	};

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {

		setIsDisabled(true);
		reset({ tel: '' });
		setFilter('380');
		resetFilter();
		setIsDisabled(false);
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<label htmlFor='tel' className='block mb-3.5 label lg:text-xl md:text-lg sm:text-base text-base'>
				Пошук за номером телефону
			</label>
			<div className="flex md:flex-row flex-col lg:gap-8 md:gap-[22px] gap-6 items-center md:mt-3 mt-2">
				<div className="md:w-[474px] w-full">
					<input id="tel"
						type='tel'
						value={filter}
						{...register("tel")}
						className='md:w-[474px] w-full h-12 px-4 input'
						onChange={onChange}
						onKeyDown={EnterOnlyFigures}
						required
					/>
					{errors.tel && (
						<span className="form-errors">{errors.tel.message}</span>
					)}
				</div>
				<GreenButton size="normal" isDisabled={isDisabled}>Скинути</GreenButton>
			</div>
		</form>
	);
};

