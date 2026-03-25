import { Layout, Button, Avatar, Dropdown, type MenuProps } from 'antd';
import { BellOutlined, MenuOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { LANGUAGE_DATA, LOCALE_STORAGE, LOCALES } from '@/constants';
import { URL } from '@/constants/url.constant';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hooks/useAuth';
import { useAppSelector } from '@/redux/hooks';
import { nameInitial } from '@/utils';

const { Header } = Layout;

interface TenantHeaderProps {
  onMenuClick?: () => void;
}

export const TenantHeader = ({ onMenuClick }: TenantHeaderProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { mutate: logoutMutate } = useLogout();
  const { user } = useAppSelector((state) => state.auth);

  const userMenuItems: MenuProps['items'] = [
    {
      key: URL.PROFILE,
      label: t('tenant.header.menu.profile'),
      onClick: () => navigate(URL.PROFILE),
    },
    {
      key: 'logout',
      label: t('tenant.header.menu.logout'),
      onClick: () => {
        logoutMutate();
      },
    },
  ];

  const handleChangeLanguage: MenuProps['onClick'] = ({ key }) => {
    i18n.changeLanguage(key.toString());
    localStorage.setItem(LOCALE_STORAGE, key.toString());
  };

  const languageMenu: MenuProps = {
    items: LANGUAGE_DATA,
    onClick: handleChangeLanguage,
  };

  const currentLang = i18n.language === LOCALES.EN ? LOCALES.EN : LOCALES.VI;

  return (
    <Header className='flex items-center justify-between bg-[#393939]! px-4 sm:px-6 text-white!'>
      <Button
        type='text'
        icon={<MenuOutlined />}
        className='text-white!'
        aria-label='Toggle menu'
        onClick={onMenuClick}
      />

      <div className='flex items-center gap-6'>
        <Dropdown menu={languageMenu} trigger={['click']}>
          <button className='flex items-center gap-1 text-white'>
            <GlobalOutlined aria-hidden='true' />
            <span className='text-xs font-medium uppercase'>{currentLang}</span>
          </button>
        </Dropdown>

        <Button
          type='text'
          shape='circle'
          icon={<BellOutlined />}
          className='text-white!'
          aria-label='Notifications'
        />
        <Dropdown
          menu={{
            items: userMenuItems,
          }}
          trigger={['click']}
        >
          <button className='flex items-center gap-2 text-white'>
            <Avatar size='small' src={user?.avatar}>
              {nameInitial(user?.name)}
            </Avatar>
            <span className='text-sm font-medium'>
              {user?.name || t('tenant.header.user', 'User')}
            </span>
          </button>
        </Dropdown>
      </div>
    </Header>
  );
};
