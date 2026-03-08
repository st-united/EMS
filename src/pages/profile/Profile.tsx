import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  useProfile,
  useProfileStats,
  useMeLocations,
  useUpdateProfile,
} from "@/hooks/useProfile";
import type { UserProfile } from "@/interfaces";

import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileForm } from "./components/ProfileForm";
import { ProfileStats } from "./components/ProfileStats";
import { RegisteredLocations } from "./components/RegisteredLocations";

import "@/pages/invoice/styles.css";

export const ProfilePage = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const { data: profileData } = useProfile();
  const { data: statsData, isLoading: isStatsLoading } = useProfileStats();
  const { data: locationsData, isLoading: isLocationsLoading } =
    useMeLocations();
  const updateProfileMutation = useUpdateProfile();

  const handleSave = (formData: Partial<UserProfile>) => {
    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between lg:hidden text-pretty">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
          {t("pages.profile.title")}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <ProfileHeader
            user={profileData?.data}
            isEditing={isEditing}
            onEditToggle={() => setIsEditing(true)}
          />
          <ProfileForm
            key={profileData?.data?.email || t("common.loading")}
            user={profileData?.data}
            isEditing={isEditing}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
            isLoading={updateProfileMutation.isPending}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <ProfileStats stats={statsData?.data} isLoading={isStatsLoading} />
          <RegisteredLocations
            locations={locationsData?.data}
            isLoading={isLocationsLoading}
          />
        </div>
      </div>
    </div>
  );
};
