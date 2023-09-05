import type { TokenType } from 'types/api/token';

const TOKEN_TYPE: Array<{ title: string; id: TokenType }> = [
  { title: 'URC-20', id: 'URC-20' },
  { title: 'URC-721', id: 'URC-721' },
  { title: 'URC-1155', id: 'URC-1155' },
];

export default TOKEN_TYPE;
