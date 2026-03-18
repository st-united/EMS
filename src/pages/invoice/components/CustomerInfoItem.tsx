import type React from "react";

interface CustomerInfoItemProps {
  icon: React.ReactNode;
  label?: string;
  value: string;
}

const CustomerInfoItem: React.FC<CustomerInfoItemProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-10 items-center justify-center">{icon}</div>
      <div className="text-md text-gray-200">
        {label && <span className="mr-1 font-medium">{label}</span>}
        {value}
      </div>
    </div>
  );
};

export default CustomerInfoItem;

