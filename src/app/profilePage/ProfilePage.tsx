import Header from "../components/Header/Header.tsx";
import {ReactElement, useState} from "react";
import {ProfileCard} from "./components/ProfileCard";
import {ProfileEdit} from "./components/ProfileEdit";

const ProfilePage = (): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Header title="Profile" />
      {!isEditing && (<ProfileCard onCancelEdit={() => setIsEditing(true)} />)}
      {isEditing && (<ProfileEdit onEdit={() => setIsEditing(false)} />)}
    </>
  );
};

export default ProfilePage;
