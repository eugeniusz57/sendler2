import { Children, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Props = {
  text: string;
  color?: string;
  iconMarker?: boolean
};

const TimeZoneMarker: React.FC<Props> = ({
  text = '',
  color = '#FFFFFF',
  iconMarker = false
}) => {

  function getKyivTimeZoneOffset1() {
    const date = new Date()
    let iso = date.toLocaleString('en-CA', { timeZone: "Europe/Kyiv", hour12: false }).replace(', ', 'T');
    iso += '.' + date.getMilliseconds().toString().padStart(3, '0');
    const lie = new Date(iso + 'Z');

    return `UTC+${(((lie as any) - (date as any)) / 60 / 1000 / 60)}`;
  }

  function getKyivTimeZoneOffset() {
    const kyivTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Kyiv", hour12: false });
    const utcTime = new Date().toLocaleString("en-US", { timeZone: "UTC", hour12: false });;

    const kyivDate = new Date(kyivTime);
    const utcDate = new Date(utcTime);
  
    const offset = Math.round((kyivDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60)); 
    return `UTC${offset >= 0 ? '+' : ''}${offset}`;
  }
  
  return (
    <div
      className={`relative`}
    >
      <div className="peer relative inline-block leading-6">{text}
      {iconMarker ?
          <Image
                src="/icons8-time-zone-24.png"
                alt="Time zone icon"
                width={12}
                height={12}
                className="inline-block absolute top-[2px] right-[-12px] ml-2"
              /> : <> <span className="font-montserrat font-normal italic md:text-[12px] lg:text-[14px] whitespace-nowrap leading-3">(Київ, {getKyivTimeZoneOffset()})</span></>
        }
          </div> 
          {iconMarker &&
          <p className="hidden peer-hover:block absolute top-[2px] -translate-y-full font-montserrat font-normal text-[8px] md:text-[8px] lg:text-[9px] leading-3">
              Київським часовий пояс ({getKyivTimeZoneOffset()}).
          </p>}
      </div>
  );
};
export default TimeZoneMarker;
