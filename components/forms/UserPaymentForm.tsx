'use client';
import Image from 'next/image';
import GreenButton from '../buttons/GreenButton';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { userPaymant } from '@/helpers/fetchUserId';
import { EnterOnlyFigures } from '@/helpers/EnterOnlyFigures';
import { defineSmsCount } from '@/helpers/DefinSum';
import { fetchUserBalance, updateUserBalance } from '@/api-actions';
import { IUser } from '@/globaltypes/types';
import { getUser } from '@/fetch-actions/usersFetchActions';

type Props = {
  userId: number;
};

const UserPaymentForm = ({ userId }: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const [user, setUser] = useState<IUser>();
  const [isUpdated, setisUpdated] = useState(false);

  const [isPaid, setIsPaid] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await getUser(userId);
				setUser(response?.data.user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData();
	}, [userId, isUpdated]);

  const onSubmit = async (data: any) => {
    await userPaymant(
      userId,
      !isChecked ? data.summ : 0,
      !isChecked ? String(SMS) : `-${inputValue}`,
      isPaid,
      data.description
    );

    setInputValue('0');
    setIsPaid(false);
    setIsChecked(false);
    setisUpdated(prevIsUpdate => !prevIsUpdate);
    reset();
  };

  const handleClickChecked = () => {
    setIsPaid(!isPaid);
  };
  const SMS = defineSmsCount(Number(inputValue));

  const handleClickCheckedCorect = () => {
    setIsChecked(isChecked => !isChecked);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-[426px] flex justify-items-center h-auto py-3  md:py-4 items-center flex-col leading-6 px-3 md:px-[26px] border rounded-[18px] bg-priceTableBg"
    >
      <div className="text-left w-full mb-8 ">
      <p className=" text-center text-l mb-8 italic">
        Поточний баланс: <span className=" text-lg md:text-xl ">{user?.balance}</span>СМС
      </p>
        <span className="flex items-center gap-1 text-base md:text-lg">
          {!isChecked ? (
            <Image
              src="/svg/checkbox-empty.svg"
              width={24}
              height={24}
              alt="Check box"
              onClick={handleClickCheckedCorect}
            />
          ) : (
            <Image
              src="/svg/checkbox-checked.svg"
              width={24}
              height={24}
              alt="Check box checked"
              onClick={handleClickCheckedCorect}
            />
          )}
          Корегувати к-ть СМС
        </span>
        <label htmlFor="summ" className="font-roboto text-sm font-medium mb-2 block mt-2">
          Сумма:
        </label>
        <input
          id="summ"
          {...register('summ')}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input resize-none"
          placeholder={isChecked ? '' : 'Введіть сумму...'}
          onKeyPress={EnterOnlyFigures}
          value={!isChecked ? inputValue : ''}
          onChange={handleInputChange}
          disabled={isChecked}
        />
        <label htmlFor="countSms" className="font-roboto text-sm font-medium mb-2 block mt-4">
          Kількість СМС:
        </label>
        <div className="flex relative">
         {isChecked && <span className="absolute left-3 top-[9px]">-</span>}
          <input
            id="countSms"
            {...register('countSms')}
            className={`w-full border py-2 ${isChecked ? 'pr-11 pl-[20px]' : ' px-3'} focus:outline-none focus:border-blue-500 rounded-[18px] input resize-none`}
            onKeyPress={EnterOnlyFigures}
            value={isChecked ? inputValue : SMS}
            onChange={handleInputChange}
            placeholder={isChecked ? 'Введіть к-ть СМС яку потрібно відняти' : ''}
          />
        </div>
        <label htmlFor="description" className="font-roboto text-sm font-medium mb-2 block  mt-4">
          Додати додаткову інформацію про транзакцію:
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input resize-none"
          rows={4}
          placeholder="Введіть текст..."
        />
        {!isChecked && (
          <span className="flex items-center justify-center mt-4">
            {!isPaid ? (
              <Image
                src="/svg/checkbox-empty.svg"
                width={24}
                height={24}
                alt="Check box"
                onClick={handleClickChecked}
              />
            ) : (
              <Image
                src="/svg/checkbox-checked.svg"
                width={24}
                height={24}
                alt="Check box checked"
                onClick={handleClickChecked}
              />
            )}
            Оплачено
          </span>
        )}
      </div>
      <GreenButton size="big">{isChecked ? 'Корегувати' : 'Поповнити'}</GreenButton>
    </form>
  );
};

export default UserPaymentForm;
