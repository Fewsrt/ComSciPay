require("dotenv").config();
const line = require("@line/bot-sdk");
const express = require("express");
const app = express();
const Sentry = require("@sentry/node");
const figlet = require("figlet");
const dialogflow = require("dialogflow");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { get } = require("lodash");
const { getUserProfile, getImageContent } = require("./src/middleware/line");
const {
  greetings,
  fallback,
  getstart,
  member,
  order,
  confirm,
  payment,
  orderlist,
  addmem,
  addmemtoDB,
} = require("./src/resposeMessage");
const {
  saveUserProfile,
  getUserData,
  setFieldOfUser,
  saveSensorData,
} = require("./src/middleware/firebase");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

Sentry.init({ dsn: process.env.SENTRY_DSN, env: process.env.SENTRY_ENV });

figlet(
  `${process.env.APP_NAME}`,
  {
    font: "isometric3",
    horizontalLayout: "default",
    verticalLayout: "default",
  },
  function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  }
);

app.use(Sentry.Handlers.requestHandler());

app.get("/", (req, res) => res.send("Hello World!"));

app.post(
  "/callback",
  line.middleware(config),
  getUserProfile(client),
  (req, res) => {
    Promise.all(req.body.events.map((event) => handleEvent(event, req)))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  }
);

