import { useTable } from "@/app/context";
import { Region, User } from "@/types";
import { BsPersonBoundingBox } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { BsTelephonePlus } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
function generateFullName(
  firstName: string,
  middleName: string,
  lastName: string,
  region: Region
) {
  if (region.hasMiddleName && middleName) {
    return `${firstName} ${middleName} ${lastName}`;
  } else {
    return `${firstName} ${lastName}`;
  }
}

const UserRecord = ({ record }: { record: User }) => {
  const { index, id, firstName, middleName, lastName, address, phoneNumber } =
    record;
  const { region } = useTable();
  const fullName = generateFullName(firstName, middleName, lastName, region);
  return (
    <tr>
      <td>{index}</td>
      <td>
        <AiOutlineNumber className="mobile" />
        {id}
      </td>
      <td>
        <BsPersonBoundingBox className="mobile" />
        {fullName}
      </td>
      <td>
        <GoLocation className="mobile" />
        {address}
      </td>
      <td>
        <BsTelephonePlus className="mobile" />
        {phoneNumber}
      </td>
    </tr>
  );
};

export default UserRecord;
