import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  Web3Button,
} from '@thirdweb-dev/react';
import { ethers, utils } from 'ethers';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const contractAddress = '0x1D233aD24b976F624Ca240D6094DFAE40C4e3487';
  const address = useAddress();
  const [quantity, setQuantity] = useState('1');
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, 'priceForAddress', [
    address,
    quantity,
  ]);

  let price;
  if (isLoading) {
    price = 'Loading...';
  } else if (data === undefined) {
    price = 'Error fetching price';
  } else {
    price =
      data.toString() === '0'
        ? 'Free'
        : `${utils.formatEther(data)} ETH`;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <a href="https://thirdweb.com/nach.eth/DynamicFreeMint/">
            Dynamic Free Mint
          </a>
          !
        </h1>

        <p className={styles.description}>
          Limit how many NFTs each wallet can claim for free.
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginTop: '10px' }}>
        
        <Web3Button
  contractAddress={contractAddress}
  action={(contract) => {
    if (price !== 'Error fetching price') {
      const value = price === 'Free' ? '0' : utils.parseUnits(price.split(' ')[0], 18).toString();
      contract.call('claim', [address, quantity], {
        value: ethers.BigNumber.from(value),
      });
    }
  }}
>
  Mint {price}
</Web3Button>

        </div>
      </main>
    </div>
  );
};

export default Home;
