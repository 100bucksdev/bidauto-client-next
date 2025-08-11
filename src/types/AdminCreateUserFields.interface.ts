export interface IAdminCreateUserFields {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  country: string;
  phone_number: string;

  delivery_info: {
    country: string;
    state: string;
    zip_code: number;
    city: string;
    address: string;
  };
}
