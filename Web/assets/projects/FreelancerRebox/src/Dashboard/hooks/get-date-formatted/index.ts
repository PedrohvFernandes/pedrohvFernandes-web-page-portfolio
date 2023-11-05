import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfDay,
  endOfDay,
  subDays,
  subMonths,
} from 'date-fns';

const today = new Date();

const formattedToday = () => {
  const todayStart = startOfDay(today);
  const todayEnd = endOfDay(today);
  return {
    formattedTodayStart: format(todayStart, 'yyyy-MM-dd HH:mm'),
    formattedTodayEnd: format(todayEnd, 'yyyy-MM-dd HH:mm'),
  };
};

const formattedYesterday = () => {
  const yesterday = subDays(today, 1);
  const yesterdayStart = startOfDay(yesterday);
  const yesterdayEnd = endOfDay(yesterday);
  return {
    formattedYesterdayStart: format(yesterdayStart, 'yyyy-MM-dd HH:mm'),
    formattedYesterdayEnd: format(yesterdayEnd, 'yyyy-MM-dd HH:mm'),
  };
};

const formattedCurrentMonth = () => {
  const firstDayOfMonth = startOfMonth(startOfDay(today));
  const lastDayOfMonth = endOfMonth(endOfDay(today));
  const formattedThisMonth = {
    formattedThisMonthFirstDay: format(firstDayOfMonth, 'yyyy-MM-dd HH:mm'),
    formattedThisMonthLastDay: format(lastDayOfMonth, 'yyyy-MM-dd HH:mm'),
  };
  // const formattedThisMonth = `${format(
  //   firstDayOfMonth,
  //   'dd/MM/yyyy',
  // )} - ${format(lastDayOfMonth, 'dd/MM/yyyy')}`;
  return formattedThisMonth;
};

const formattedLastMonth = () => {
  const firstDayOfLastMonth = startOfDay(startOfMonth(subMonths(today, 1)));
  const lastDayOfLastMonth = endOfDay(endOfMonth(subMonths(today, 1)));
  const formattedThisLastMonth = {
    formattedLastMonthFirstDay: format(firstDayOfLastMonth, 'yyyy-MM-dd HH:mm'),
    formattedLastMonthLastDay: format(lastDayOfLastMonth, 'yyyy-MM-dd HH:mm'),
  };
  return formattedThisLastMonth;
};

const formattedCurrentYear = () => {
  const firstDayOfYear = startOfDay(startOfYear(today));
  const lastDayOfYear = endOfDay(endOfYear(today));
  const formattedThisYear = {
    formattedThisYearFirstDay: format(firstDayOfYear, 'yyyy-MM-dd HH:mm'),
    formattedThisYearLastDay: format(lastDayOfYear, 'yyyy-MM-dd HH:mm'),
  };
  return formattedThisYear;
};

const formattedDateBr = (dateAndHour: string) => {
  // 2023-06-01 00:00 para 01/06/2023 - 00:00
  const dateFormatted = dateAndHour
    .split(' ')[0]
    .split('-')
    .reverse()
    .join('/');
  const hourFormatted = dateAndHour.split(' ')[1];
  return `${dateFormatted} - ${hourFormatted}`;
};

const useGetDateFormatted = () => {
  return {
    formattedToday,
    formattedYesterday,
    formattedCurrentMonth,
    formattedLastMonth,
    formattedCurrentYear,
    formattedDateBr,
  };
};

export default useGetDateFormatted;
