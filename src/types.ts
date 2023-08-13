import { Faker } from "@faker-js/faker";

export type User = {
  index: number;
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  phoneNumber: string;
};

export type Region = {
  hasMiddleName: boolean;
  faker: Faker;
  alphabet: string[];
  label: string;
};

export type TypeOfAttribute = "numeric" | "alphanumeric" | "alpha";
