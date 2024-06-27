import React from 'react';
import Link from 'next/link';
import { countSuccessfullySentNumbers } from '@/helpers/getCountSuccessfullySentNumbers';
import formatTableDate from '@/app/utils/formatTableDate';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';

type Props = { userHistory: IHistoryResponce[] };

const TableStatisticsPerDay = ({ userHistory }: Props) => {
  return (
    <table className="w-full border bg-priceTableBg text-center">
      <thead className="bg-lightGreen">
        <tr className="bg-headerTable text-white text-base lg:text-xl font-roboto leading-[30px] ">
          <th className="md:hidden py-[10px] px-3 border font-roboto text-xl font-normal w-full">Розсилки</th>
          <th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">ID</th>
          <th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">Текст</th>
          <th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">СМС імя</th>
          <th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">Статус</th>
          <th className="hidden lg:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">Кіл-ть смс</th>
          <th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">Дост. смс</th>
          <th className="hidden lg:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">Кіл-ть номерів</th>
          <th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">Дост. номерів</th>
          <th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">Дата та час</th>
          <th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-base lg:text-xl font-normal">Деталі</th>
        </tr>
      </thead>

      <tbody className=" text-xl">
        {userHistory.map((elem: IHistoryResponce, index: number) => (
          <tr key={index} className="block md:table-row border border-zinc-800 md:border-none">
            <td data-title="ID :" className="block md:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.history_id}</td>
            <td data-title="Текст :" className="block md:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold"><p className="line-clamp-3">{elem.text_sms}</p></td>
            <td data-title="СМС імя :" className="block md:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.alfa_name}</td>
            <td data-title="Статус :" className="block md:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
                {new Date(elem.sending_group_date) >= new Date() && elem.sending_permission === true
                        ? 'Заплановано'
                        : elem.sending_permission === false
                        ? 'Зупинено'
                        : new Date(elem.sending_group_date) < new Date() &&
                        elem.recipient_status.some(item => item === 'pending')
                        ? 'Відправлено'
                        : 'Завершено'}
            </td>
            <td data-title="Кіл-ть смс :" className="hidden lg:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
              {elem.recipient_status.length}
            </td>
            <td data-title="Дост. смс :" className="block md:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
              {elem.recipient_status.filter(item => item === 'fullfield').length}<span className="lg:hidden">/{elem.recipient_status.length}</span>
            </td>
            <td data-title="Кіл-ть номерів :" className="hidden lg:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
              {Array.from(new Set(elem.clients)).length}
            </td>
            <td data-title="Дост. номерів :" className="block md:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
              {countSuccessfullySentNumbers(elem)}<span className="lg:hidden">/{Array.from(new Set(elem.clients)).length}</span>
            </td>
            <td data-title="Дата та час :" className="block md:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
              {new Date(elem.sending_group_date).toLocaleString('uk-UA')}
            </td>
            <td data-title="Деталі :" className="block md:table-cell text-right md:text-center py-3 px-2 lg:py-4 lg:px-3 border font-montserrat text-sm lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
              {elem.send_method === 'web' ? (
                <Link
                  href={{
                    pathname: `/general-statistics/${formatTableDate(
                      elem.sending_group_date
                    )}/statistic-site`,
                    query: {
                      history_id: elem.history_id,
                    },
                  }}
                >
                  <div className="text-[#2366E8]">Детальніше</div>
                </Link>
              ) : (
                <>&#8212;</>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableStatisticsPerDay;
