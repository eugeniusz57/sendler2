import Image from "next/image";
import React from "react";

type Props = {
	show: boolean;
	onClick: () => void;
};

const ShowPassword: React.FC<Props> = ({ show, onClick }) => {
	return (
		<button className="absolute top-1 right-3 " type="button" onClick={onClick}>
			<Image className=" dark:invert"
				src={show ? "/svg/showPasword.svg" : "/svg/hide-password.svg"}
				width={32}
				height={32}
				alt="button show password"
			/>
		</button>
	);
};

export default ShowPassword;
