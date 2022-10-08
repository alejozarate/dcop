require('dotenv').config()

import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: "0.5.5", settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },{ version: "0.5.16", settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },{ version: "0.8.0", settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },{ version: "0.8.1", settings: {
    optimizer: {
      enabled: true,
      runs: 1000
    }
  }
} ],
  },
  networks: {
    hardhat: {
      
    },
    stardust: {
      url: `https://stardust.metis.io/?owner=588`,
      accounts: [String(process.env.MATIC_KEY)],
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [String(process.env.MATIC_KEY)],
    },
    mainnet: {
      url: `https://rpc-mainnet.maticvigil.com/`,
      accounts: [String(process.env.MATIC_KEY)],
    },
  },
};
export default config;