'use client';

import { useForm, SubmitHandler } from "react-hook-form";

import { schemaReqCreateGroup } from "@/models/sending-groups";
import { createGroup } from "@/fetch-actions/groupsFetchActions";
import GreenButton from "@/components/buttons/GreenButton";

import { IGroupName } from "@/globaltypes/types";

type Props = {
	id: number | undefined;
	getGroups: () => void;
};

export default function CreateGroupForm({ id, getGroups }: Props) {

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IGroupName>({
		resolver: async (data) => {
			try {
				await schemaReqCreateGroup.validateAsync(data, { abortEarly: false });
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
							};
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

	const onSubmit: SubmitHandler<IGroupName> = async (data) => {
		await createGroup(data.group_name, id);
		getGroups();
		reset({ group_name: '' });
	}
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className='md:mb-[50px] mb-[40px] lg:px-[26px] md:px-[20px] px-[10px]'>
			<label htmlFor='group_name' className='block mb-3.5 label lg:text-xl md:text-lg sm:text-base text-base'>
				Назва групи
			</label>
			<div className='flex md:flex-row flex-col lg:gap-8 md:gap-[22px] gap-6 items-center md:mt-3 mt-2'>
				<div className="md:w-[474px] w-full">
					<input id="group_name"
						type='text'
						{...register("group_name")}
						className='md:w-[474px] w-full h-12 px-4 input'
						required
					/>
					{errors.group_name && (
						<span className="text-red-500">{errors.group_name.message}</span>
					)}
				</div>
				<GreenButton size="normal">Створити</GreenButton>
			</div>
		</form>
	);
};


