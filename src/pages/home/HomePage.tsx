import { Button } from "antd";
import { LogIn, LogOut, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLogout } from "@/hooks";
import { URL } from "@/constants/url.constant";
import { useAppSelector } from "@/redux/hooks";

const DEMO_TENANT_ID = "demo-workspace-001";

export const HomePage = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const { mutate: logoutMutate, isPending: isLoggingOut } = useLogout();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#050819] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#191D2A] p-10 shadow-xl text-center">
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1890ff]/10">
            <Building2 className="h-8 w-8 text-[#1890ff]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">EMS</h1>
          <p className="text-sm text-[#99A1AF]">Energy Management System</p>
        </div>

        {isAuth ? (
          <div className="flex flex-col gap-3">
            <Button
              type="primary"
              size="large"
              icon={<Building2 size={18} />}
              className="w-full font-medium"
              onClick={() =>
                navigate(
                  URL.TENANT.replace(":id", DEMO_TENANT_ID) +
                    "/" +
                    URL.OVERVIEW,
                )
              }
            >
              Đi tới Tenant
            </Button>
            <Button
              size="large"
              danger
              icon={<LogOut size={18} />}
              className="w-full font-medium"
              loading={isLoggingOut}
              onClick={() => logoutMutate()}
            >
              Đăng xuất
            </Button>
          </div>
        ) : (
          <Button
            type="primary"
            size="large"
            icon={<LogIn size={18} />}
            className="w-full font-medium"
            onClick={() => navigate(URL.LOGIN)}
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  );
};
