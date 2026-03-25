import { Edit2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { ProfileHeaderProps } from "@/interfaces";
import { nameInitial } from "@/utils";

export const ProfileHeader = ({
  user,
  isEditing,
  onEditToggle,
}: ProfileHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#14b8a6] to-[#3b82f6] p-8 shadow-lg">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative">
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white shadow-md"
              role={user?.avatar ? undefined : "img"}
              aria-label={
                user?.avatar ? undefined : user?.name || "User"
              }
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span
                  className="select-none text-4xl font-bold text-[#14b8a6]"
                  aria-hidden
                >
                  {nameInitial(user?.name)}
                </span>
              )}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white mb-1">
              {user?.name || "..."}
            </h1>
            <p className="text-white/80 font-medium mb-3">
              {user?.email || "..."}
            </p>
          </div>
        </div>

        <button
          onClick={onEditToggle}
          disabled={isEditing}
          className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-50"
        >
          <Edit2 className="h-4 w-4" />
          {t("pages.profile.edit")}
        </button>
      </div>
    </div>
  );
};
