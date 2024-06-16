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
              className="flex gap-x-8 mb-8 py-3 px-[26px] font-roboto text-[18px] text-black border-b border-[#B5C9BE] lg:h-[47px] lg:mb-0 lg:py-0 lg:text-[20px]"
            >
              <div className="flex flex-col gap-y-8 font-medium lg:hidden">
                <p className="">Шлях відправлення</p>
                <p className="">Дата</p>
                <p className="">Відправленно </p>
                <p className="">Отримано</p>
              </div>

              <div className="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-[100px]">
                <p className="w-[194px]">{item.send_method}</p>
                <p className="w-[184px] text-[#2366E8]">
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
                <p className="w-[150px]">{item.recipient_status.length }</p>
                <p className="w-[150px]">
                  {item.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield').length}
                </p>
              </div>
            </li>
          );
        })}
      {sortHistory && sortHistory.length > 0 && (
          <li className="order-first flex items-center h-[47px] mb-9 px-[26px] font-roboto font-medium text-[18px] text-black lg:border-b lg:border-[#B5C9BE] lg:text-[20px] lg:gap-[100px] lg:order-none lg:font-normal">
            <p className="w-[202px] lg:w-[194px]">Всього</p>
            <p className="hidden w-[184px] text-[#2366E8] lg:block"></p>
            <p className="mr-[18px] lg:hidden">Відправлено</p> 
            <p className="w-fit lg:w-[150px]">
              {sortHistory?.reduce((acc, item) => acc + item.recipient_status.length, 0)}
            </p>
            <p className="mr-[18px] ml-[70px] lg:hidden">Отримано</p>
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
