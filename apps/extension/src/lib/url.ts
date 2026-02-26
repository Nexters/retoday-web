function extractDomainUrl(url: string) {
  const normalizedInput =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  const urlObject = new URL(normalizedInput);

  return `${urlObject.protocol}//${urlObject.host}${urlObject.pathname}`;
}

export { extractDomainUrl };
