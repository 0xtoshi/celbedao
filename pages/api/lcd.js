// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from "cross-fetch";
import axios from "axios";
export default async function handler(req, res) {
  const ip = req.query.ip;
  if (isIPv4Address(ip) == true) {
    try {
      const f = await fetch(
        `http://${ip}:1317/cosmos/base/tendermint/v1beta1/node_info`,
        {
          timeout: 5000,
        }
      );
      let data = await f.json();
      res.json({ status: "success", data: data.default_node_info });
    } catch (err) {
      //console.log(err);
      res.json({ status: "error", message: "Error Fetching RPC" });
      //throw { status: "error", message: "Error Fetching RPC" };
    }
  } else {
    res.json({ status: "error", message: "Invalid Ip Address" });
    //throw { status: "error", message: "Invalid Ip Address" };
  }
}

function isIPv4Address(inputString) {
  let regex = new RegExp(/^(([0-9]{1,3}\.){3}[0-9]{1,3})$/);
  if (regex.test(inputString)) {
    let arInput = inputString.split(".");
    for (let i of arInput) {
      if (i.length > 1 && i.charAt(0) === "0") return false;
      else {
        if (parseInt(i) < 0 || parseInt(i) >= 256) return false;
      }
    }
  } else return false;
  return true;
}
