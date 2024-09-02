import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import {SettingsPage} from '@/app/settings/profile/Settings'

const Settings: React.FC = () => {
  return (
    <PageWrapper pageHeader='Settings'>
      <div>
        <SettingsPage/>
      </div>
    </PageWrapper>
  );
};

export default Settings;