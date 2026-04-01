import { Routes, Route } from "react-router";
import Facilities from "../pages/facilities/Facilities";
import FacilityEdit from "../pages/facilities/FacilityEdit";

const FacilitiesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Facilities />} />
      <Route path="/:id" element={<FacilityEdit />} />
    </Routes>
  );
};

export default FacilitiesRoutes;
