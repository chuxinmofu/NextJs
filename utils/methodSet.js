
/**  
 * 解析 URL 的路径部分，将其拆分为路径段数组。  
 * @param {string} url - 要解析的 URL。  
 * @returns {Array<string>} - 路径段数组，排除了空字符串。  
 */
export const handleParsePathParams = (url) => {
  if (typeof url !== 'string') {
    throw new TypeError('Expected a string but received ' + typeof url);
  }
  const path = url.split('?')[0]?.replace(/^\//, '');
  return path ? path.split('/').filter(Boolean) : [];
};