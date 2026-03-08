export interface Credentials {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  avatar: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalInvoices: number;
  paidInvoices: number;
  unpaidInvoices: number;
  totalSpendingThisYear: number;
}

export interface UserLocation {
  id: string;
  name: string;
  address: string | null;
  workspaceName: string;
  workspaceAddress: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ProfileFormProps {
  user?: UserProfile;
  isEditing: boolean;
  onCancel: () => void;
  onSave: (data: Partial<UserProfile>) => void;
  isLoading?: boolean;
}

export interface ProfileHeaderProps {
  user?: UserProfile;
  isEditing: boolean;
  onEditToggle: () => void;
}

export interface ProfileStatsProps {
  stats?: UserStats;
  isLoading?: boolean;
}

export interface RegisteredLocationsProps {
  locations?: UserLocation[];
  isLoading?: boolean;
}
