import { ReactNode } from "react";

interface IButtonProps {
	size: "big" | "normal";
	onClick?: () => void;
	children: ReactNode;
	isDisabled?: boolean;
	isActive?: boolean;
	type?: "submit" | "button";
}

const GreenButton = ({ size, onClick, children, isDisabled, isActive, type = "submit" }: IButtonProps) => {
	return (
		<button
			type={type}
			className={`${size === "big" ? "md:w-[198px] w-full" : "md:w-[144px] w-full"
				} py-[10px] rounded-[14px] ${isDisabled ? 'bg-disable text-textDisable' : isActive ? 'bg-hoverGreenBtn text-white' : 'bg-greenBtn hover:bg-hoverGreenBtn text-white'} text-base leading-6 flex items-center justify-center transition-colors`}
			onClick={onClick}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default GreenButton;
