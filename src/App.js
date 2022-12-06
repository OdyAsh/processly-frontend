import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./store/AuthProvider";
import PrivateRoutes from "./components/auth/PrivateRoutes";

import Layout from "./UI/layout/Layout";

import HomePage from "./pages/client/HomePage";
import MakeAnOrderPage from "./pages/client/MakeAnOrderPage";
import ViewOrdersPage from "./pages/client/ViewOrdersPage";
import OrderDetailsPage from "./pages/client/OrderDetailsPage";
import AboutPage from "./pages/client/AboutPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import SignOutPage from "./pages/SignOutPage";

import StHomePage from "./pages/st/StHomePage";
import StViewAllOrders from "./pages/st/StViewAllOrders";
import StGenerateReport from "./pages/st/StGenerateReport";
import StGenerateInvoices from "./pages/st/StGenerateInvoices";
import StSendReminders from "./pages/st/StSendReminders";

import WhHomePage from "./pages/wh/WhHomePage";
import WhAddProduct from "./pages/wh/WhAddProduct";
import WhGetProduct from "./pages/wh/WhGetProduct";
import WhRemoveProduct from "./pages/wh/WhRemoveProduct";
import WhUpdateProduct from "./pages/wh/WhUpdateProduct";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders/make" element={<MakeAnOrderPage />} />
            <Route path="/orders/view" element={<ViewOrdersPage />} />
            <Route
              path="/orders/view/:orderId"
              element={<OrderDetailsPage />}
            />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signout" element={<SignOutPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route element={<PrivateRoutes role="st" />}>
              <Route path="/st" element={<StHomePage />} />
              <Route path="/st/view-all-orders" element={<StViewAllOrders />} />
              <Route
                path="/st/generate-report"
                element={<StGenerateReport />}
              />
              <Route
                path="/st/generate-invoices"
                element={<StGenerateInvoices />}
              />
              <Route path="/st/send-reminders" element={<StSendReminders />} />
            </Route>
            <Route path="/st/signin" element={<SigninPage />} />

            <Route element={<PrivateRoutes role="wh" />}>
              <Route path="/wh/" element={<WhHomePage />} />
              <Route path="/wh/add-product" element={<WhAddProduct />} />
              <Route path="/wh/get-product" element={<WhGetProduct />} />
              <Route path="/wh/remove-product" element={<WhRemoveProduct />} />
              <Route path="/wh/update-product" element={<WhUpdateProduct />} />
            </Route>
            <Route path="/wh/signin" element={<SigninPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
