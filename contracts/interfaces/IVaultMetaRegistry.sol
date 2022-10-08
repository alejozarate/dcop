pragma solidity 0.8.1;

interface IVaultMetaRegistry {
    function getMetaProvider(address vault_address) external view returns (address);
}