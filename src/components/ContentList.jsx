/* eslint-disable react/prop-types */
import { useState } from "react";
import CardList from "./CardList";

function ContentList({ accounts, setAccounts }) {
  const [searchKey, setSearchKey] = useState("");
  const [datas, setDatas] = useState(accounts);

  function handleSearch() {
    setDatas(
      accounts.filter(
        (acc) =>
          acc.platform.toLowerCase().includes(searchKey) ||
          acc.email.toLowerCase().includes(searchKey)
      )
    );
  }

  function handleReset() {
    setDatas(accounts);
  }

  return (
    <>
      <div className="mt-3 px-4 w-100">
        <input
          className="mt-2 mb-3 mx-4 px-3 fs-2 w-25 rounded"
          style={{
            border: "1px solid #0d7ebf",
            color: "#0d7ebf",
            opacity: "50%",
          }}
          type="search"
          name="search"
          value={searchKey}
          id=""
          placeholder="Search For Password"
          onFocus={(e) => (e.target.value = "")}
          onChange={(e) => {
            setSearchKey(e.target.value);
            handleReset();
            handleSearch();
          }}
          autoComplete="off"
        />
      </div>
      <br />
      <div className="px-5 w-100">
        {searchKey.length > 0 ? (
          datas.length > 0 ? (
            datas.map((data, index) => (
              <CardList
                key={index}
                data={data}
                accounts={accounts}
                setAccounts={setAccounts}
                setSearchKey={setSearchKey}
              ></CardList>
            ))
          ) : (
            <h1 className="fw-bold" style={{ color: "#0d7ebf" }}>
              404 Not Found!
            </h1>
          )
        ) : accounts.length > 0 ? (
          accounts.map((data, index) => (
            <CardList
              key={index}
              data={data}
              accounts={accounts}
              setAccounts={setAccounts}
              datas={datas}
              setDatas={setDatas}
              setSearchKey={setSearchKey}
            ></CardList>
          ))
        ) : (
          <h1 className="fw-bold" style={{ color: "#0d7ebf" }}>
            404 Not Found!
          </h1>
        )}
      </div>
    </>
  );
}

export default ContentList;
