export const handleParsePathParams = () => {
  if (typeof window.location.pathname !== 'string') {
    throw new TypeError('Expected a string but received ' + typeof window.location.pathname);
  }
  const path = window.location.pathname.split('?')[0]?.replace(/^\//, '');
  return path ? path.split('/').filter(Boolean) : [];
};

export const handleFormattedTableData = (object = {}) => {
  return Object.entries(object).map(([key, element]) => {
    const { zhCN, enUS } = element || {};
    return {
      key,
      stringID: key,
      zhCN: zhCN || undefined,
      enUS: enUS || undefined,
    };
  });
}

export const handleRemoveFirstDotAndBefore = (str) => {
  const index = str.indexOf('.');
  if (index !== -1) {
    return str.substring(index + 1);
  } else {
    return str;
  }
}  