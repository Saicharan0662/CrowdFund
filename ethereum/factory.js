import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xBDBC18DcA71d5A1c3E0CdcBd6dD912333920cC56'
)

export default instance;