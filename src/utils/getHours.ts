var ONE_HOUR = 60 * 60 * 1000; /* ms */
export const getHours = (createdAt: string) => {
  //@ts-ignorets
  return Math.round((new Date() - new Date(createdAt)) / ONE_HOUR);
};