async function handleEvent(event, req) {
  if (event.type === "follow") {
    await saveUserProfile({ profile: req.profile, status: "follow" });
    return client.replyMessage(
      event.replyToken,
      greetings(req.profile.displayName)
    );
  }

  if (event.type === "message" && event.message.type === "image") {
    let message = null;
    const messageId = get(event, "message.id", 0);
    const image = await client.getMessageContent(messageId);
    // uploadImageToImageProcessingServer
    message = {
      type: "flex",
      altText: "สั่งซื้อแพ็คเกจ",
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://firebasestorage.googleapis.com/v0/b/comscipay.appspot.com/o/steam.jpg?alt=media&token=841b28b9-47f6-43bb-9464-7558a471fd19",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            label: "Line",
            uri: "https://linecorp.com/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "ขอบคุณที่ใช้บริการ",
              weight: "bold",
              size: "xl",
              contents: [],
            },
            {
              type: "text",
              text: "สามารถตรวจสอบสินค้าได้ที่ E-mail",
              contents: [],
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          flex: 0,
          spacing: "sm",
          contents: [
            {
              type: "spacer",
              size: "sm",
            },
            {
              type: "button",
              action: {
                type: "message",
                label: "ตรวจสอบสถานะ",
                text: "ตรวจสอบสถานะ",
              },
              color: "#000000FF",
              style: "primary",
            },
          ],
        },
      },
    };
    return client.replyMessage(event.replyToken, message);
  }

  if (event.type === "message" && event.message.type === "text") {
    const dialogflowProjectId = process.env.DIALOG_FLOW_Project_ID;

    const sessionClient = new dialogflow.SessionsClient({
      projectId: dialogflowProjectId,
      credentials: {
        type: "service_account",
        project_id: "f15p-slxavh",
        private_key_id: "781a2aee5d1a549285ac6fa38f47f421b8a926a4",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCz0PojDsyajGqf\nWeaBnUgCnhr2c5xvQvv5xzm2sSQqwIIgasAsZoUR2tmV/2C4zC2J1OUpux1WxDGE\n1+8abZUnUyCUj3Os739BaKsCy9AgASx3Bf8ZEUAxZnSRb+CD68l1B16HhU2wmwja\n35JKtkQhRTNzYGUgbsff7iRhwlXuXJ1U7Dw1MYTTBPU0tTVyw9WzPMFS3bKDoyfc\nufpaXWPCbblU6++VYoRD58wu2+gl9gYnNkCMbiza8zqkjewcDWUOMQLtslZlOFS9\nzLerrtaRB/wUdaSpYFHOYa6ZOB7bsscCEJBBY9n6vSsFpRgzLfGNOjMbPln003mn\nIaSHiQrRAgMBAAECggEAM7fT8fhkNcFUO1/ukfIMT6BszdyjrkacVZONEHQznE5B\nPxSlEEAuXtvMwD0y8wPaxy1h+hY00otcWMKIpVfGUgixMrltwlwiBEyX/xZi1omv\n4c3qOKoDBhJbTadZcmgDSfMkJ6NaHIUCz30FRRLWVqFiMnmTrHfgahJDCZENCSDD\ntqQjGd8AUre4irmYWcYMtiTjx4L4ADMQYubQ9jbgeubBETstYV0bPEVfcAGmTkc7\nekEAFuxk30SkSFVaJVhN5cczPJG/1+cAzo7WLnQRMwXppFwG3cA+tLpQwhfobivs\nBa3fC5sHjQA8eMTclDi9FPNqj5vJ1dBPliB8FeQKTwKBgQDbUaHp0d/2ekltig2k\ne+ngdJsQ4dlq2PykIe0zpUeufXaZ9WD/qd3lxhqEaemhjyYn98JsK5iVFjcG9ZHI\n09kf0y2yFfx6BM+okj+/Z8uEn+0RAxUHXNlHTPbRGi1ZzDyf4FvcGF+4Ef5n9J45\nhKTJAcQoxzCVy+Zidn0HgC2wQwKBgQDR5ABJffvnNm6190O8dcUHivM7bvZri8eE\nEBnfQUzIxK/nIGnn8n4A8ZLpe6kkqEUqcb/rtj9Dvu3SAedKdhiPtYO9cQeKLIfR\nfZfWnRmTPUKzyde0mcF+0NqcrlDxnpN6nUNKVdjMoA3p+E+q3/sYIRX8mOtrhTcy\ntpnQO1ZhWwKBgHRapazX5JruG6CamkxGVTj4g//74g32mmo1eZNpv1LKSy646MIa\ni5fIdu8DBajpuhOANUyQAH4v7/eoNrS1974Tmm2djnnprYXAOUPBvE5bTjk1SmXC\nk59pLJSY77BxU0R6kiF9aOLN4Quj0oGvZoEhh8EelB8UsuBP/lsJXLPjAoGBAKNG\nwMprDRkSiRFZJwJmgz2Y5Bpp+Zw0AqNDezznqXnNOCGOX5SmWUsWofir0CrKE/Qu\nxOPyxEhJMOxburd8IyM4SyGF2h2tAoL/Nq0nTQvzbf46mGjP62xhwI5+NE2h1Ixf\n5kbffWXBZNGL7z24O7bLljUIKKtd2FDFJ+aLImldAoGBAJmp9HPOs+uYdcZYB/Wg\nSpnhwHEROULTNek/XFyDGL5I4tLOdZkEfLhKf+Pl3dM/Cf4KXTTde36wNQ5MjgbR\nDq1/gkQuptYf7vQddsLSGiehdVjig4thgIy8t8QS1ZRlH4bxic3ULkFCm9DQlDnJ\nX4u1Km1Zl4Vjc5ym9soe07Rh\n-----END PRIVATE KEY-----\n",
        client_email: "dialogflow-tsduqv@f15p-slxavh.iam.gserviceaccount.com",
        client_id: "103814843287639482109",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-tsduqv%40f15p-slxavh.iam.gserviceaccount.com",
      },
    });

    const sessionPath = sessionClient.sessionPath(
      dialogflowProjectId,
      req.profile.userId
    );

    const queryParams = {
      session: sessionPath,
      queryInput: {
        text: {
          text: event.message.text,
          languageCode: "th-TH",
        },
      },
    };

    // async..await is not allowed in global scope, must use a wrapper
    async function Gmailsend() {
      // สร้างออปเจ็ค transporter เพื่อกำหนดการเชื่อมต่อ SMTP และใช้ตอนส่งเมล
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          // ข้อมูลการเข้าสู่ระบบ
          user: "outcastwarm@gmail.com", // email user ของเรา
          pass: "Threethos05", // email password
        },
      });
      // เริ่มทำการส่งอีเมล
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <outcastwarm@gmail.com>', // อีเมลผู้ส่ง
        to: "outcastwarm@gmail.com", // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
        subject: "Hello ✔", // หัวข้ออีเมล
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
      console.log("Message sent: %s", info.messageId);
    }
    Gmailsend().catch(console.error);

    const currentUser = await getUserData({ userId: req.profile.userId });
    const userCurrentContext = get(currentUser, "context", "");
    let dialogflowResp = null;
    if (userCurrentContext.startsWith("get_")) {
      dialogflowResp = [
        {
          queryResult: {
            intent: {
              displayName: userCurrentContext,
            },
          },
        },
      ];
    } else {
      dialogflowResp = await sessionClient.detectIntent(queryParams);
    }
    const userIntent = get(dialogflowResp, "0.queryResult.intent.displayName");
    console.log(userIntent);
    let message = null;
    switch (userIntent) {
      case "member":
        message = member();
        break;
      case "Order":
        message = order();
        break;
      case "Order180":
        message = confirm();
        break;
      case "Order650":
        message = confirm();
        break;
      case "Order750":
        message = confirm();
        break;
      case "Order1950":
        message = confirm();
        break;
      case "Confirm":
        message = payment();
        sendMail();
        break;
      case "Orderlist":
        message = orderlist();
        break;
      case "addmem":
        message = addmem();
        break;
      case "addmemtoDB":
        message = addmemtoDB();
        break;
      default:
        message = fallback(req.profile.displayName);
        break;
    }
    return client.replyMessage(event.replyToken, message);
  }
  return Promise.resolve(null);
}

app.use(Sentry.Handlers.errorHandler());

app.listen(process.env.PORT || 5000, () =>
  console.log("listening on port 5000!")
);
