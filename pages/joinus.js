/* eslint-disable no-undef */
import React from 'react';

import Layout from '@/components/Layout';
import SectionJoinUsHero from '@/sections/SectionJoinUsHero';
import SectionMemberType from '@/sections/SectionMemberType';
import SectionApplicationSteps from '@/sections/SectionApplicationSteps';

export default function JoinUs() {
  return (
    <div>
      <Layout>
        <SectionJoinUsHero />
        <SectionMemberType />
        <SectionApplicationSteps />
      </Layout>
    </div>
  );
}
