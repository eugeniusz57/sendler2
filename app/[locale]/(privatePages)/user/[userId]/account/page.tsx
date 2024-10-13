'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSession } from 'next-auth/react';

import Title from '@/components/Title';
import { UpdateUserForm } from '@/components/forms/UpdateUserForm';
import CreateAccount from '@/components/CreateAccount';
import PaymentsList from '@/components/PaymentsList';
import { getUser } from '@/fetch-actions/usersFetchActions';
import { getUserPaymentHistory } from '@/fetch-actions/usersFetchActions';

import { IPaymentHistory, IUser } from '@/globaltypes/types';
import React from 'react';
import CircleDiagram from '@/components/CircleDiagram';

import LineDiagram from '@/components/LineDiagram';
import TablePrices from '@/components/TablePrices';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const LIMIT = 5;

const UserAccountPage: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user.user_id;
  const [user, setUser] = useState<IUser>();
  const [payments, setPayments] = useState<IPaymentHistory[] | undefined>([]);
  const [socketIo, setSocketIo] = useState<any>(undefined);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(true);
  const message = userId;
  const roomName = userId;
  const t = useTranslations('UserAccountPage');
  let NEXT_PUBLIC_SOCKET_URL: string;

  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    NEXT_PUBLIC_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
  } else {
    NEXT_PUBLIC_SOCKET_URL = 'http://localhost:1080';
  }

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!socketIo) {
      const getData = async () => {
        if (userId) {
          const res = await getUser(userId);
          const paymentRes = await getUserPaymentHistory(userId, LIMIT, 0);
          if (res) {
            setUser(res.data.user);
            setPayments(paymentRes?.data.payments);
          }
        }
      };
      const socket = io(NEXT_PUBLIC_SOCKET_URL);

      getData();
      setSocketIo(socket);
      socket.on('connect', () => {
        console.log('Socket Account is connected');
      });
      socket.on('message', user => {
        if (user) {
          setUser(user);
        }
      });
      socket.on('connect_error', error => {
        if (socket.active) {
        } else {
          console.log(error.message);
        }
      });
      socket.on('disconnect', () => {
        console.log('Socket Account is disconnected');
      });
    }
  }, [userId, message, socketIo, roomName, NEXT_PUBLIC_SOCKET_URL]);

  const data = [
    { name: 'Відхилені', value: user?.rejected_sms },
    { name: 'Усього доставлено', value: user?.delivered_sms },
    { name: 'В процесі відправки', value: user?.pending_sms },
  ];

  return (
    <>
      <Title type="h1" color="dark">
        {t('pageTitle')}
      </Title>
      <div className="flex flex-col md:gap-[80px] gap-[50px] md:mt-[60px] mt-[28px]">
        <div className="content-block px-[10px] md:px-[20px] lg:px-[26px]">
          <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-between lg:justify-start">
            <div>
              <div className="mb-10">
                <Title type="accent-main_text" color="dark">
                  {t('titleAccountInfoBox')}
                </Title>
              </div>
              <div className="flex flex-col lg:flex-row gap-16">
                <div className="flex flex-col gap-8">
                  <div className="flex">
                    <div className="w-40 md:w-52 mr-2 text-sm md:text-base">{t('info_1')}</div>
                    <div className="min-w-[40px] md:min-w-[80px] text-end text-base md:text-lg font-montserrat font-normal mr-2">
                      {user?.paid_sms}
                    </div>
                    <div className="text-base md:text-lg font-montserrat font-normal">
                      {t('nameCol_1PriceSmsTable')}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-40 md:w-52 mr-2 text-sm md:text-base">{t('info_2')}</div>
                    <div className="min-w-[40px] md:min-w-[80px] text-end text-base md:text-lg font-montserrat font-normal mr-2">
                      {user?.adjusment_sms}
                    </div>
                    <div className="text-base md:text-lg font-montserrat font-normal">
                      {t('nameCol_1PriceSmsTable')}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-40 md:w-52 mr-2 text-sm md:text-base">{t('info_3')}</div>
                    <div className="min-w-[40px] md:min-w-[80px] text-end text-base md:text-lg font-montserrat font-normal mr-2">
                      {user?.balance}
                    </div>
                    <div className="text-base md:text-lg font-montserrat font-normal">
                      {t('nameCol_1PriceSmsTable')}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex">
                    <div className="w-40 md:w-52 mr-2 text-sm md:text-base">{t('info_4')}</div>
                    <div className="min-w-[40px] md:min-w-[80px] text-end text-base md:text-lg font-montserrat font-normal mr-2">
                      {user?.sent_sms}
                    </div>
                    <div className="text-base md:text-lg font-montserrat font-normal">
                      {t('nameCol_1PriceSmsTable')}
                    </div>
                  </div>
                  <div className="flex relative">
                    <div className="w-40 md:w-52 mr-2 text-sm md:text-base">{t('info_5')}</div>
                    <div className="min-w-[40px] md:min-w-[80px] text-end text-base md:text-lg font-montserrat font-normal mr-2">
                      {user?.delivered_sms}
                    </div>
                    <div className="text-base md:text-lg font-montserrat font-normal">
                      {t('nameCol_1PriceSmsTable')}
                    </div>
                    <div className="h-5 w-5 rounded-full bg-[#FFBB28]  absolute right-0 md:right-[-30px] top-1/2 transform -translate-y-1/2"></div>
                  </div>
                  <div className="flex relative">
                    <div className="w-40 md:w-52 mr-2 text-sm md:text-base">{t('info_6')}</div>
                    <div className="min-w-[40px] md:min-w-[80px] text-end text-base md:text-lg font-montserrat font-normal mr-2">
                      {user?.pending_sms}
                    </div>
                    <div className="text-base md:text-lg font-montserrat font-normal">
                      {t('nameCol_1PriceSmsTable')}
                    </div>
                    <div className="h-5 w-5 rounded-full bg-[#00C49F] absolute right-0 md:right-[-30px] top-1/2 transform -translate-y-1/2"></div>
                  </div>
                  <div className="flex relative">
                    <div className="w-40 md:w-52 mr-2 text-sm md:text-base">{t('info_7')}</div>
                    <div className="min-w-[40px] md:min-w-[80px] text-end text-base md:text-lg font-montserrat font-normal mr-2">
                      {user?.rejected_sms}
                    </div>
                    <div className="text-base md:text-lg font-montserrat font-normal">
                      {t('nameCol_1PriceSmsTable')}
                    </div>
                    <div className="h-5 w-5 rounded-full  bg-[#0088FE] absolute right-0 md:right-[-30px] top-1/2 transform -translate-y-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:self-end w-full md:w-[280px] lg:w-[300px] h-[180px] lg:h-[300px] p-2 xl:ml-40 lg:ml-16">
              <CircleDiagram data={data} />
            </div>
          </div>
          {!(user?.sendingSms?.length === 0) && (
            <>
              <p className="mb-2 lg:mb-4 mt-4 md:mt-8 lg:mt-0">{t('titleLiveInform')}</p>
              <ul>
                {user?.sendingSms?.map((item, index) => (
                  <li key={index}>
                    <LineDiagram process={item} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="content-block">
          <div className="pl-[26px]">
            <Title type="accent-main_text" color="dark">
              {t('titlePaymentHistoryBox')}
            </Title>
          </div>
          {userId && (
            <PaymentsList
              userId={userId}
              arrayUserPaymentHistory={payments}
              isUpdated={isUpdated}
              LIMIT={LIMIT}
            />
          )}
        </div>
        <div className="content-block px-[10px] md:px-[20px] lg:px-[26px]">
          <Title type="accent-main_text" color="dark">
            {t('titleAccountTopUpBox')}
          </Title>
          <p className="mt-10 mb-3">{t('titleInputAccountTopUp')}</p>
          <CreateAccount />
          <button
            onClick={toggleDescription}
            className="flex justify-between  items-center text-start w-full md:w-[626px] lg:w-[746px] px-4 md:px-6 py-3 md:py-4 lg:py-5 mb-[28px] md:mb-12 border border-cyan-700 rounded-[18px]"
          >
            <h3 className="max-w-[575px] lg:max-w-none lg:text-xl text-base md:text-lg font-roboto block">
              {t('titleSmsPriceList')}
            </h3>
            <span className="block ml-10">
              {expanded ? (
                <Image
                  src="/svg/arrow-down.svg"
                  alt="buton detailes"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              ) : (
                <Image
                  src="/svg/arrow-up.svg"
                  alt="buton detailes"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              )}
            </span>
          </button>
          <div
            className={` text-[16px] mt-4 lg:mt-5 lg:pr-[196px] pb-4 lg:pb-5 ${
              expanded ? 'hidden ' : ' blok'
            }`}
          >
            <TablePrices />
          </div>
          <p className="w-fullmd:w-[906px] text-base md:text-lg lg:text-xl accent-main_text">
            {t('textExplaint')}
          </p>
        </div>
        <UpdateUserForm userId={userId} />
      </div>
    </>
  );
};

export default UserAccountPage;
