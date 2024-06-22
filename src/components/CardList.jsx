/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { useState } from "react";
import gembokImg from "../assets/gembok.png";
import crossImage from "../assets/delete-button.png";

import "./cardList.css";

function CardList({ data, accounts, setAccounts, setSearchKey }) {
  const [type, setType] = useState(data.passType);
  const [encyptionKey, setEncryptionKey] = useState("");

  // console.log(data);

  // console.log(data.encryptedPass);

  function handlePass() {
    if (type == "password") {
      if (data.encryptedPass.length <= 0) {
        setType("text");
      } else {
        let tempId = data.id;
        document.getElementById(tempId + "decryptModal").style.display =
          "block";
      }
    } else {
      setType("password");
    }
  }

  function handleClose(id) {
    // console.log(id);
    document.getElementById(id + "Modal").style.display = "none";
  }

  function containsSpecialChars(str) {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str);
  }

  function containsLetter(str) {
    const format = /[a-zA-Z]/;
    return format.test(str);
  }

  function handleDecrypt() {
    let safe = true;
    let tempEKey = encyptionKey.toLowerCase();
    if (
      tempEKey.length < 3 ||
      !isNaN(parseInt(tempEKey)) ||
      containsSpecialChars(tempEKey)
    ) {
      safe = false;
    }

    if (safe) {
      // Decrypt

      // Initial
      let tempArrPass = [];
      let codeArrPass = [];
      let tempArrKey = tempEKey.split("");
      let codeArrKey = [];
      let newArrKey = [];

      let dataPass = data.encryptedPass;
      for (let i = 0; i < dataPass.length; i++) {
        let type;
        if (isNaN(parseInt(dataPass[i]))) {
          if (containsSpecialChars(dataPass[i])) {
            type = "symbol";
          } else if (dataPass[i] == dataPass[i].toUpperCase()) {
            type = "hurufBesar";
          } else if (dataPass[i] == dataPass[i].toLowerCase()) {
            type = "hurufKecil";
          }
        } else {
          type = "number";
        }
        const newData = { value: dataPass[i], type: type };
        tempArrPass.push(newData);
      }

      // Checking Length
      if (tempArrKey.length < tempArrPass.length) {
        let counter = 0;
        for (let i = 0; i < tempArrPass.length; i++) {
          if (counter >= tempArrKey.length) {
            counter = 0;
          }
          let tempI = counter;
          newArrKey.push(tempArrKey[tempI]);
          counter++;
        }
      } else if (tempArrKey.length > tempArrPass.length) {
        for (let i = 0; i < tempArrPass.length; i++) {
          newArrKey.push(tempArrKey[i]);
        }
      } else {
        newArrKey = [...tempArrKey];
      }

      // Change to ASCII Code
      for (let i = 0; i < tempArrPass.length; i++) {
        const tempPass = tempArrPass[i];
        let code = "";
        if (tempPass.type != "symbol" && tempPass.type != "number") {
          if (tempPass.type == "hurufKecil") {
            // Huruf Kecil
            code = tempPass.value.charCodeAt() - 97;
          } else {
            // Huruf Besar
            code = tempPass.value.charCodeAt() - 65;
          }
        } else {
          code = tempPass.value;
        }
        codeArrPass.push(code);
      }

      for (let i = 0; i < newArrKey.length; i++) {
        const tempKey = newArrKey[i];
        // console.log(tempKey);
        let code = tempKey.charCodeAt() - 97;
        codeArrKey.push(code);
      }

      // console.log(codeArrPass);
      // console.log(codeArrKey);

      let tempOriginalPass = "";
      for (let i = 0; i < codeArrPass.length; i++) {
        const ePass = codeArrPass[i];
        const eKey = codeArrKey[i];
        let newChar = "";

        if (typeof ePass == "number") {
          let sum = (ePass - eKey) % 26;
          if (sum < 0) {
            sum += 26;
          }

          if (tempArrPass[i].type == "hurufKecil") {
            newChar = String.fromCharCode(sum + 97);
          } else {
            newChar = String.fromCharCode(sum + 65);
          }
        } else {
          newChar = ePass;
        }

        tempOriginalPass += newChar;
      }

      if (containsLetter(tempOriginalPass)) {
        tempOriginalPass = tempOriginalPass.split("").reverse().join("");
      }

      // console.log(data.password);
      // console.log(tempOriginalPass);
      if (tempOriginalPass == data.password) {
        handleClose(data.id + "decrypt");
        setEncryptionKey("");
        setType("text");
      } else {
        document.getElementById("invalidModal").style.display = "block";
      }
    } else {
      document.getElementById("invalidModal").style.display = "block";
    }
  }

  function handleDelete() {
    // console.log("Delete " + data.platform);
    setAccounts(accounts.filter((acc) => acc.id != data.id));
    document.getElementById(data.id + "confirmDeleteModal").style.display =
      "none";
    setSearchKey("");
  }

  return (
    <>
      <div className="card mb-3 mt-3 px-2 w-100 shadow">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="card-body d-flex">
              <div className="w-50" id="kiri">
                <h2 className="card-title mb-0" style={{ color: "#0d7ebf" }}>
                  {data.platform}
                </h2>
                <span className="card-text fs-4" style={{ color: "#0d7ebf" }}>
                  {data.email}
                </span>
                <br />
                <div className="d-flex align-items-center mt-2">
                  <input
                    className="w-100 fs-5 px-3"
                    style={{
                      maxWidth: "300px",
                      border: "1px solid #0d7ebf",
                      color: "#0d7ebf",
                      opacity: "50%",
                    }}
                    value={data.password}
                    type={type}
                    name=""
                    id=""
                    disabled
                  />
                  <button
                    className="btn rounded ms-3 text-white fs-6"
                    style={{ backgroundColor: "#0d7ebf" }}
                    onClick={handlePass}
                  >
                    {type == "password" ? "Show" : "Hide"}
                  </button>
                </div>
              </div>
              <div className="w-50 d-flex justify-content-end" id="kanan">
                <div className="d-flex flex-column w-100">
                  <div className="h-100 d-flex justify-content-end" id="atas">
                    {data.encryptedPass.length > 0 && (
                      <img className="h-50" src={gembokImg} alt="Encrypted" />
                    )}
                  </div>
                  <div className="h-100 d-flex justify-content-end" id="bawah">
                    <div className="w-25"></div>
                    <div className="w-75 d-flex justify-content-end align-items-end">
                      <button
                        className="w-25 h-75 text-white border-0 rounded fs-4"
                        style={{ backgroundColor: "#bf380d" }}
                        onClick={() =>
                          (document.getElementById(
                            data.id + "confirmDeleteModal"
                          ).style.display = "block")
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal shadow"
        id={data.id + "confirmDeleteModal"}
        style={{ zIndex: "1000" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  (document.getElementById(
                    data.id + "confirmDeleteModal"
                  ).style.display = "none")
                }
              ></button>
            </div>
            <div className="modal-body">
              <h1 className="modal-title text-center my-5">Are you sure?</h1>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn fs-4 btn-secondary border-0"
                data-bs-dismiss="modal"
                onClick={() =>
                  (document.getElementById(
                    data.id + "confirmDeleteModal"
                  ).style.display = "none")
                }
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn fs-4 text-white border-0"
                style={{ backgroundColor: "#bf380d" }}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal shadow" id={data.id + "decryptModal"}>
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-start p-0">
              <div className="w-25"></div>
              <h4
                className="w-50 text-center py-1 mb-3"
                style={{ color: "#0d7ebf" }}
              >
                Decrypt
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose(data.id + "decrypt")}
              ></button>
            </div>
            <div className="modal-body d-flex flex-column">
              <div className="w-100 h-100" id="modalTop">
                <span className="fs-3" style={{ color: "#0d7ebf" }}>
                  Password : {data.encryptedPass}
                </span>
              </div>
              <br />
              <div className="w-100 h-100 mb-3" id="modalBottom">
                <input
                  className="fs-4 w-100 rounded px-3 py-1"
                  style={{
                    border: "1px solid #0d7ebf",
                    color: "#0d7ebf",
                    opacity: "85%",
                  }}
                  type="password"
                  placeholder="Encryption Key"
                  value={encyptionKey}
                  name="encryptKey"
                  id=""
                  onChange={(e) => setEncryptionKey(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn text-white text-center fs-5"
                style={{ backgroundColor: "#0d7ebf" }}
                data-bs-dismiss="modal"
                onClick={handleDecrypt}
              >
                Decrypt
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal shadow"
        id="invalidModal"
        style={{ zIndex: "1000" }}
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("invalid")}
              ></button>
            </div>
            <div className="modal-body d-flex flex-column justify-content-center align-items-center py-5">
              <div id="invalid">
                <img src={crossImage} alt="Invalid" />
              </div>
              <h1 className="mt-3 text-center">Encryption Key not Match!</h1>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => handleClose("invalid")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardList;
