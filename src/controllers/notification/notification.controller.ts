import { Request, Response } from "express";
import FCM from "fcm-node";
import admin from "firebase-admin";
import FirebaseModel from "../../models/firebase.model";

export const pushNotification = async (req: Request, res: Response) => {
  const fcm = new FCM(
    "AAAAwAnaOEg:APA91bGMS6-PZ2EWmJloezLacnEMXH6FkF8NJYsMsrmqTVuxvZF5ZBzHUxil1M6BQuREvsF9D-maCF_Bpay5LnwJ46WDtGKpOseWmnrgDgoIs6kORUzVU79B2OgxF1aC2zhx_zc58MYt"
  );
  try {
    const listToken = await FirebaseModel.find();
    const tokens = listToken.map((item) => item.token);
    let message = {
      // to: tokens,
      tokens: tokens,
      notification: {
        title: req.body.title,
        body: req.body.content,
      },
      data: {
        title: "test",
        message: "test message",
      },
    };
    await admin
      .messaging()
      .sendEachForMulticast(message)
      .then((data) => {
        return res.status(200).send({
          message: data,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err,
        });
      });
    // fcm.send(message, function (err, resp) {
    //   if (err) {
    //     console.log("err", err);
    //     return res.status(500).send({
    //       message: err,
    //     });
    //   } else {
    //     return res.status(200).send({
    //       message: resp,
    //     });
    //   }
    // });
  } catch (error) {
    return res.status(500).json(error);
  }
};
