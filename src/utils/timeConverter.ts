export const timeConverter = (UNIX_timestamp: number) => {
  const a = new Date(UNIX_timestamp * 1000);
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const hourString = String(hour).length == 1 ? '0' + hour : hour;
  const minString = String(min).length == 1 ? '0' + min : min;
  const time = date + '.' + month + '.' + year + ' ' + ', ' + hourString + ':' + minString;
  return time;
};
