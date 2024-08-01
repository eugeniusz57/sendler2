import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
	recipient: string | number;
	index: number;
	register: UseFormRegister<FieldValues>
	onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Recipient = ({
	recipient,
	index,
	register,
	onSelect
}: Props) => {
	return (
		<li className="flex w-max-full px-[26px] items-center h-[36px] text-base font-montserrat font-normal">
			<input
				id={String(index)}
				{...register(`${index}`)}
				placeholder="bluebill1049@hotmail.com"
				type="checkbox"
				onChange={onSelect}
			/>
			<label htmlFor={String(index)} className=""></label>
			<div className="ml-[15px] text-left truncate">
				{(typeof recipient) === 'number' ? `+${recipient}` : recipient}
			</div>
		</li>
	)
}

export default Recipient;

