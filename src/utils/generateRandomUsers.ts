import { Faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
function generateRandomAddress(faker: Faker): string {
  return faker.helpers.arrayElement([
    faker.location.streetAddress(),
    faker.location.streetAddress(true),
  ]);
}

export function generateRandomUsersFactory(faker: Faker) {
  let _index = 1;
  function generateRandomUser() {
    return {
      index: _index++,
      id: uuidv4(),
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      address: generateRandomAddress(faker),
      phoneNumber: faker.phone.number(),
    };
  }
  return generateRandomUser;
}
