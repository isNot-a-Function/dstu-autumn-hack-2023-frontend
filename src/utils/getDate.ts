const checkTime = (value: string): string => (Number(value) < 10 ? `0${value}` : value);

export const getDate = (data: string): string => {
  const day = new Date(data);

  return `${checkTime(day.getDate() + '')}.${checkTime(day.getMonth() + 1 + '')}.${checkTime(
    day.getFullYear() + '',
  )}, ${checkTime(day.getHours() + '')}:${checkTime(day.getMinutes() + '')}`;
};
