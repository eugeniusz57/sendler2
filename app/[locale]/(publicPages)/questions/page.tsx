import QuestionSegment from '@/components/QuestionSegment ';
import Title from '@/components/Title';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { useTranslations } from 'next-intl';

const Question: React.FC = () => {
	const t = useTranslations('QuestionsPage');
	const ArrayQuestions = [
		{
			id: 1,
			title: t('titleQuestion_1'),
			desc: t('textQuestion_1'),
			email: undefined,
		},
		{
			id: 2,
			title: t('titleQuestion_2'),
			desc: t('textQuestion_2'),
			email: undefined,
		},
		{
			id: 3,
			title: t('titleQuestion_3'),
			desc: t('textQuestion_3'),
			email: undefined,
		},
		{
			id: 4,
			title:
				t('titleQuestion_4'),
			desc: t('textQuestion_4'),
			email: 'info@bsender.com.ua.',
		},
		{
			id: 5,
			title: t('titleQuestion_5'),
			desc: t('textQuestion_5'),
			email: 'info@bsender.com.ua.',
		},
	];
	return (
		<>
			<section className="bg-[url('/bg-questions-mobile.jpg')] md:bg-[url('/bg-questions-tablet.jpg')] lg:bg-[url('/bg-questions.jpg')]  bg-cover flex flex-col items-center pt-[193px]  h-[400px]  md:h-[532px]  lg:h-[606px] w-full ">
				<div className="container ">
					<Title type="h1" color="light">
						{t('pageTitle')}
					</Title>
				</div>
			</section>
			<section className="pt-20 flex flex-col lg:items-left container">
				<ul className="lg:w-max-[1076px]">
					{ArrayQuestions.map(({ id, title, desc, email }) => {
						return (
							<li
								key={id}
								className="bg-formBg dark:bg-darkItems pr-3 lg:pr-7 lg:pl-5 pl-3  rounded-[18px] mb-[14px] md:mb-[22px] lg:max-w-[1076px] w-full"
							>
								<QuestionSegment title={title} desc={desc} email={email} />
							</li>
						);
					})}
				</ul>
			</section>

			<section className="container pt-[62px]  md:pt-20 flex flex-col items-start">
				<Title type="h1" color="dark">
					{t('title')}
				</Title>
				<div className="block lg:flex mt-7 md:mt-[60px] lg:justify-between w-full">
					<ul className="lg:max-w-[625px] mb-[50px] mb:mb-20 lg:mb-0 lg:pt-[86px]">
						<li className="pb-[24px] md:pb-8">
							<p>
								{t('text_part1')}
								<br />
								{t('text_part2')}<br />
								{t('text_part3')}<br />
								{t('text_part4')}
							</p>
						</li>
						<li>
							<p>
								{t('text_part5')}
							</p>
						</li>
					</ul>
					<FormFeedback onClose={undefined} />
				</div>
			</section>
		</>
	);
};

export default Question;
