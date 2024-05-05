import axios from "axios";
import { Request, Response } from "express";
require('dotenv').config();

const PAYOS_CLIENT_KEY = process.env.PAYOS_CLIENT_ID;
const PAYOS_API_KEY = process.env.PAYOS_API_KEY;

export default class VietQRController {

  async thanhtoanv2(req: Request, res: Response) {
    try {
      const p = {
        orderCode: 121111,
        amount: 10000,
        description: "VQRIO123",

        items: [
          {
            name: "Iphone",
            quantity: 1,
            price: 10000,
          },
        ],
        cancelUrl: "http://localhost:3000/api/getthanhtoan",
        returnUrl: "http://localhost:3000/api/getthanhtoan",
        expiredAt: 1714921736,
        signature:
          "c85290e154a2d0bceb9482b8eaa45ad2717a23b636281e341db9fa9362dcb6fd",
      };
      //   amount=10000&cancelUrl=http%3A%2F%2Flocalhost%3A3000%2Ffail&description=VQRIO123&orderCode=123&returnUrl=http%3A%2F%2Flocalhost%3A3000%2Fsuccess
      //amount=10000&cancelUrl=http://localhost:3000/fail&description=VQRIO123&orderCode=515&returnUrl=http://localhost:3000/success
      //   amount=10000&cancelUrl=&description=$description&orderCode=$orderCode&returnUrl=$returnUrl
      const headers = {
        "x-client-id": PAYOS_CLIENT_KEY,
        "x-api-key": PAYOS_API_KEY,
      };
      const a = await axios.post(
        "https://api-merchant.payos.vn/v2/payment-requests",
        p,
        {
          headers: headers,
        }
      );
      console.log(a);
      res.status(200).json({ a: a.data });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
  async getthanhtoan(req: Request, res: Response) {
    try {
      const result = req.query;
      console.log(result);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
