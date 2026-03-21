'use client';

import { useEffect, useState } from 'react';
import { EditProfileModal } from './edit-profile-modal';
import { Profile } from '@/types/database';

interface ProfileWrapperProps {
  children: React.ReactNode;
  profile: Profile;
}

export function ProfileWrapper({ children, profile }: ProfileWrapperProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenEditModal = () => setIsEditModalOpen(true);
    window.addEventListener('open-edit-modal', handleOpenEditModal);
    return () => {
      window.removeEventListener('open-edit-modal', handleOpenEditModal);
    };
  }, []);

  return (
    <>
      {children}
      <EditProfileModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        profile={profile}
      />
    </>
  );
}
