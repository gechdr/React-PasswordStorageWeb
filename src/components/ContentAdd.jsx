/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./contentAdd.css";
import checkImage from "../assets/check.png";
import crossImage from "../assets/delete-button.png";

function ContentAdd({ accounts, setAccounts }) {
  const [platform, setPlatform] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [encyptionKey, setEncryptionKey] = useState("");
  const [encryptPass, setEncryptPass] = useState(false);
  const [encryptedPass, setEncryptedPass] = useState("");

  function handleEncrypt(encrypt) {
    setEncryptPass(encrypt);
    // console.log(encryptPass);
  }

  function clear() {
    setPlatform("");
    setEmail("");
    setPassword("");
    setEncryptionKey("");
    setEncryptPass(false);
  }

  function handleClose(id) {
    document.getElementById(id + "Modal").style.display = "none";
  }

  function containsSpecialChars(str) {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str);
  }

  function handleAdd() {
    let safe = true;

    // Check Platform
    if (platform.length <= 0) {
      safe = false;
    }

    // Check Email
    if (email.length <= 0) {
      safe = false;
    }

    // Password
    if (password.length <= 0) {
      safe = false;
    }

    // Encryption Key
    let tempEncryptedPass = "";
    if (encryptPass) {
      let tempEKey = encyptionKey.toLocaleLowerCase();
      if (
        encyptionKey.length < 3 ||
        !isNaN(parseInt(tempEKey)) ||
        containsSpecialChars(tempEKey)
      ) {
        safe = false;
      } else {
        // console.log("encrypt");
        // Encrypt

        // Initial
        let tempArrPass = [];
        let codeArrPass = [];
        let tempArrKey = tempEKey.split("");
        let codeArrKey = [];
        let newArrKey = [];

        let reverse = false;
        for (let i = 0; i < password.length; i++) {
          let type;
          if (isNaN(parseInt(password[i]))) {
            if (containsSpecialChars(password[i])) {
              type = "symbol";
            } else if (password[i] == password[i].toUpperCase()) {
              type = "hurufBesar";
              reverse = true;
            } else if (password[i] == password[i].toLowerCase()) {
              type = "hurufKecil";
              reverse = true;
            }
          } else {
            type = "number";
          }
          const newData = { value: password[i], type: type };
          tempArrPass.push(newData);
        }

        // console.log(tempArrPass);

        if (reverse) {
          tempArrPass = tempArrPass.reverse();
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

        // console.log(tempArrPass);
        // console.log(newArrKey);

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

        // console.log(tempArrPass);

        for (let i = 0; i < codeArrPass.length; i++) {
          const ePass = codeArrPass[i];
          const eKey = codeArrKey[i];
          let newChar = "";

          if (typeof ePass == "number") {
            const sum = (ePass + eKey) % 26;

            if (tempArrPass[i].type == "hurufKecil") {
              newChar = String.fromCharCode(sum + 97);
            } else {
              newChar = String.fromCharCode(sum + 65);
            }
          } else {
            newChar = ePass;
          }

          tempEncryptedPass += newChar;
        }
      }
    }

    if (safe) {
      // ID
      let lastID = accounts[accounts.length - 1].id;

      let newAccount;
      if (encryptPass) {
        newAccount = {
          id: lastID + 1,
          platform: platform,
          email: email,
          password: password,
          encryptedPass: tempEncryptedPass,
          passType: "password",
        };
      } else {
        newAccount = {
          id: lastID + 1,
          platform: platform,
          email: email,
          password: password,
          encryptedPass: "",
          passType: "password",
        };
      }

      // console.log(newAccount);
      setAccounts([...accounts, newAccount]);
      setEncryptedPass(tempEncryptedPass);

      document.getElementById("successModal").style.display = "block";

      // clear();
    } else {
      document.getElementById("invalidModal").style.display = "block";
      clear();
    }
  }

  return (
    <>
      <div className="container-fluid w-100 d-flex justify-content-center align-items-center">
        <div className="Card p-2 shadow border rounded-4 w-50 h-100 my-5">
          <h2 className="my-3 mx-4" style={{ color: "#0d7ebf" }}>
            Add Password
          </h2>
          <input
            className="mt-2 mb-3 mx-4 w-50 fs-5 rounded px-3"
            style={{
              border: "1px solid #0d7ebf",
              color: "#0d7ebf",
              opacity: "85%",
            }}
            type="text"
            placeholder="Platform"
            value={platform}
            name="platform"
            id=""
            onChange={(e) => setPlatform(e.target.value)}
          />
          <br />
          <input
            className="mt-2 mb-3 mx-4 w-50 fs-5 rounded px-3"
            style={{
              border: "1px solid #0d7ebf",
              color: "#0d7ebf",
              opacity: "85%",
            }}
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            id=""
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <br />
          <input
            className="mt-2 mb-3 mx-4 w-50 fs-5 rounded px-3"
            style={{
              border: "1px solid #0d7ebf",
              color: "#0d7ebf",
              opacity: "85%",
            }}
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            id=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <br />
          <input
            className="mt-2 mx-4 fs-5 w-50 rounded px-3"
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
          <div className="d-flex justify-content-start mb-3 mx-4 w-50">
            <input
              className="fs-5 rounded ps-3 my-auto"
              style={{
                border: "1px solid #0d7ebf",
                color: "#0d7ebf",
                opacity: "85%",
              }}
              type="checkbox"
              checked={encryptPass}
              name="encryptEnable"
              id=""
              onChange={(e) => handleEncrypt(e.target.checked)}
            />
            <label
              className="fs-5 px-3"
              style={{ color: "#0d7ebf", opacity: "85%" }}
            >
              Encrypt
            </label>
          </div>

          <div className="mb-3 mx-4 d-flex">
            <div className="w-50 d-flex align-items-center">
              {encryptPass && (
                <span className="fs-5" style={{ color: "#0d7ebf" }}>
                  Result: {encryptedPass}
                </span>
              )}
            </div>
            <div className="d-flex align-items-end w-50 justify-content-end">
              <button
                type="button"
                className="btn rounded text-white fs-5 px-4"
                style={{ backgroundColor: "#0d7ebf" }}
                onClick={handleAdd}
                // data-bs-toggle="modal"
                // data-bs-target={
                //   safe == true ? "#successModal" : "#invalidModal"
                // }
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal shadow" id="invalidModal">
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
              <h1 className="mt-3">Invalid Input</h1>
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

      <div className="modal shadow" id="successModal">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("success")}
              ></button>
            </div>
            <div className="modal-body d-flex flex-column justify-content-center align-items-center py-5">
              <div id="success">
                <img src={checkImage} alt="Check" />
              </div>
              <h1 className="mt-3">Success</h1>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => handleClose("success")}
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

export default ContentAdd;
