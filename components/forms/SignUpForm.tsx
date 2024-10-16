'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validationSchemaSignUp } from '@/models/forms';
import { FormInputsSignUp } from '@/globaltypes/types';
import GreenButton from '../buttons/GreenButton';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ShowPassword from '../buttons/ShowPassword';
import { fetchUserId } from '@/helpers/fetchUserId';
import { EnterOnlyFigures } from '@/helpers/EnterOnlyFigures';
import axios from 'axios';
import Image from 'next/image';
import useWindowWidth from '@/helpers/windowsSize';

const SingUpForm: React.FC = () => {
  const width = useWindowWidth() ?? 0;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsSignUp>({
    resolver: async data => {
      try {
        await validationSchemaSignUp.validateAsync(data, { abortEarly: false });
        return { values: data, errors: {} };
      } catch (error: any) {
        const validationErrors: Record<string, { message: string }> = {};
        if (error.details) {
          error.details.forEach((detail: { context: { key: string | number }; message: any }) => {
            if (detail.context && detail.context.key) {
              validationErrors[detail.context.key] = {
                message: detail.message,
              };
            }
          });
        }
        return {
          values: {},
          errors: validationErrors,
        };
      }
    },
  });

  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClickChecked = () => {
    setIsDisabled(!isDisabled);
  };

  const onSubmit: SubmitHandler<FormInputsSignUp> = async data => {
    setIsDisabled(true);

    try {
      const res = await axios.post('/api/users/signup', {
        email: data.email,
        user_login: data.login,
        user_password: data.password,
        tel: `380${data.phone}`,
        user_name: data.name,
      });

      if (res.data.users.length !== 0) {
        const userId = await fetchUserId(data.login);

        const credentialsRes = await signIn('credentials', {
          login: data.login,
          password: data.password,
          redirect: false,
        });

        if (credentialsRes && !credentialsRes.error) {
          router.push(`/user/${userId}/mailing-list`);
          toast.success(`Ласкаво просимо ${data.login}`);
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }

    setIsDisabled(false);
  };
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-[308px] md:w-[526px] flex justify-items-center  items-center flex-col leading-6 px-0 md:px-[26px] "
    >
      <div className="text-left w-full mb-8">
        <label htmlFor="name" className="font-roboto text-xs md:text-sm font-medium mb-2 block">
          Ім’я<span className=" text-redStar">*</span>
        </label>
        <div className="flex relative">
          {' '}
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input"
            placeholder="Іван"
            required
          />
          {errors.name && <span className="form-errors block">{errors.name.message}</span>}
        </div>

        <label
          htmlFor="phone"
          className="font-roboto text-xs md:text-sm font-medium mb-2  mt-8 block"
        >
          Телефон<span className=" text-redStar">*</span>
        </label>
        <div className="flex relative">
          <span className="absolute left-3 top-[9px]">+380</span>
          <input
            id="phone"
            type="tel"
            maxLength={9}
            onKeyPress={EnterOnlyFigures}
            {...register('phone')}
            className="w-full border py-2 pr-11 pl-[50px] focus:outline-none focus:border-blue-500 rounded-[18px] input"
            required
          />
          {errors.phone && <span className="form-errors block">{errors.phone.message}</span>}
        </div>

        <label
          htmlFor="email"
          className="font-roboto text-xs md:text-sm font-medium mb-2  mt-8 block"
        >
          Пошта<span className=" text-redStar">*</span>
        </label>
        <div className="flex relative">
          <input
            id="email"
            type="text"
            {...register('email')}
            className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input"
            placeholder="Email@gmail.com"
            required
          />
          {errors.email && <span className="form-errors block">{errors.email.message}</span>}
        </div>

        <label
          htmlFor="login"
          className="font-roboto text-xs md:text-sm font-medium mb-2  mt-8 block"
        >
          Логін<span className=" text-redStar">*</span>
        </label>
        <div className="flex relative">
          <input
            id="login"
            type="text"
            {...register('login')}
            className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input"
            placeholder="Іван_Ivan@"
            required
          />
          {errors.login && <span className="form-errors block">{errors.login.message}</span>}
        </div>

        <label
          htmlFor="password"
          className="font-roboto text-xs md:text-sm font-medium mb-2  mt-8 block"
        >
          Пароль<span className=" text-redStar">*</span>
        </label>
        <div className="flex relative">
          <input
            id="password"
            type={show ? 'text' : 'password'}
            {...register('password')}
            className="w-full border py-2 pl-3 pr-11 focus:outline-none focus:border-blue-500 rounded-[18px] input"
            required
          />
          <ShowPassword show={show} onClick={() => setShow(!show)} />{' '}
          {errors.password && <span className="form-errors ">{errors.password.message}</span>}
        </div>

        <label
          htmlFor="repeatPassword"
          className="font-roboto text-xs md:text-sm font-medium mb-2  mt-8 block"
        >
          Підтвердіть пароль<span className=" text-redStar">*</span>
        </label>
        <div className="flex relative">
          <input
            id="repeatPassword"
            type={show ? 'text' : 'password'}
            {...register('repeatPassword')}
            className="w-full border py-2 pl-3 pr-11 focus:outline-none focus:border-blue-500 rounded-[18px] input"
            required
          />
          <ShowPassword show={show} onClick={() => setShow(!show)} />
          {errors.repeatPassword && (
            <span className="form-errors ">{errors.repeatPassword.message}</span>
          )}
        </div>
        <span className="flex items-center justify-center mt-4 text-[11px] md:text-sm">
          {isDisabled ? (
            <Image
              className=" dark:invert"
              src="/svg/checkbox-empty.svg"
              width={width < 710 ? 15 : 24}
              height={width < 710 ? 15 : 24}
              alt="Check box"
              onClick={handleClickChecked}
            />
          ) : (
            <Image
              className=" dark:invert"
              src="/svg/checkbox-checked.svg"
              width={width < 710 ? 15 : 24}
              height={width < 710 ? 15 : 24}
              alt="Check box checked"
              onClick={handleClickChecked}
            />
          )}
          <span className="  text-redStar"> * </span> Я даю згоду на обробку моїх персональних даних
        </span>
      </div>
      <GreenButton size="big" isDisabled={isDisabled}>
        Реєстрація
      </GreenButton>
    </form>
  );
};

export { SingUpForm };
