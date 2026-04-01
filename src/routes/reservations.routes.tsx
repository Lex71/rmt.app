import { Routes, Route } from "react-router";
import Reservations from "../pages/reservations/Reservations";

const ReservationsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Reservations />} />
    </Routes>
  );
};

export default ReservationsRoutes;
