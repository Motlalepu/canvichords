import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SupabaseDiag: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const append = (s: string) => setLog((l) => [...l, s]);

  useEffect(() => {
    append('Starting Supabase diagnostics...');

    const supabaseClient = supabase as { url?: string };
    const url = supabaseClient.url || '';
    append(`Supabase client URL present: ${Boolean(url)}`);

    // Log env vars presence from import.meta if available
    try {
      const viteUrl = (import.meta.env as unknown as { VITE_SUPABASE_URL?: string }).VITE_SUPABASE_URL;
      const viteKey = (import.meta.env as unknown as { VITE_SUPABASE_PUBLISHABLE_KEY?: string }).VITE_SUPABASE_PUBLISHABLE_KEY;
      append(`import.meta.env.VITE_SUPABASE_URL present: ${Boolean(viteUrl)}`);
      append(`import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY present: ${Boolean(viteKey)}`);
    } catch (e) {
      append('Could not read import.meta.env (this is expected in some bundlers).');
    }

    const metaEnv = import.meta.env as unknown as { VITE_SUPABASE_URL?: string };
    const SUPABASE_URL: string = metaEnv.VITE_SUPABASE_URL || '';
    append(`Runtime SUPABASE_URL string length: ${SUPABASE_URL ? SUPABASE_URL.length : 0}`);

    // Try a HEAD request to the auth endpoint to test connectivity.
    const authEndpoint = (SUPABASE_URL || '') + '/auth/v1';

    if (!SUPABASE_URL) {
      append('No SUPABASE_URL detected in runtime environment. Restart dev server and ensure .env has VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.');
      return;
    }

    append(`Attempting network request to ${authEndpoint} (this may hit CORS restrictions but will reveal network errors)...`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    fetch(authEndpoint, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeout);
        append(`Fetch completed: status=${res.status} type=${res.type}`);
        if (res.type === 'opaque') {
          append('Response is opaque — CORS likely blocked the response body but server is reachable. Check browser console for CORS messages.');
        }
        if (!res.ok) {
          append('Non-OK status — check the response in Network tab for details.');
        } else {
          append('OK response from Supabase auth endpoint.');
        }
      })
      .catch((err: Error) => {
        clearTimeout(timeout);
        if (err.name === 'AbortError') {
          append('Request timed out (possible network issue or server not reachable).');
        } else {
          append(`Fetch error: ${err.message || String(err)}`);
        }
        append('If you see "Failed to fetch", it usually means the browser could not reach the Supabase host (DNS, connection refused) or the dev server/build lacks the correct env vars.');
      });

    // Also try a lightweight supabase SDK call to see SDK-level error
    (async () => {
      try {
        append('Calling supabase.auth.getSession() to see SDK behavior...');
        const res = await supabase.auth.getSession();
        append(`supabase.auth.getSession() returned: ${JSON.stringify(res?.data ?? res)}`);
      } catch (e: Error | unknown) {
        const errorMsg = e instanceof Error ? e.message : String(e);
        append(`supabase SDK call error: ${errorMsg}`);
      }
    })();

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Supabase Diagnostics</h1>
      <p className="mb-4 text-muted-foreground">This page attempts to contact your Supabase project and reports simple diagnostics. Open the browser console and Network tab for more details.</p>

      <div className="bg-card p-4 rounded-md border">
        {log.map((l, i) => (
          <div key={i} className="text-sm mb-1">{l}</div>
        ))}
      </div>

      <div className="mt-6 text-sm">
        <strong>Next checks:</strong>
        <ul className="list-disc ml-6 mt-2 text-muted-foreground">
          <li>Restart dev server after changing `.env` (e.g. `npm run dev`).</li>
          <li>Open DevTools &gt; Network and filter for `supabase.co` when reproducing the error.</li>
          <li>In Supabase dashboard, ensure Auth redirect/CORS settings include your dev origin (e.g. `http://localhost:5173`).</li>
        </ul>
      </div>
    </div>
  );
};

export default SupabaseDiag;
