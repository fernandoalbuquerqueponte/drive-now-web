export type UseCreateAccountResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  imageUrl?: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
