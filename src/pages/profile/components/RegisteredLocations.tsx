import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { RegisteredLocationsProps } from "@/interfaces";

export const RegisteredLocations = ({
  locations,
  isLoading,
}: RegisteredLocationsProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-[#1f2937] bg-[#0b0c10] p-6 shadow-sm overflow-hidden flex flex-col h-full">
      <h2 className="text-xl font-bold text-white mb-6 shrink-0">
        {t("pages.profile.locations.title")}
      </h2>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse flex items-center gap-4 rounded-xl border border-[#1f2937] p-4 bg-[#111827]"
            >
              <div className="h-10 w-10 rounded-lg bg-[#374151]" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-[#374151] rounded" />
                <div className="h-3 w-48 bg-[#374151] rounded" />
              </div>
            </div>
          ))
        ) : locations && locations.length > 0 ? (
          locations.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center gap-4 rounded-xl border border-[#1f2937] p-4 bg-[#0b0c10] transition-all hover:border-[#3b82f6]/50 hover:bg-[#111827]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/10 text-[#3b82f6]">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-white truncate">{loc.name}</p>
                <p className="text-xs text-[#9ca3af] truncate">
                  {loc.workspaceName ||
                    loc.address ||
                    t("pages.invoice.table.water")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-[#111827] rounded-xl border border-dashed border-[#1f2937]">
            <MapPin className="h-8 w-8 text-[#4b5563] mb-2" />
            <p className="text-sm text-[#9ca3af]">{t("NOT_FOUND.TITLE")}</p>
          </div>
        )}
      </div>
    </div>
  );
};
