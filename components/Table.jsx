import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { peer } from "@/const/peer";
import React from "react";
import fetch from "cross-fetch";
import axios from "axios";
import fetchNoCors from "fetch-no-cors";
import { Progress } from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function TableHome() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [error, setError] = useState([]);
  const [lcd, setLcd] = useState([]);
  useEffect(() => {
    let totalKey = peer.length;
    let i = 1;
    peer.map(async (v, k) => {
      try {
        let data = await axios.get(`/api/rpc?ip=${v}`);
        if (data.data.status == "success") {
          setData((old) => [
            ...old,
            {
              ip: `http://${v}:26657`,
              network: data?.data?.data?.result?.node_info?.network,
              id: data?.data?.data?.result?.node_info?.id,
              status:
                data?.data?.data?.result?.node_info?.network === "celestia"
                  ? "✅ Matches"
                  : "❌ Mismatches",
            },
          ]);
        }
      } catch (err) {}
      let process = (i++ / totalKey) * 100;
      setValue(Math.floor(process));
    });
  }, []);

  useEffect(() => {
    let totalKey = peer.length;
    let i = 1;
    peer.map(async (v, k) => {
      try {
        let data = await axios.get(`/api/lcd?ip=${v}`);
        if (data.data.status == "success") {
          setLcd((old) => [
            ...old,
            {
              ip: `http://${v}:1317`,
              network: data?.data?.data?.network,
              id: data?.data?.data?.default_node_id,
              status:
                data?.data?.data?.network === "celestia"
                  ? "✅ Matches"
                  : "❌ Mismatches",
            },
          ]);
        }
      } catch (err) {}
      let process = (i++ / totalKey) * 100;
      setValue2(Math.floor(process));
    });
  }, []);

  console.log(data);
  return (
    <>
      <div className="mt-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-6 mb-10">
        <div className="flex flex-col gap-3">
          <h3 className="text-gray-900 dark:text-white font-bold text-2xl md:text-3xl xl:text-3xl mb-5">
            RPC & LCD Discovery
          </h3>
          <Progress
            aria-label="Discover Peer"
            size="md"
            value={value}
            color="secondary"
            className="max-w-full"
          />

          <div className="text-left lg:max-w-full md:max-w-full sm:max-w-[100%] mb-3">
            <Table aria-label="Peer">
              <TableHeader>
                <TableColumn>IP (RPC)</TableColumn>
                <TableColumn>Network</TableColumn>
                <TableColumn>ID</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody>
                {data.map((v, k) => (
                  <TableRow key={k}>
                    <TableCell>{v.ip}</TableCell>
                    <TableCell>{v.network}</TableCell>
                    <TableCell>{v.id}</TableCell>
                    <TableCell>{v.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Progress
            aria-label="Discover Peer"
            size="md"
            value={value2}
            color="secondary"
            className="max-w-full"
          />
          <div className="text-left lg:max-w-full md:max-w-full sm:max-w-[100%]">
            <Table aria-label="Peer">
              <TableHeader>
                <TableColumn>IP (LCD)</TableColumn>
                <TableColumn>Network</TableColumn>
                <TableColumn>ID</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody>
                {lcd.map((v, k) => (
                  <TableRow key={k}>
                    <TableCell>{v?.ip}</TableCell>
                    <TableCell>{v?.network}</TableCell>
                    <TableCell>{v?.id}</TableCell>
                    <TableCell>{v?.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
