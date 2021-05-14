require("dotenv").config();

module.exports = () => [
  {
    type: "flex",
    altText: "ยินดีตอนรับ",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://firebasestorage.googleapis.com/v0/b/comscipay.appspot.com/o/steam.jpg?alt=media&token=841b28b9-47f6-43bb-9464-7558a471fd19",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "ยินดีตอนรับ",
            weight: "bold",
            size: "xl",
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
        ],
      },
    },
  },
  {
    type: "text",
    text: "สามารถทำรายการเร่งด่วน ได้โดยการใช้ตัวช่วยที่เราเตรียมไว้ให้ข้างล่างนี้ได้เลย",
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "message",
            label: "สั่งซื้อแพ็คเกจ",
            text: "สั่งซื้อแพ็คเกจ",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "ตรวจสอบสถานะ",
            text: "ตรวจสอบสถานะ",
          },
        },
      ],
    },
  },
];
