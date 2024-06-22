/* eslint-disable react/prop-types */

function Navbar({ page, setPage }) {
  function handlePage(action) {
    setPage(action);
  }

  return (
    <>
      <nav className="navbar bg-white">
        <div
          className="ps-4 d-flex flex-start w-100 mx-5 pb-3"
          style={{ borderBottom: "1px solid #0d7ebf" }}
        >
          {page == "list" ? (
            <span
              className="navbar-brand fs-3 px-2"
              href="#"
              style={{ color: "#0d7ebf", borderBottom: "3px solid #0d7ebf" }}
              onClick={() => handlePage("list")}
            >
              List
            </span>
          ) : (
            <span
              className="navbar-brand fs-3 px-2"
              href="#"
              style={{ color: "#0d7ebf" }}
              onClick={() => handlePage("list")}
            >
              List
            </span>
          )}

          {page == "add" ? (
            <span
              className="navbar-brand fs-3 px-2"
              href="#"
              style={{ color: "#0d7ebf", borderBottom: "3px solid #0d7ebf" }}
              onClick={() => handlePage("add")}
            >
              Add
            </span>
          ) : (
            <span
              className="navbar-brand fs-3 px-2"
              href="#"
              style={{ color: "#0d7ebf" }}
              onClick={() => handlePage("add")}
            >
              Add
            </span>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
