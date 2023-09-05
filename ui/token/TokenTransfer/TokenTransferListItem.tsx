import { Flex, Skeleton } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { TokenTransfer } from 'types/api/tokenTransfer';

import eastArrowIcon from 'icons/arrows/east.svg';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import Address from 'ui/shared/address/Address';
import AddressIcon from 'ui/shared/address/AddressIcon';
import AddressLink from 'ui/shared/address/AddressLink';
import Icon from 'ui/shared/chakra/Icon';
import Tag from 'ui/shared/chakra/Tag';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';
import TokenTransferNft from 'ui/shared/TokenTransfer/TokenTransferNft';
import TruncatedValue from 'ui/shared/TruncatedValue';

type Props = TokenTransfer & { tokenId?: string; isLoading?: boolean };

const TokenTransferListItem = ({
  token,
  total,
  tx_hash: txHash,
  from,
  to,
  method,
  timestamp,
  tokenId,
  isLoading,
}: Props) => {
  const value = (() => {
    if (!('value' in total)) {
      return null;
    }

    return BigNumber(total.value).div(BigNumber(10 ** Number(total.decimals))).dp(8).toFormat();
  })();

  const timeAgo = useTimeAgoIncrement(timestamp, true);

  return (
    <ListItemMobile rowGap={ 3 } isAnimated>
      <Flex justifyContent="space-between" alignItems="center" lineHeight="24px" width="100%">
        <TxEntity
          isLoading={ isLoading }
          hash={ txHash }
          truncation="constant"
          fontWeight="700"
        />
        { timestamp && (
          <Skeleton isLoaded={ !isLoading } display="inline-block" fontWeight="400" fontSize="sm" color="text_secondary">
            <span>
              { timeAgo }
            </span>
          </Skeleton>
        ) }
      </Flex>
      { method && <Tag isLoading={ isLoading }>{ method }</Tag> }
      <Flex w="100%" columnGap={ 3 }>
        <Address width="50%">
          <AddressIcon address={ from } isLoading={ isLoading }/>
          <AddressLink ml={ 2 } fontWeight="500" hash={ from.hash } type="address_token" tokenHash={ token.address } isLoading={ isLoading }/>
          <CopyToClipboard text={ from.hash } isLoading={ isLoading }/>
        </Address>
        <Icon as={ eastArrowIcon } boxSize={ 6 } color="gray.500" isLoading={ isLoading }/>
        <Address width="50%">
          <AddressIcon address={ to } isLoading={ isLoading }/>
          <AddressLink ml={ 2 } fontWeight="500" hash={ to.hash } type="address_token" tokenHash={ token.address } isLoading={ isLoading }/>
          <CopyToClipboard text={ to.hash } isLoading={ isLoading }/>
        </Address>
      </Flex>
      { value && (token.type === 'URC-20' || token.type === 'URC-1155') && (
        <Flex columnGap={ 2 } w="100%">
          <Skeleton isLoaded={ !isLoading } flexShrink={ 0 } fontWeight={ 500 }>
            Value
          </Skeleton>
          <Skeleton isLoaded={ !isLoading } color="text_secondary">
            <span>{ value }</span>
          </Skeleton>
          { token.symbol && <TruncatedValue isLoading={ isLoading } value={ token.symbol }/> }
        </Flex>
      ) }
      { 'token_id' in total && (token.type === 'URC-721' || token.type === 'URC-1155') && (
        <TokenTransferNft
          hash={ token.address }
          id={ total.token_id }
          isDisabled={ Boolean(tokenId && tokenId === total.token_id) }
          isLoading={ isLoading }
        />
      ) }
    </ListItemMobile>
  );
};

export default React.memo(TokenTransferListItem);
