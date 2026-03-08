import { useState } from "react";
import { useParams } from "react-router-dom";

import { useInvoiceStats, useInvoices } from "@/hooks/useInvoice";
import { InvoiceStatsCards } from "./components/InvoiceStatsCards";
import { InvoiceTable } from "./components/InvoiceTable";

export const InvoicePage = () => {
  const { id: locationId } = useParams<{ id: string }>();

  const [page, setPage] = useState(1);
  const [take] = useState(10);

  const { stats, isLoading: isStatsLoading } = useInvoiceStats(locationId);
  const { invoicesData, isLoading: isInvoicesLoading } = useInvoices(
    locationId,
    {
      page,
      take,
    },
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <InvoiceStatsCards stats={stats} isLoading={isStatsLoading} />
      </div>

      <InvoiceTable
        data={invoicesData?.data || []}
        isLoading={isInvoicesLoading}
        page={invoicesData?.meta.page || 1}
        take={invoicesData?.meta.take || 10}
        total={invoicesData?.meta.itemCount || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
