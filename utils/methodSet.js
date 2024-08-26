export const handleParsePathParams = () => {
  if (typeof window.location.pathname !== 'string') {
    throw new TypeError('Expected a string but received ' + typeof window.location.pathname);
  }
  const path = window.location.pathname.split('?')[0]?.replace(/^\//, '');
  return path ? path.split('/').filter(Boolean) : [];
};