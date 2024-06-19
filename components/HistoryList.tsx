import Link from 'next/link';

import formatTableDate from '@/app/utils/formatTableDate';
import { summarizeHistoryByDate } from '@/helpers/SortHistoryByDate';
import { IHistoryResponce } from '@/globaltypes/historyTypes';
import { SmsStatusEnum } from '@/globaltypes/types';

type Props = {
  userHistory: IHistoryResponce[] | undefined;
};

export default function HistoryList({ userHistory }: Props) {
  const sortHistory = userHistory ? summarizeHistoryByDate(userHistory) : undefined;

  return (
    <ul className="flex flex-col">
      {sortHistory &&
        sortHistory.length !== 0 &&
        sortHistory.map(item => {
          return (
            <li
              key={typeof item.history_id === 'number' ? item.history_id : item.history_id[0]}
              className="flex mb-8 px-[10px] py-3 font-roboto text-[18px] text-black border-b border-[#B5C9BE] md:px-[26px] lg:h-[47px] lg:mb-0 lg:py-0 lg:text-[20px]"
            >
              <div className="hidden md:flex flex-col gap-y-8 w-4/12 font-medium lg:hidden">
                <p className="">Шлях відправлення</p>
                <p className="">Дата</p>
                <p className="">Відправленно</p>
                <p className="">Отримано</p>
              </div>

              <div className="flex flex-col gap-y-2 text-[16px] md:gap-y-8 lg:flex-row lg:items-center lg:gap-[100px]">
              <p className="font-medium md:hidden">Шлях відправлення</p>
                <p className="w-[194px] montserrat text-[14px] md:text-[18px]">{item.send_method}</p>
                <p className="font-medium mt-4 md:hidden">Дата</p>
                <p className="w-[184px] text-[#2366E8] montserrat text-[14px] md:text-[18px]">
                  <Link
                    href={{
                      pathname: `statistics/by-date/`,
                      query: {
                        date: new Date(item.sending_group_date).toString(),
                      },
                    }}
                  >
                    {formatTableDate(item.sending_group_date)}
                  </Link>
                </p>
                <p className="font-medium mt-4 md:hidden">Відправленно</p>
                <p className="w-[150px] montserrat text-[14px] md:text-[18px]">{item.recipient_status.length }</p>
                <p className="font-medium mt-4 md:hidden">Отримано</p>
                <p className="w-[150px] montserrat text-[14px] md:text-[18px]">
                  {item.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield').length}
                </p>
              </div>
            </li>
          );
        })}
      {sortHistory && sortHistory.length > 0 && (
          <li className="order-first flex flex-wrap gap-y-1 items-center lg:h-[47px] w-full mb-3 md:mb-8 py-3 px-[10px] font-roboto font-medium text-sm md:px-[26px] md:text-lg text-black lg:border-b lg:border-[#B5C9BE] lg:text-xl lg:gap-[100px] lg:order-none lg:font-normal">
            <p className="grow w-4/12 md:grow-0 text-base md:text-lg lg:text-xlw-[202px] lg:w-[194px]">Всього</p>
            <p className="block md:hidden w-[184px] text-[#2366E8] lg:block"></p>
            <p className="mr-3 md:mr-[18px] lg:hidden">Відправлено</p> 
            <p className="w-fit lg:w-[150px]">
              {sortHistory?.reduce((acc, item) => acc + item.recipient_status.length, 0)}
            </p>
            <p className="mr-3 md:mr-[18px] ml-[70px] lg:hidden">Отримано</p>
            <p className="w-fit lg:w-[150px]">
              {sortHistory?.reduce(
                (acc, item) =>
                  acc +
                  item.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield')
                    .length,
                0
              )}
            </p>
          </li>
      )}
      {sortHistory && sortHistory.length === 1 && (<li className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"></li>)}
      {(!sortHistory || sortHistory.length === 0) &&
        Array.from({ length: 3 }).map((_, index: number) => {
          return (
            <li
              key={index}
              className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"
            ></li>
          );
        })}
    </ul>
  );
}
