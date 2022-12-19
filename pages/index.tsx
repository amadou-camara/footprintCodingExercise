import { useEffect, useMemo, useState } from "react";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import Table from "../components/table";
import { IUserData } from "../interfaces/UserDataType";
import { UserDataService } from "../services/userdata.service";
import styles from "../styles/Home.module.css";
import Divider from "../components/divider";

export default function Home() {
  const [userData, setUserData] = useState<IUserData[]>([]);

  const userDataService = new UserDataService();

  useEffect(() => {
    const fetchUserData = async (q?: string) => {
      const response = await userDataService.getUsers(q);
      setUserData(response);
    };

    if (window) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const q = urlParams.get("q");
      if (q) {
        fetchUserData(q);
      } else {
        fetchUserData();
      }
    }
  });

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar></SearchBar>
      <Divider></Divider>
      <Table data={userData} />
    </div>
  );
}
