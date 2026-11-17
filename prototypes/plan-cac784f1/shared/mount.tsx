import 'src/global.css';

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createMemoryRouter } from 'react-router';

import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------
// Mounts one prototype page inside the app's ThemeProvider (src/main.tsx →
// src/app.tsx) and the dashboard shell, on a memory router so the shell's
// router hooks work without the app's real routes.

declare global {
  interface Window {
    __discoPreviewReady?: boolean;
  }
}

type MountOptions = {
  /** Path the memory router starts on (drives the nav's active item). */
  path?: string;
};

function Ready({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.__discoPreviewReady = true;
  }, []);
  return <>{children}</>;
}

export function mountPage(Page: React.ComponentType, { path = '/prototype' }: MountOptions = {}) {
  window.__discoPreviewReady = false;

  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: (
          <ThemeProvider>
            <DashboardLayout>
              <Ready>
                <Page />
              </Ready>
            </DashboardLayout>
          </ThemeProvider>
        ),
      },
    ],
    { initialEntries: [path] }
  );

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
