import Title from "@/components/Title";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Services: React.FC = () => {
	const t = useTranslations('ServicesPage');
	return (
		<>
			<section className="bg-[url('/bg-services-mobile.jpg')] md:bg-[url('/bg-services-tablet.jpg')] lg:bg-[url('/bg-services.jpg')]  bg-cover flex flex-col items-center pt-[206px]  h-[400px]  md:h-[532px]  lg:h-[606px] w-full">
				<div className="container ">
					<Title type="h1" color="light">
						{" "}
						{t('pageTitle')}.
					</Title>
				</div>
			</section>

			<section className="container pt-7 md:pt-20 flex flex-col">
				<div className=" flex  flex-col lg:flex-row w-full  ">
					<ul className=" md:mr-[88px] lg:mr-[174px] lg:w-[636px] lg:pt-[100px]">
						<li className=" mb-6 md:mb-8">
							<p className=" text-sm md:text-base">
								{t('text_part1')}
							</p>
						</li>
						<li>
							<p className=" text-sm md:text-base">
								{t('text_part2')}
							</p>
						</li>
					</ul>
					<ul className="flex flex-col ml-auto lg:ml-0 mt-[50px] lg:mt-0 gap-[22px] font-montserrat">
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/1.svg"
									width={16}
									height={54}
									alt="number"
								/>
							</span>
							<p className=" ml-7 md:ml-10 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_1')}
							</p>
						</li>
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/2.svg"
									width={32}
									height={54}
									alt="number"
								/>
							</span>
							<p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_2')}
							</p>
						</li>
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/3.svg"
									width={32}
									height={54}
									alt="number"
								/>
							</span>
							<p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_3')}
							</p>
						</li>
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/4.svg"
									width={34}
									height={54}
									alt="number"
								/>
							</span>
							<p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_4')}
							</p>
						</li>
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/5.svg"
									width={32}
									height={54}
									alt="number"
								/>
							</span>
							<p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_5')}
							</p>
						</li>
					</ul>
				</div>
				<p className="mt-[50px] md:mt-20 font-roboto text-base md:text-[18px] lg:text-[20px]">
					{t('textEnd')}
				</p>
			</section>
		</>
	);
};

export default Services;

// import QuestionSegment from '@/components/QuestionSegment ';
// import Title from '@/components/Title';
// import { FormFeedback } from '@/components/forms/FormFeedback';
// import { useTranslations } from 'next-intl';

// const Question: React.FC = () => {
// 	const t = useTranslations('QuestionsPage');
// 	const ArrayQuestions = [
// 		{
// 			id: 1,
// 			title: t('titleQuestion_1'),
// 			desc: t('textQuestion_1'),
// 			email: undefined,
// 		},
// 		{
// 			id: 2,
// 			title: t('titleQuestion_2'),
// 			desc: t('textQuestion_2'),
// 			email: undefined,
// 		},
// 		{
// 			id: 3,
// 			title: t('titleQuestion_3'),
// 			desc: t('textQuestion_3'),
// 			email: undefined,
// 		},
// 		{
// 			id: 4,
// 			title:
// 				t('titleQuestion_4'),
// 			desc: t('textQuestion_4'),
// 			email: 'info@bsender.com.ua.',
// 		},
// 		{
// 			id: 5,
// 			title: t('titleQuestion_5'),
// 			desc: t('textQuestion_5'),
// 			email: 'info@bsender.com.ua.',
// 		},
// 	];
// 	return (
// 		<>
// 			<section className="bg-[url('/bg-questions-mobile.jpg')] md:bg-[url('/bg-questions-tablet.jpg')] lg:bg-[url('/bg-questions.jpg')]  bg-cover flex flex-col items-center pt-[193px]  h-[400px]  md:h-[532px]  lg:h-[606px] w-full ">
// 				<div className="container ">
// 					<Title type="h1" color="light">
// 						{t('pageTitle')}
// 					</Title>
// 				</div>
// 			</section>
// 			<section className="pt-20 flex flex-col lg:items-left container">
// 				<ul className="lg:w-max-[1076px]">
// 					{ArrayQuestions.map(({ id, title, desc, email }) => {
// 						return (
// 							<li
// 								key={id}
// 								className="bg-formBg dark:bg-darkItems pr-3 lg:pr-7 lg:pl-5 pl-3  rounded-[18px] mb-[14px] md:mb-[22px] lg:max-w-[1076px] w-full"
// 							>
// 								<QuestionSegment title={title} desc={desc} email={email} />
// 							</li>
// 						);
// 					})}
// 				</ul>
// 			</section>

// 			<section className="container pt-[62px]  md:pt-20 flex flex-col items-start">
// 				<Title type="h1" color="dark">
// 					{t('title')}
// 				</Title>
// 				<div className="block lg:flex mt-7 md:mt-[60px] lg:justify-between w-full">
// 					<ul className="lg:max-w-[625px] mb-[50px] mb:mb-20 lg:mb-0 lg:pt-[86px]">
// 						<li className="pb-[24px] md:pb-8">
// 							<p>
// 								{t('text_part1')}
// 								<br />
// 								{t('text_part2')}<br />
// 								{t('text_part3')}<br />
// 								{t('text_part4')}
// 							</p>
// 						</li>
// 						<li>
// 							<p>
// 								{t('text_part5')}
// 							</p>
// 						</li>
// 					</ul>
// 					<FormFeedback onClose={undefined} />
// 				</div>
// 			</section>
// 		</>
// 	);
// };

