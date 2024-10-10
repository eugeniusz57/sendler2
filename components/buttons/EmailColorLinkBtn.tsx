import { ReactNode } from "react";

interface IButtonProps {
	onClick?: () => void;
	children: ReactNode;
	isDisabled?: boolean;
	type?: "submit" | "button";
};

const EmailColorLinkBtn: React.FC<IButtonProps> = ({ onClick, children, isDisabled, type = "submit" }) => {
	return (
		<button
			type={type}
			className={`mt-2 text-emailColorLink dark:text-darkLink md:text-base text-sm md:leading-6 leading-[21px]  ${isDisabled ? 'opacity-50' : 'opacity-100 cursor-pointer'}`}
			onClick={onClick}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default EmailColorLinkBtn;