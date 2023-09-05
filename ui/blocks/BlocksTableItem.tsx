import { Tr, Td, Flex, Box, Tooltip, Skeleton, useColorModeValue } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { motion } from 'framer-motion';
import React from 'react';

import type { Block } from 'types/api/block';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import flameIcon from 'icons/flame.svg';
import getBlockTotalReward from 'lib/block/getBlockTotalReward';
import { WEI } from 'lib/consts';
import BlockTimestamp from 'ui/blocks/BlockTimestamp';
import AddressLink from 'ui/shared/address/AddressLink';
import Icon from 'ui/shared/chakra/Icon';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import GasUsedToTargetRatio from 'ui/shared/GasUsedToTargetRatio';
import LinkInternal from 'ui/shared/LinkInternal';
import TextSeparator from 'ui/shared/TextSeparator';
import Utilization from 'ui/shared/Utilization/Utilization';

interface Props {
  data: Block;
  isLoading?: boolean;
  enableTimeIncrement?: boolean;
}

const BlocksTableItem = ({ data, isLoading, enableTimeIncrement }: Props) => {
  const totalReward = getBlockTotalReward(data);
  const burntFees = BigNumber(data.burnt_fees || 0);
  const txFees = BigNumber(data.tx_fees || 0);

  const separatorColor = useColorModeValue('gray.200', 'gray.700');
  const burntFeesIconColor = useColorModeValue('gray.500', 'inherit');

  return (
    <Tr
      as={ motion.tr }
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      key={ data.height }
    >
      <Td fontSize="sm">
        <Flex columnGap={ 2 } alignItems="center" mb={ 2 }>
          <Tooltip isDisabled={ data.type !== 'reorg' } label="Chain reorganizations">
            <BlockEntity
              isLoading={ isLoading }
              number={ data.height }
              hash={ data.type === 'reorg' ? data.hash : undefined }
              noIcon
              fontSize="sm"
              lineHeight={ 5 }
              fontWeight={ 600 }
            />
          </Tooltip>
        </Flex>
        <BlockTimestamp ts={ data.timestamp } isEnabled={ enableTimeIncrement } isLoading={ isLoading }/>
      </Td>
      <Td fontSize="sm">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { data.size.toLocaleString() }
        </Skeleton>
      </Td>
      {/* <Td fontSize="sm">
        <AddressLink
          type="address"
          alias={ data.miner.name }
          hash={ data.miner.hash }
          truncation="constant"
          display="inline-flex"
          maxW="100%"
          isLoading={ isLoading }
        />
      </Td> */}
      <Td isNumeric fontSize="sm">
        { data.tx_count > 0 ? (
          <Skeleton isLoaded={ !isLoading } display="inline-block">
            <LinkInternal href={ route({
              pathname: '/block/[height_or_hash]',
              query: { height_or_hash: String(data.height), tab: 'txs' },
            }) }>
              { data.tx_count }
            </LinkInternal>
          </Skeleton>
        ) : data.tx_count }
      </Td>
      { !config.features.rollup.isEnabled && !config.UI.views.block.hiddenFields?.total_reward && (
        <Td fontSize="sm">
          <Skeleton isLoaded={ !isLoading } display="inline-block">{ BigNumber(data.gas_used || 0).toFormat() }</Skeleton>
          <Flex mt={ 2 }>
            <Tooltip label={ isLoading ? undefined : 'Gas Used %' }>
              <Box>
                <Utilization
                  colorScheme="gray"
                  value={ BigNumber(data.gas_used || 0).dividedBy(BigNumber(data.gas_limit)).toNumber() }
                  isLoading={ isLoading }
                />
              </Box>
            </Tooltip>
            { data.gas_target_percentage && (
              <>
                <TextSeparator color={ separatorColor } mx={ 1 }/>
                <GasUsedToTargetRatio value={ data.gas_target_percentage } isLoading={ isLoading }/>
              </>
            ) }
          </Flex>
        </Td>
      ) }
      <Td fontSize="sm">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { totalReward.toFixed(8) }
        </Skeleton>
      </Td>
      { !config.features.rollup.isEnabled && !config.UI.views.block.hiddenFields?.burnt_fees && (
        <Td fontSize="sm">
          <Flex alignItems="center" columnGap={ 1 }>
            <Icon as={ flameIcon } boxSize={ 5 } color={ burntFeesIconColor } isLoading={ isLoading }/>
            <Skeleton isLoaded={ !isLoading } display="inline-block">
              { burntFees.dividedBy(WEI).toFixed(8) }
            </Skeleton>
          </Flex>
          <Tooltip label={ isLoading ? undefined : 'Burnt fees / Txn fees * 100%' }>
            <Box w="min-content">
              <Utilization mt={ 2 } value={ burntFees.div(txFees).toNumber() } isLoading={ isLoading }/>
            </Box>
          </Tooltip>
        </Td>
      ) }
    </Tr>
  );
};

export default React.memo(BlocksTableItem);
