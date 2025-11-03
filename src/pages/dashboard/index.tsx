import BannerComponent from "@/components/dashboard/home/BannerComponent";
import { memo } from "react";

const DashboardHome = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <BannerComponent />
      </div>
    </div>
  );
};
export default memo(DashboardHome);
