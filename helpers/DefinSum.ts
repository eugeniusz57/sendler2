import { PricesArray } from '@/data/data';

export function defineSum(smsCount: number) {
  let pricePerSms;
  switch (true) {
    case smsCount >= 100000:
      pricePerSms = PricesArray[5].price;
      break;
    case smsCount >= 50000:
      pricePerSms = PricesArray[4].price;
      break;
    case smsCount >= 10000:
      pricePerSms = PricesArray[3].price;
      break;
    case smsCount >= 5000:
      pricePerSms = PricesArray[2].price;
      break;
    case smsCount >= 1000:
      pricePerSms = PricesArray[1].price;
      break;
    default:
      pricePerSms = PricesArray[0].price;
  }

  if (pricePerSms === null) {
    return 'Вартість СМС невідома';
  }

  return (smsCount * pricePerSms).toFixed(2);
}

export function defineSmsCount(sum: number) {
  let price = 0;
  if (sum < 1040) {
    price = 1.07;
  } else if (sum < 5150) {
    price = 1.04;
  } else if (sum < 10200) {
    price = 1.03;
  } else if (sum < 50500) {
    price = 1.02;
  } else if (sum < 99000) {
    price = 1.01;
  } else {
    price = 0.99;
  }

  if (price !== 0) {
    return Math.round(sum / price);
  } else {
    return undefined;
  }
}
