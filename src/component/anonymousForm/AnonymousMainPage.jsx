import { useState } from "react";
import AnonymousHeader from "./AnonymousHeader";
import AnonymousTable from "./AnonymousTable";

const AnonymousMainPage = () => {
  const [UpdateTrigger, setUpdateTrigger] = useState(0);

  const handleAdded = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  return (
    <>
      <AnonymousHeader UpdateTrigger={UpdateTrigger} />
      <AnonymousTable onAdded={handleAdded} />
    </>
  );
};

export default AnonymousMainPage;
