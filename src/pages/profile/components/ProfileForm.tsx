import { useState } from "react";
import { useTranslation } from "react-i18next";
import { User, Mail, Phone, Calendar, MapPin, Save, X } from "lucide-react";
import dayjs from "dayjs";

import type { ProfileFormProps, UserProfile } from "@/interfaces";

export const ProfileForm = ({
  user,
  isEditing,
  onCancel,
  onSave,
  isLoading,
}: ProfileFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    dateOfBirth: user?.dateOfBirth
      ? dayjs(user.dateOfBirth).format("YYYY-MM-DD")
      : "",
    address: user?.address,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="mt-8 rounded-2xl border border-[#1f2937] bg-[#0b0c10] p-8 shadow-sm">
      <h2 className="text-xl font-bold text-white mb-8">
        {t("pages.profile.title")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
              {t("pages.profile.fullName")}
            </label>
            <div
              className={`relative flex items-center rounded-xl border ${isEditing ? "border-[#3b82f6] bg-[#111827]" : "border-[#1f2937] bg-[#0b0c10]"} p-4 transition-all focus-within:ring-2 focus-within:ring-[#3b82f6]/50`}
            >
              <User className="mr-3 h-5 w-5 text-[#4b5563]" />
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-transparent text-white outline-none disabled:cursor-not-allowed"
                placeholder={t("pages.profile.fullName")}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
              {t("pages.profile.email")}
            </label>
            <div
              className={`relative flex items-center rounded-xl border border-[#1f2937] bg-[#0b0c10]/50 p-4 transition-all opacity-80 cursor-not-allowed`}
            >
              <Mail className="mr-3 h-5 w-5 text-[#4b5563]" />
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                disabled
                className="w-full bg-transparent text-[#9ca3af] outline-none"
                placeholder={t("pages.profile.email")}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
              {t("pages.profile.phone")}
            </label>
            <div
              className={`relative flex items-center rounded-xl border ${isEditing ? "border-[#3b82f6] bg-[#111827]" : "border-[#1f2937] bg-[#0b0c10]"} p-4 transition-all focus-within:ring-2 focus-within:ring-[#3b82f6]/50`}
            >
              <Phone className="mr-3 h-5 w-5 text-[#4b5563]" />
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-transparent text-white outline-none disabled:cursor-not-allowed"
                placeholder={t("pages.profile.phone")}
              />
            </div>
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
              {t("pages.profile.dob")}
            </label>
            <div
              className={`relative flex items-center rounded-xl border ${isEditing ? "border-[#3b82f6] bg-[#111827]" : "border-[#1f2937] bg-[#0b0c10]"} p-4 transition-all focus-within:ring-2 focus-within:ring-[#3b82f6]/50`}
            >
              <Calendar className="mr-3 h-5 w-5 text-[#4b5563]" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-transparent text-white outline-none disabled:cursor-not-allowed scheme-dark"
              />
            </div>
          </div>

          {/* Address */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
              {t("pages.profile.address")}
            </label>
            <div
              className={`relative flex items-start rounded-xl border ${isEditing ? "border-[#3b82f6] bg-[#111827]" : "border-[#1f2937] bg-[#0b0c10]"} p-4 transition-all focus-within:ring-2 focus-within:ring-[#3b82f6]/50`}
            >
              <MapPin className="mr-3 mt-1 h-5 w-5 text-[#4b5563]" />
              <textarea
                name="address"
                rows={4}
                value={formData.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-transparent text-white outline-none disabled:cursor-not-allowed resize-none"
                placeholder={t("pages.profile.address")}
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 rounded-xl border border-[#1f2937] bg-transparent px-8 py-3 font-semibold text-white transition-all hover:bg-white/5"
            >
              <X className="h-4 w-4" />
              {t("pages.profile.cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-[#14b8a6] px-8 py-3 font-semibold text-white transition-all hover:bg-[#0d9488] disabled:opacity-50 shadow-md"
            >
              <Save className="h-4 w-4" />
              {isLoading ? t("common.loading") : t("pages.profile.save")}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
