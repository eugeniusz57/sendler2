'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { IHistoryPeriod } from '@/globaltypes/historyTypes';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface FormInputsPeriod {
  startDate: Date;
  endDate: Date;
}

export interface IHistoryPeriodFormProps {
  setHistoryPeriod: (startDate: Date, endDate: Date) => void;
}

export default function HistoryPeriodForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedStartDate = searchParams.get('startDate');
  const selectedEndDate = searchParams.get('endDate');

  const [startDate, setStartDate] = useState<string | null>(selectedStartDate);
  const [endDate, setEndDate] = useState<string | null>(selectedEndDate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHistoryPeriod>({
    resolver: async data => {
      try {
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

  const onSubmit: SubmitHandler<IHistoryPeriod> = () => {
    const trimmedPath = pathname.match(/(\/user\/\d+\/statistics).*/);
    if (startDate && endDate && trimmedPath) {
      router.push(
        `${trimmedPath[1]}?startDate=${startDate}&endDate=${endDate}`
      );
    } else {
      router.push(`${pathname}`);
    }
  };

  const handleChangeStartDate = (date: Date | null) => {
    setStartDate(date ? date.toISOString() : null);
  };

  const handleChangeEndDate = (date: Date | null) => {
    setEndDate(date ? date.toISOString() : null);
  };

  return (
    <div className="px-[10px] md:px-[20px] lg:px-[26px]">
      <p className="mb-10 text-base md:text-xl font-roboto text-[#1B1B30]">Пeріод відправки SMS</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex md:justify-end flex-wrap lg:justify-start lg:items-center lg:flex-nowrap gap-x-1 gap-y-6 md:gap-8 w-full mb-10">
        <label htmlFor="startDate" className="text-xl text-mainTextColor flex cursor-pointer">
          <DatePicker
            id="startDate"
            selected={startDate ? new Date(startDate) : null}
            onChange={handleChangeStartDate}
            isClearable
            className="w-[126px] md:w-[196px] h-12 rounded-[12px] md:rounded-[18px] border border-inputBorder outline-none text-sm md:text-xl text-mainTextColor px-3 cursor-pointer"
            customInput={<input autoComplete="off" />}
            placeholderText="дд.мм.рррр"
            dateFormat="dd.MM.yyyy"
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            maxDate={endDate ? new Date(endDate) : null}
          />
          <Image src="/svg/calendar.svg" width={24} height={24} alt="Check box" className="hidden md:block ml-4" />
        </label>
        <div className="h-px w-3 md:w-6 bg-black self-center"></div>
        <label className="text-xl text-mainTextColor flex cursor-pointer">
          <DatePicker
            id="endDate"
            selected={endDate ? new Date(endDate) : null}
            onChange={handleChangeEndDate}
            isClearable
            className="w-[126px] md:w-[196px] h-12 rounded-[12px] md:rounded-[18px] border border-inputBorder outline-none text-sm md:text-xl text-mainTextColor px-3 cursor-pointer"
            customInput={<input autoComplete="off" />}
            placeholderText="дд.мм.рррр"
            dateFormat="dd.MM.yyyy"
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            minDate={startDate ? new Date(startDate) : null}
          />
          <Image src="/svg/calendar.svg" width={24} height={24} alt="Check box" className="hidden md:block ml-4" />
        </label>
        <br/>
        <button className="grow md:grow-0 flex items-center justify-center py-2.5 px-9 h-[50px] font-roboto bg-[#32BB79] text-white rounded-[14px] text-base">
          Дивитись
        </button>
      </form>
    </div>
  );
}
