// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContentList from "./components/ContentList";
import ContentAdd from "./components/ContentAdd";

function App() {
  const [page, setPage] = useState("list");

  // encryptKey 1: abc, 2: def, 4: ghi
  const test = [
    {
      id: 1,
      platform: "Linkedin",
      email: "kapan@gmail.com",
      password: "12bC$$",
      encryptedPass: "$$Eb21",
      passType: "password",
    },
    {
      id: 2,
      platform: "LKomp",
      email: "bisa@gmail.com",
      password: "okR557",
      encryptedPass: "755Uot",
      passType: "password",
    },
    {
      id: 3,
      platform: "Binance",
      email: "ngga@gmail.com",
      password: "123",
      encryptedPass: "",
      passType: "password",
    },
    {
      id: 4,
      platform: "EClass",
      email: "error@gmail.com",
      password: "ty*#123",
      encryptedPass: "321#*gz",
      passType: "password",
    },
  ];

  const [accounts, setAccounts] = useState(test);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar page={page} setPage={setPage}></Navbar>
        {page == "list" && (
          <ContentList
            accounts={accounts}
            setAccounts={setAccounts}
          ></ContentList>
        )}
        {page == "add" && (
          <ContentAdd
            accounts={accounts}
            setAccounts={setAccounts}
          ></ContentAdd>
        )}
        <br />
        <Footer nrp="221116958" nama="Geovann Chandra"></Footer>
      </div>
    </>
  );
}

export default App;
