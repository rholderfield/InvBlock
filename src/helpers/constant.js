import abiProductFactory from "./ProductFactory.json";
import abiSupplierFactory from "./SupplierFactory.json";
import abiPurchaseOrderHeaderFactory from "./PurchaseOrderHeaderFactory.json";
import abiSalesOrderHeaderFactory from "./SalesOrderHeaderFactory.json";


const ProductFactory = {
    contractABI: abiProductFactory.abi,
    contractAddress: '0x131A797C069A241CE1ffb67325b0c8aD585ef9a8'
}

const SupplierFactory = {
    contractABI: abiSupplierFactory.abi,
    contractAddress: '0xd1C89a055be30E2587D6e7aDe07D88A8B82aD198'
}

const PurchaseOrderHeaderFactory = {
    contractABI: abiPurchaseOrderHeaderFactory.abi,
    contractAddress: '0xd8Fa416DedD91e2AEa215665aEbdEf3243D65F8C'
}

const SalesOrderHeaderFactory = {
    contractABI: abiSalesOrderHeaderFactory.abi,
    contractAddress: '0x44EEDc74585d31DAc62B95f76C0903fb4Ce2AB33'
}

const contractInvBlock = {
    ProductFactory, SupplierFactory, PurchaseOrderHeaderFactory, SalesOrderHeaderFactory
}

export default contractInvBlock ;