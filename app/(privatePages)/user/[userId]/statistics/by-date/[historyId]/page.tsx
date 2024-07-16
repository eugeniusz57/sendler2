'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import * as XLSX from 'xlsx/xlsx.mjs';
import Title from '@/components/Title';
import BackStatisticsBtn from '@/components/buttons/BackStatisticsBtn';
import { getUserHistoryDetails } from '@/fetch-actions/historyFetchActions';
import {charAndSmsCount} from '@/app/utils/charAndSmsCount';
import formatToDate from '@/app/utils//fotmatToDate';
import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

export default function HistoryDetails({
  params,
}: {
  params: { userId: string; historyId: string };
}) {
  const [userHistoryDetails, setUserHistoryDetails] = useState<IHistoryDetailsResponce[]>([]);

  const userId = Number(params.userId);
  const historyId = String(params.historyId);

  const memoizedUserHistoryDetails = useCallback(async () => {
    const userHistory: IHistoryDetailsResponce[] | undefined = await getUserHistoryDetails(
      historyId
    );

    if (userHistory) setUserHistoryDetails(userHistory);
  }, [historyId]);

  useEffect(() => {
    memoizedUserHistoryDetails();
  }, [memoizedUserHistoryDetails]);

  const handleClick = async () => {
    try {
      const formatedHistory: any[] = [];

      userHistoryDetails.forEach(history => {
        formatedHistory.push({
          ['Одержувач']: history.tel,
          ['Відправник']: history.alfa_name,
          ['Відправлено']: history.sending_group_date,
          ['Статус']: history.recipient_status.every(item => item === 'fullfield')
            ? 'Доставлено'
            : 'Недоставлено',
          ['Текст повідомлення']: history.text_sms,
        });
      });

      const keysObject = Object.keys(formatedHistory[0]);
      const ws = XLSX.utils.json_to_sheet(formatedHistory, {
        header: keysObject,
      });

      if (!ws['!cols']) ws['!cols'] = [];
      const range = XLSX.utils.decode_range(ws['!ref']);
      const width = 20;
      for (let i = range.s.c; i <= range.e.c; i++) {
        ws['!cols'][i] = { wch: width };
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, ws, 'Sheet 1');
      XLSX.writeFile(workbook, `Statistics.xlsx`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto">
      <Title type="h1" color="dark">
        Детальна статистика
      </Title>
      <div className="content-block mt-[28px] md:mt-[60px]">
        <div className="mx-[10px] md:mx-[26px]">
          <div className="flex items-center gap-3 mb-[14px] md:mb-5">
            <p className="text-base md:text-lg lg:text-xl font-roboto text-[#1B1B30]">Розсилки за</p>
            <button type="button" onClick={handleClick}>
              <Image src="/svg/excel.svg" alt="Excel icon" width={42} height={42} className="hidden md:block"/>
              <Image src="/svg/excel.svg" alt="Excel icon" width={30} height={30} className="md:hidden"/>
            </button>
          </div>
          <BackStatisticsBtn>
            <p className='text-left text-sm md:text-base'>Повернутись до загальної статистики за день</p>
          </BackStatisticsBtn>
          <div className="flex flex-wrap gap-y-[40px] lg:flex-nowrap mb-10 text-base md:text-lg lg:text-xl font-roboto text-[#1B1B30]">
            <div className="flex-none md:w-40 mr-8">
              <p className="mb-4 ">Відправник</p>
              <p className="mb-4">Статус розсилки</p>
              <p>Назва групи</p>
            </div>
            <div className="w-2/5 font-montserrat self-stretch text-sm md:mr-28 md:text-base lg:text-lg">
              <p className="mb-[22px] lg:mb-4 text-[#2366E8]">
                {userHistoryDetails[0] ? userHistoryDetails[0]?.alfa_name : '-'}
              </p>
              <p className="mb-[22px] lg:mb-4">
                    {userHistoryDetails[0] && formatToDate(userHistoryDetails[0].sending_group_date)?.getTime()  >= new Date().getTime() && userHistoryDetails[0]?.sending_permission === true
                        ? 'Заплановано'
                        : userHistoryDetails[0]?.sending_permission === false
                        ? 'Зупинено'
                        : new Date(userHistoryDetails[0]?.sending_group_date) < new Date() &&
                        userHistoryDetails.some(history => history.recipient_status.some(status => status === 'pending'))
                        ? 'Відправлено'
                        : 'Завершено'}
              </p>
              <p  className="max-w-[300px] break-words">{Array.from(new Set(userHistoryDetails.map(obj => obj.group_name))).join(', ')}</p>
            </div>
            <br/>
            <div className="w-full">
              <p className="mb-3 md:mb-4">Текст повідомлення</p>
              <p className="lg:w-[440px] xl:w-[560px] font-montserrat text-sm break-words md:text-base">
                {userHistoryDetails[0] ? userHistoryDetails[0]?.text_sms : '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="justify-center lg:justify-start flex items-center gap-[100px] h-[58px] px-[26px] font-roboto text-lg lg:text-xl text-white bg-[#417D8A]">
          <p className="lg:hidden">Повідомлення</p>
          <p className="hidden lg:block w-[166px]">Номер телефону</p>
          <p className="hidden lg:block w-[196px]">Дати відправки</p>
          <p className="hidden lg:block w-[130px]">Кількість sms</p>
          <p className="hidden lg:block w-[130px]">Статус</p>
        </div>

        <ul>
          {userHistoryDetails &&
            userHistoryDetails.length !== 0 &&
            userHistoryDetails.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center gap-x-8 mb-8 py-3 px-[10px] font-roboto text-l text-black border-b border-[#B5C9BE] md:px-[26px] lg:h-[47px] lg:mb-0 lg:py-0 lg:gap-[100px]"
                >
                  <div className="hidden md:flex flex-col gap-y-8 font-medium lg:hidden">
                    <p className="">Номер телефону</p>
                    <p className="">Дати відправки</p>
                    <p className="">Кількість sms</p>
                    <p className="">Статус</p>
                  </div>

                  <div className="flex flex-col gap-y-2 text-base md:gap-y-8 lg:flex-row lg:items-center lg:gap-[100px]">
                    <p className="font-medium md:hidden">Номер телефону</p>
                    <p className="w-[166px] montserrat text-sm md:text-lg">{item.tel}</p>
                    <p className="font-medium mt-4 md:hidden">Дати відправки</p>
                    <p className="w-[196px] montserrat text-sm md:text-lg">
                      {String(item.sending_group_date)}
                    </p>
                    <p className="font-medium mt-4 md:hidden">Кількість sms</p>
                    <p className="w-[130px] montserrat text-sm md:text-lg">{item.recipient_status.length}</p>
                    <p className="font-medium mt-4 md:hidden">Статус</p>
                    <p className="w-[130px] montserrat text-sm md:text-lg">
                      {item.recipient_status.every(item => item === 'fullfield')
                        ? 'Доставлено'
                        : 'Недоставлено'}
                    </p>
                  </div>
                </li>
              );
            })}

          {(!userHistoryDetails || userHistoryDetails.length < 3) &&
            Array.from({ length: 3 - userHistoryDetails.length }).map((_, index: number) => {
              return (
                <li
                  key={index}
                  className="flex items-center justify-between mb-8 py-3 lg:mb-0 lg:py-0 lg:h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
                ></li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
