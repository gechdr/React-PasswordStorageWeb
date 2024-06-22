/* eslint-disable react/prop-types */
export default function Footer({ nrp, nama }) {
  return (
    <div
      className="container-fluid mt-auto"
      style={{ backgroundColor: "#0d7ebf" }}
    >
      <div className="d-flex justify-content-center align-items-center py-2 px-5">
        <h3 className="text-white fw-bold">
          {nrp} - {nama}
        </h3>
      </div>
    </div>
  );
}
