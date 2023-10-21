export const useGetToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
};
