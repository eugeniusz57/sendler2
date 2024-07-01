'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Title from '@/components/Title';
import { getUserHistoryDetails } from '@/fetch-actions/historyFetchActions';
import formatToDate from '@/app/utils//fotmatToDate';
import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

type Props = {};

const SiteHistoryDetails = () => {
  const [userHistoryDetails, setUserHistoryDetails] = useState<IHistoryDetailsResponce[]>([]);

  const searchParams = useSearchParams();
  const historyId = searchParams.get('history_id');
  const sendingGroups = Object.keys(
    userHistoryDetails.reduce((acc, obj) => ({ ...acc, [obj.group_name]: obj }), {})
  ).join(', ');

  const memoizedUserHistoryDetails = useCallback(async () => {
    const userHistory: IHistoryDetailsResponce[] | undefined = historyId
      ? await getUserHistoryDetails(historyId)
      : undefined;

    if (userHistory) setUserHistoryDetails(userHistory);
  }, [historyId]);

  useEffect(() => {
    memoizedUserHistoryDetails();
  }, [memoizedUserHistoryDetails]);

  return (
    <div className="content-block mx-auto">
      <div className="lg:ml-[26px]">
        <div className="flex flex-wrap gap-x-[40px] gap-y-[40px] md:flex-nowrap mb-10 text-base md:text-lg lg:text-xl font-roboto text-[#1B1B30]">
          <div className="">
            <p className="mb-4">Відправник</p>
            <p className="mb-4 whitespace-nowrap">Статус розсилки</p>
            <p>Назва групи</p>
          </div>
          <div className="font-montserrat text-base md:text-lg">
            <p className="mb-4 whitespace-nowrap text-[#2366E8]">
              {userHistoryDetails[0] ? userHistoryDetails[0]?.alfa_name : '-'}
            </p>
            <p className="mb-4">
              {userHistoryDetails[0] && formatToDate(userHistoryDetails[0].sending_group_date)?.getTime()  >= new Date().getTime() && userHistoryDetails[0]?.sending_permission === true
                        ? 'Заплановано'
                        : userHistoryDetails[0]?.sending_permission === false
                        ? 'Зупинено'
                        : new Date(userHistoryDetails[0]?.sending_group_date) < new Date() &&
                        userHistoryDetails.some(history => history.recipient_status.some(status => status === 'pending'))
                        ? 'Відправлено'
                        : 'Завершено'}
            </p>
            <p className="max-w-[140px] md:max-w-[210px] lg:max-w-[360px] break-words">{sendingGroups}</p>
          </div>
          <div className="lg:ml-10">
            <p className="mb-4">Текст sms</p>
            <p className="mr-28 font-montserrat break-words text-sm md:text-base">
              {userHistoryDetails[0] ? userHistoryDetails[0]?.text_sms : ''}
            </p>
          </div>
        </div>
      </div>
      <div className="justify-center md:justify-start flex items-center gap-2 lg:gap-[100px] h-[58px] px-[10px] lg:px-[26px] font-roboto text-base md:text-lg lg:text-xl text-white bg-[#417D8A]">
        <p className="md:hidden">Повідомлення</p>
        <p className="hidden md:block w-40">Номер телефону</p>
        <p className="hidden md:block w-48">Дати відправки</p>
        <p className="hidden md:block w-36">Кількість sms</p>
        <p className="hidden md:block w-32">Статус</p>
      </div>

      <ul>
        {userHistoryDetails &&
          userHistoryDetails.length !== 0 &&
          userHistoryDetails.map((item, index) => {
            return (
              <li
                key={index}
                className="flex flex-col  md:py-3 md:px-[10px] text-sm bg-[#fefefe] md:bg-inherit md:text-base md:gap-y-8 md:flex-row md:items-center md:gap-2 lg:gap-[100px] lg:px-[26px] font-roboto lg:text-lg text-black border border-zinc-800 md:border-transparent md:border-x-0 md:border-t-0 md:border-[#B5C9BE]"
              >
                <p data-title="Номер телефону :" className="md:w-40 px-[10px] py-3 md:p-0 text-right md:text-left border-b-2 border-[#B5C9BE] md:border-none before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{item.tel}</p>
                <p data-title="Дати відправки :" className="md:w-48 px-[10px] py-3 md:p-0 text-right md:text-left border-b-2 border-[#B5C9BE] md:border-none before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{item.sending_group_date.toLocaleString()}</p>
                <p data-title="Кількість sms :" className="md:w-36 px-[10px] py-3 md:p-0 text-right md:text-left border-b-2 border-[#B5C9BE] md:border-none before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{item.recipient_status.length}</p>
                <p data-title="Статус :" className="md:w-32 py-3 px-[10px] md:p-0 text-right md:text-left border-b-2 border-[#B5C9BE] md:border-none before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
                  {item.recipient_status.every(item => item === 'fullfield')
                    ? 'Доставлено'
                    : 'Недоставлено'}
                </p>
              </li>
            );
          })}

        {(!userHistoryDetails || userHistoryDetails.length < 3) &&
          Array.from({ length: 3 - userHistoryDetails.length }).map((_, index: number) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
              ></li>
            );
          })}
      </ul>
    </div>
  );
};

export default SiteHistoryDetails;
