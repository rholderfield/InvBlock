import Moralis from "moralis";

Moralis.start({
  serverUrl: process.env.VUEAPPMORALISSERVERURL,
  appId: process.env.VUEAPPMORALISAPPID,
});

export default Moralis;
