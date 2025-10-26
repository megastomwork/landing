export type Contact = {
  phone: string;
  email: string;
  address: string;
  googleAddress: string;
  addressOnMap: {
    type: string;
    coordinates: number[];
  };
};
