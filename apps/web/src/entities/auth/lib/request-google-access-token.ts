let loadPromise: Promise<void> | null = null;

function loadGoogleGisScript(): Promise<void> {
  if (window.google?.accounts?.oauth2?.initTokenClient) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const init = () => {
      if (window.google?.accounts?.oauth2?.initTokenClient) {
        resolve();
        return;
      }

      reject(new Error("Google GIS is not available."));
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-gis="true"]',
    );

    if (existing) {
      if (window.google?.accounts?.oauth2?.initTokenClient) {
        init();
        return;
      }

      existing.addEventListener("load", init, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google GIS.")),
        {
          once: true,
        },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleGis = "true";
    script.onload = init;
    script.onerror = () => reject(new Error("Failed to load Google GIS."));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export async function ensureGoogleGisLoaded(): Promise<void> {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  if (!clientId) {
    throw new Error("Google client ID is not configured.");
  }

  await loadGoogleGisScript();
}

export async function requestGoogleAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  if (!clientId) {
    throw new Error("Google client ID is not configured.");
  }

  await loadGoogleGisScript();

  return new Promise((resolve, reject) => {
    const client = window.google!.accounts!.oauth2!.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: (resp) => {
        if (resp.error) {
          reject(
            new Error(
              `Google error: ${resp.error} ${resp.error_description ?? ""}`.trim(),
            ),
          );
          return;
        }

        if (!resp.access_token) {
          reject(new Error("Google access_token이 없어요."));
          return;
        }

        resolve(resp.access_token);
      },
    });

    client.requestAccessToken({ prompt: "consent" });
  });
}
