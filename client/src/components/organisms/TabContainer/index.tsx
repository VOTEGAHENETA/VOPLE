import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import BaseButton from '@/components/atoms/BaseButton';
import ChatBoard from '../ChatBoard';
import PledgeTab from '../PledgeTab';
import PosterBoard from '../PosterBoard';

type TabType = 'chat' | 'notice' | 'poster';

interface TabInfo {
  type: TabType;
  label: string;
}

const TABS: TabInfo[] = [
  { type: 'chat', label: '채팅방' },
  { type: 'notice', label: '공지' },
  { type: 'poster', label: '포스터' },
];

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatBoard roomId='' />;
      case 'notice':
        return <NoticeBoard />;
      case 'poster':
        return <PosterBoard />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabNavigator}>
        {TABS.map(({ type, label }) => (
          <BaseButton
            key={type}
            kind='mini-chip'
            status='fill'
            type='button'
            customClass={clsx(styles.tabButton, {
              [styles.active]: activeTab === type,
            })}
            onClick={() => handleTabClick(type)}
          >
            {label}
          </BaseButton>
        ))}
      </div>

      <div className={styles.tabContent}>{renderContent()}</div>
    </div>
  );
}
