import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import TransactionsPage from "../pages/TransactionsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<TransactionsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;