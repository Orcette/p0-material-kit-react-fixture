import { CONFIG } from 'src/config-global';

import { PartnerView } from 'src/sections/partner/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Partners - ${CONFIG.appName}`}</title>

      <PartnerView />
    </>
  );
}
