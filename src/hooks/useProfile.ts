import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { API_URL, QueryKeys } from "@/constants";
import type { UserProfile, UserStats, UserLocation } from "@/interfaces";

export const useProfile = () => {
  return useQuery<{ data: UserProfile }>({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: async () => {
      const { data } = await axios.get(API_URL.GET_PROFILE);
      return data;
    },
  });
};

export const useProfileStats = () => {
  return useQuery<{ data: UserStats }>({
    queryKey: [QueryKeys.PROFILE_STATS],
    queryFn: async () => {
      const { data } = await axios.get(API_URL.GET_PROFILE_STATS);
      return data;
    },
  });
};

export const useMeLocations = () => {
  return useQuery<{ data: UserLocation[] }>({
    queryKey: [QueryKeys.ME_LOCATIONS],
    queryFn: async () => {
      const { data } = await axios.get(API_URL.GET_ME_LOCATIONS);
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<UserProfile>) => {
      const { data } = await axios.patch(API_URL.UPDATE_PROFILE, payload);
      return data;
    },
    onSuccess: () => {
      message.success(
        t("pages.profile.updateSuccess", "Cập nhật dữ liệu thành công"),
      );
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_PROFILE] });
    },
    onError: () => {
      message.error(t("pages.profile.updateFail", "Cập nhật thất bại"));
    },
  });
};
