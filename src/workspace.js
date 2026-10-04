export function validateWorkspace(value) {
  if (!(typeof value === 'string' && value.startsWith('/') && value.length <= 4096 && !/[\0\r\n\\]/.test(value)
    && !value.split('/').some(part => ['.', '..', '.local'].includes(part)))) {
    throw new Error('Enter an absolute store directory on the connected Agent Server, without symlinks or parent-directory segments.');
  }
  return value.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';
}
