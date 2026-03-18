import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import type {
  InvoiceDetailCommonCustomer,
  InvoiceDetailCommonLocation,
} from '@/interfaces';

import CustomerInfoItem from './CustomerInfoItem';

interface Props {
  customer: InvoiceDetailCommonCustomer;
  location?: InvoiceDetailCommonLocation;
  translationKeyPrefix?: string;
}

const CustomerInfoList: React.FC<Props> = ({
  customer,
  location,
  translationKeyPrefix,
}) => {
  const { t } = useTranslation();
  const keyPrefix = translationKeyPrefix ?? 'pages.invoice.detail';
  const fields = [
    {
      key: 'name',
      icon: <UserOutlined className='text-md text-white!' />,
      label: t(`${keyPrefix}.customerName`, 'Tên'),
      value: customer?.name,
    },
    {
      key: 'address',
      icon: <HomeOutlined className='text-md text-white!' />,
      label: t(`${keyPrefix}.address`, 'Địa chỉ'),
      value: customer?.address,
    },
    {
      key: 'phone',
      icon: <PhoneOutlined className='text-md text-white!' />,
      label: t(`${keyPrefix}.phone`, 'Số điện thoại'),
      value: customer?.phone,
    },
    {
      key: 'email',
      icon: <MailOutlined className='text-md text-white!' />,
      label: t(`${keyPrefix}.email`, 'Email'),
      value: customer?.email,
    },
  ].filter((f) => Boolean(f.value));

  return (
    <div className='mt-4'>
      {fields.map((field) => (
        <CustomerInfoItem
          key={field.key}
          icon={field.icon}
          label={field.label}
          value={field.value!}
        />
      ))}
      {location && (
        <div className='mt-6'>
          <div className='flex'>
            <div className='mr-3 h-12 w-3 rounded-sm bg-white' />
            <div>
              <div className='text-xl font-bold uppercase tracking-wide text-white'>
                {t(`${keyPrefix}.locationName`, {
                  name: location.name,
                  defaultValue: `Địa điểm: ${location.name}`,
                })}
              </div>
              {location.businessType && (
                <div className='text-md text-gray-300'>
                  {t(`${keyPrefix}.businessType`, {
                    type: location.businessType,
                    defaultValue: `${location.businessType}`,
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInfoList;
