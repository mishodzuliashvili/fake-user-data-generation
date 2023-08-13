import { Region, TypeOfAttribute, User } from "@/types";
import { Faker } from "@faker-js/faker";

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
    max: ((user[attribute] as any).length || 1) - 1,
  });
  const errorType = faker.number.int({ max: 2 });
  let errorCharacter = generateErrorCharacter(
    alphabet,
    typeOfAttribute,
    faker
  ) as string;
  let attributeValueArray = (user[attribute] as any).split("");
  if (errorType === 0) {
    attributeValueArray[errorPosition] = "";
  } else if (errorType === 1) {
    attributeValueArray.splice(errorPosition, 0, errorCharacter);
  } else {
    swapCharacters(attributeValueArray, errorPosition);
  }
  user[attribute] = attributeValueArray.join("");
}

export function introduceErrors(
  users: User[],
  errorCount: number,
  region: Region
) {
  return users.map((user) => {
    const integerPart = Math.floor(errorCount);
    user = {
      ...user,
    };
    const fractionalPart = errorCount - integerPart;
    const randomNumber = region.faker.number.float({ max: 0.99 });
    const howManyTimes =
      randomNumber < fractionalPart ? integerPart + 1 : integerPart;
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
    return user;
  });
}
