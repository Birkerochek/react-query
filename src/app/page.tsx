import CreateUser from "./CreateUser/CreateUser";
import Users from "./Users/Users";

export default function Home() {
  return (
    <div>
      <Users/>
      <CreateUser/>
    </div>
  );
}
