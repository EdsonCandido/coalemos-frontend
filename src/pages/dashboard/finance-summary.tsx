import ChartAreaInteractive from "@/components/dashboard/home/ChartAreaInteractive";
import DataTableSumary from "@/components/dashboard/home/DataTableSumary";
import SectionCards from "@/components/dashboard/home/SectionCards";
import { memo } from "react";

const FinanceSummary = () => {
  return (
         <div className="flex flex-1 flex-col">
             <div className="@container/main flex flex-1 flex-col gap-2">
                 <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                     <SectionCards />
 
                     <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
 
                         <div className="">
                             <ChartAreaInteractive />
                         </div>
 
                         <div className="">
                             <DataTableSumary />
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     );
}

export default memo(FinanceSummary)