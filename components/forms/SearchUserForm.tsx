'use client';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

interface Props {
	getFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchUserForm: React.FC<Props> = ({ getFilter }: Props) => {
	const [isDisabled, setIsDisabled] = useState(true);
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = async () => {
		setIsDisabled(true);

		setIsDisabled(false);
		reset();
	};
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		getFilter(e);
		if (e.target.value) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};

	return (
		<form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className='text-center'>
			<label htmlFor="login" className="block mb-3.5 label">
				Пошук за логінем користувача
			</label>
			<div className="flex">
				<input
					id="login"
					type="login"
					{...register('login')}
					className=" w-full md:w-[474px] h-12  px-4 input"
					onChange={onChange}
					required
				/>
			</div>
		</form>
	);
};

export default SearchUserForm;