// export default Question;

// 'use client';

// import { toast } from 'react-toastify';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { validationSchemaFeedback } from '@/models/forms';
// import { FormInputFeedback } from '@/globaltypes/types';
// import GreenButton from '../buttons/GreenButton';
// import Image from 'next/image';
// import { EnterOnlyFigures } from '@/helpers/EnterOnlyFigures';
// import { useTranslations } from 'next-intl';

// interface Props {
// 	onClose: (() => void) | undefined;
// 	title?: string;
// 	cross?: boolean;
// };

// const FormFeedback: React.FC<Props> = ({ onClose, title, cross }) => {
// 	const t = useTranslations('QuestionsPage');
// 	const {
// 		register,
// 		handleSubmit,
// 		reset,
// 		formState: { errors },
// 	} = useForm<FormInputFeedback>({
// 		resolver: async data => {
// 			try {
// 				await validationSchemaFeedback.validateAsync(data, {
// 					abortEarly: false,
// 				});
// 				return { values: data, errors: {} };
// 			} catch (error: any) {
// 				const validationErrors: Record<string, { message: string }> = {};
// 				if (error.details) {
// 					error.details.forEach((detail: { context: { key: string | number }; message: any }) => {
// 						if (detail.context && detail.context.key) {
// 							validationErrors[detail.context.key] = {
// 								message: detail.message,
// 							};
// 						}
// 					});
// 				}

// 				return {
// 					values: {},
// 					errors: validationErrors,
// 				};
// 			}
// 		},
// 	});

// 	const onSubmit: SubmitHandler<FormInputFeedback> = async data => {
// 		reset();
// 		{
// 			onClose && onClose();
// 		}

// 		toast.success('Вашу заявку отримано. Ми відповімо на неї якнайшвидше.');
// 	};

// 	return (
// 		<form
// 			autoComplete="off"
// 			onSubmit={handleSubmit(onSubmit)}
// 			className=" relative md:w-[526px] w-full mx-auto pb-7 md:pb-11 pt-[29px]  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg dark:bg-darkItems px-[10px] md:px-[26px]"
// 		>
// 			{cross && (
// 				<button
// 					className=" absolute top-4 right-4 transform transition-transform hover:rotate-90 hover:scale-110"
// 					onClick={onClose}
// 				>
// 					<Image src={'/svg/cross-circle.svg'} alt="close modal button" width={34} height={34} />
// 				</button>
// 			)}
// 			{title && <h1 className="form-title mb-8 mt-[15px]">{title}</h1>}
// 			<div className="text-left w-full mb-8">
// 				<label htmlFor="name" className="font-roboto text-xs md:text-sm font-medium mb-2 block">
// 					{t('titleInput_1')}
// 				</label>
// 				<div className="flex relative">
// 					{' '}
// 					<input
// 						id="name"
// 						type="text"
// 						{...register('name')}
// 						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
// 						placeholder="Іванов Іван Іванович"
// 					/>
// 					{errors.name && <span className="form-errors">{errors.name.message}</span>}
// 				</div>

// 				<label htmlFor="phone" className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block">
// 					{t('titleInput_2')}
// 				</label>
// 				<div className="flex relative">
// 					<span className="absolute left-3 top-[9px]">+380</span>
// 					<input
// 						id="phone"
// 						type="tel"
// 						onKeyPress={EnterOnlyFigures}
// 						{...register('phone')}
// 						className="w-full border py-2 pr-11 pl-[50px] focus:outline-none focus:border-blue-500 rounded-[18px] input"
// 					/>
// 					{errors.phone && <span className="form-errors">{errors.phone.message}</span>}
// 				</div>

// 				<label htmlFor="email" className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block">
// 					{t('titleInput_3')}<span className=" text-redStar">*</span>
// 				</label>

// 				<div className="flex relative">
// 					{' '}
// 					<input
// 						id="email"
// 						type="text"
// 						{...register('email')}
// 						className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
// 						placeholder="Email@gmail.com"
// 						required
// 					/>
// 					{errors.email && <span className="form-errors">{errors.email.message}</span>}
// 				</div>

// 				<label htmlFor="desc" className="font-roboto text-xs md:text-sm font-medium mb-2 mt-[22px] md:mt-8 block">
// 					{t('titleInput_4')}<span className=" text-redStar">*</span>
// 				</label>
// 				<div className="flex relative">
// 					{' '}
// 					<textarea
// 						id="desc"
// 						{...register('desc')}
// 						className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input h-[150px] resize-none"
// 						placeholder="Введіть текст..."
// 						required
// 					/>
// 					{errors.desc && <span className="form-errors ">{errors.desc.message}</span>}
// 				</div>
// 			</div>
// 			<GreenButton size="big">{t('textButton')}</GreenButton>
// 		</form>
// 	);
// };

// export { FormFeedback };