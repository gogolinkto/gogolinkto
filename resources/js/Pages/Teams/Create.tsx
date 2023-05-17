import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import NewLayout from "@/Layouts/NewLayout";

export default function Create() {
  return (
    <NewLayout
      title="Create Team"
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <CreateTeamForm />
        </div>
      </div>
    </NewLayout>
  );
}
