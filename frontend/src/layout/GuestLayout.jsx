import AuthFooter from "@/components/common/AuthFooter";
import AuthHeader from "@/components/common/AuthHeader";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <div>
      <AuthHeader />
      <main>
        <Outlet />
      </main>
      <AuthFooter />
    </div>
  );
};

export default GuestLayout;
