'use client';

import { memo } from 'react';

export default memo(function TestB({ show }: { show: boolean }) {
  // console.log('TestB i do not want to re-render');
  return <div>TestA</div>;
});
