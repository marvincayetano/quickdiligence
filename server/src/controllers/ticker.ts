import { Request, Response } from "express";
import axios from "axios";

// Analyze everything else here
export const getTicker = async (req: Request, res: Response) => {
  await axios
    .get(
      `http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${req.params.search}&region=1&lang=en`
    )
    .then((result) => {
      res.send(result.data.ResultSet.Result);
    })
    .catch((err) => {
      console.log(err);
    });
};
