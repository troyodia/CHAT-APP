import { UserState } from "../use-contexts/userContext";

export default function GetUser() {
  const { firstname, lastname, userId } = UserState("");
  return <div>{firstname}</div>;
}
