import { Routes, Route } from "react-router";
import Tables from "../pages/tables/Tables";
import TableEdit from "../pages/tables/TableEdit";

const TablesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Tables />} />
      <Route path="/:id" element={<TableEdit />} />
    </Routes>
  );
};

export default TablesRoutes;
