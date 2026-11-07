import { CONFIG } from 'src/config-global';

import { VendorView } from 'src/sections/vendor/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Vendors - ${CONFIG.appName}`}</title>

      <VendorView />
    </>
  );
}
