export interface UserProfile {
  displayName: string | undefined;
  userId: string | undefined;
  pictureUrl?: string;
}

export type Farm = {
  name: string;
  area: number | null | undefined;
};
export type UserInformationType = {
  lineId: string | undefined;
  lineName: string | undefined;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | undefined;
  birthday: string;
  address: string;
  zipcode: string;
  province: string;
  district: string;
  subDistrict: string;
  phoneNumber: string;
  farm: Farm[];
  idCard: string | null;
  idCardNumber: string | null;
  bookBank: string | null;
  bookBankName: string | null;
  bookBankNumber: string | null;
  farmerLicense: string[] | null;
  farmerLicenseNumber: string | null;
};

export type UserDataType = {
  lineId: string | undefined;
  lineName: string | undefined;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | undefined;
  birthday: string;
  address: string;
  zipcode: string;
  province: string;
  district: string;
  subDistrict: string;
  phoneNumber: string;
  farm: Farm[];
  idCard: string | null;
  idCardNumber: string | null;
  bookBank: string | null;
  bookBankName: string | null;
  bookBankNumber: string | null;
  farmerLicense: string[] | null;
  farmerLicenseNumber: string | null;
  userType: string;
  userTier: string;
};
