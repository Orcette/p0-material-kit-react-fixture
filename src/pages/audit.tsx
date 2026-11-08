import { CONFIG } from 'src/config-global';

import { AuditView } from 'src/sections/audit/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Audit - ${CONFIG.appName}`}</title>

      <AuditView />
    </>
  );
}
