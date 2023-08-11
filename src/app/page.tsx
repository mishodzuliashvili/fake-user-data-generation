import { fakerKA_GE, type Faker, fakerEN_US, fakerPL } from "@faker-js/faker";
import _ from "lodash";

type Region = {
  hasMiddleName: boolean;
  faker: Faker;
  alphabet: string[];
};

const Regions = {
  US: {
    hasMiddleName: true,
    faker: fakerEN_US,
    alphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  },
  PL: {
    hasMiddleName: false,
    faker: fakerPL,
    alphabet:
      "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ".split(
        ""
      ),
  },
  GE: {
    hasMiddleName: false,
    faker: fakerKA_GE,
    alphabet: "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ".split(""),
  },
};

interface User {
  index: number;
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

type TypeOfAttribute = "numeric" | "alphanumeric" | "alpha";

function generateRandomAddress(faker: Faker): string {
  return faker.helpers.arrayElement([
    faker.location.streetAddress(),
    faker.location.streetAddress(true),
  ]);
}

function generateRandomUsersFactory(faker: Faker) {
  let _index = 1;
  return () => ({
    index: _index++,
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    address: generateRandomAddress(faker),
    phoneNumber: faker.phone.number(),
  });
}

function generateErrorCharacter(
  alphabet: string[],
  typeOfAttribute: TypeOfAttribute,
  faker: Faker
) {
  if (typeOfAttribute === "numeric") {
    return faker.number.int({ max: 9 }).toString();
  } else if (typeOfAttribute === "alphanumeric") {
    return faker.helpers.arrayElement([...alphabet, ..."0123456789".split("")]);
  } else {
    return faker.helpers.arrayElement(alphabet);
  }
}

function swapCharacters(attributeValueArray: string[], errorPosition: number) {
  [attributeValueArray[errorPosition], attributeValueArray[errorPosition + 1]] =
    [
      attributeValueArray[errorPosition + 1],
      attributeValueArray[errorPosition],
    ];
}

function alterUserAttribute(
  user: User,
  attribute:
    | "firstName"
    | "middleName"
    | "lastName"
    | "address"
    | "phoneNumber",
  typeOfAttribute: TypeOfAttribute,
  alphabet: string[],
  faker: Faker
) {
  const errorPosition = faker.number.int({
    max: (user[attribute].length || 1) - 1,
  });
  const errorType = faker.number.int({ max: 2 });
  let errorCharacter = generateErrorCharacter(
    alphabet,
    typeOfAttribute,
    faker
  ) as string;
  let attributeValueArray = user[attribute].split("");
  if (errorType === 0) {
    attributeValueArray[errorPosition] = "";
  } else if (errorType === 1) {
    attributeValueArray.splice(errorPosition, 0, errorCharacter);
  } else {
    swapCharacters(attributeValueArray, errorPosition);
  }
  user[attribute] = attributeValueArray.join("");
}

function introduceErrors(
  users: User[],
  errorCount: number,
  region: Region,
  pageSeed: number
) {
  users.forEach((user) => {
    const integerPart = Math.floor(errorCount);
    const fractionalPart = errorCount - integerPart;
    const howManyTimes =
      Math.random() < fractionalPart ? integerPart + 1 : integerPart;
    for (let i = 0; i < howManyTimes; i++) {
      let attribute;

      if (!region.hasMiddleName) {
        attribute = region.faker.helpers.arrayElement([
          { value: "firstName", type: "alpha" },
          { value: "lastName", type: "alpha" },
          { value: "address", type: "alphanumeric" },
          { value: "phoneNumber", type: "numeric" },
        ] as Array<{ value: "firstName" | "middleName" | "lastName" | "address" | "phoneNumber"; type: TypeOfAttribute }>);
      } else {
        attribute = region.faker.helpers.arrayElement([
          { value: "firstName", type: "alpha" },
          { value: "middleName", type: "alpha" },
          { value: "lastName", type: "alpha" },
          { value: "address", type: "alphanumeric" },
          { value: "phoneNumber", type: "numeric" },
        ] as Array<{ value: "firstName" | "middleName" | "lastName" | "address" | "phoneNumber"; type: TypeOfAttribute }>);
      }
      alterUserAttribute(
        user,
        attribute.value,
        attribute.type,
        region.alphabet,
        region.faker
      );
    }
  });
}
export default function Home() {
  const error = 4;
  const userSeed = 0;
  const count = 20;

  const page = 2;
  const region = Regions.GE;
  const pageSeed = userSeed * page;
  region.faker.seed(pageSeed);
  const generateRandomUser = generateRandomUsersFactory(region.faker);
  const users = Array.from({ length: count }, () => generateRandomUser());
  // errors should be same based on seed
  introduceErrors(users, error, region, pageSeed);
  return (
    <main>
      <div className="gradient"></div>
      <table>
        <thead>
          <tr>
            <th>index</th>
            <th>id</th>
            <th>name</th>
            <th>address</th>
            <th>phoneNumber</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.index}</td>
              <td>{user.id}</td>
              <td>
                {user.firstName +
                  (region.hasMiddleName ? " " + user.middleName + " " : " ") +
                  user.lastName}
              </td>
              <td>{user.address}</td>
              <td>{user.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
