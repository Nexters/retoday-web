import type { PageSnapshot } from "@/entities/history/model/storage.type";

function getPageSnapshot(): PageSnapshot {
  const description =
    document.querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.content ??
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.content ??
    null;

  const faviconHref =
    document.querySelector<HTMLLinkElement>('link[rel="icon"]')?.href ??
    document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]')
      ?.href ??
    null;

  return {
    url: window.location.href,
    title: document.title,
    metadata: {
      description,
      faviconUrl: faviconHref,
    },
  };
}
export { getPageSnapshot };
