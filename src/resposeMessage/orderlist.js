require("dotenv").config();

module.exports = () => [
  {
    type: "flex",
    altText: "ตะกร้าสินค้า",
    contents: {
      type: "carousel",
      contents: [
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://firebasestorage.googleapis.com/v0/b/comscipay.appspot.com/o/541197-steam-logo-640x360.jpg?alt=media&token=4df824b3-5459-4736-9b06-c9d9f54563e9",
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
                text: "Order #1",
                weight: "bold",
                size: "xl",
                contents: [],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ข้อมูลลูกค้า",
                    size: "sm",
                    color: "#999999",
                    flex: 0,
                    align: "start",
                    margin: "md",
                    contents: [],
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                margin: "lg",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "ชื่อลูกค้า:",
                        size: "sm",
                        color: "#AAAAAA",
                        flex: 1,
                        contents: [],
                      },
                      {
                        type: "text",
                        text: "ธนกฤต ศรีสุข",
                        size: "sm",
                        color: "#666666",
                        flex: 3,
                        wrap: true,
                        contents: [],
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "Email:",
                        size: "sm",
                        color: "#AAAAAA",
                        flex: 2,
                        contents: [],
                      },
                      {
                        type: "text",
                        text: "62050167@kmitl.ac.th",
                        size: "sm",
                        color: "#666666",
                        flex: 6,
                        wrap: true,
                        contents: [],
                      },
                    ],
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "รายการสินค้า",
                    weight: "bold",
                    contents: [],
                  },
                  {
                    type: "text",
                    text: "- Steam Wallet 180 THB",
                    contents: [],
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: ".",
                    contents: [],
                  },
                  {
                    type: "text",
                    text: "✔️ ดำเนินการเสร็จสิ้น",
                    weight: "bold",
                    align: "start",
                    gravity: "center",
                    contents: [],
                  },
                ],
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
                type: "button",
                action: {
                  type: "message",
                  label: "ยืนยันคำสั่งซื้อ",
                  text: "ยืนยันคำสั่งซื้อ",
                },
                color: "#C4E4FFFF",
                height: "sm",
                style: "link",
              },
              {
                type: "spacer",
                size: "sm",
              },
            ],
          },
        },
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://firebasestorage.googleapis.com/v0/b/comscipay.appspot.com/o/541197-steam-logo-640x360.jpg?alt=media&token=4df824b3-5459-4736-9b06-c9d9f54563e9",
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
                text: "Order #2",
                weight: "bold",
                size: "xl",
                contents: [],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ข้อมูลลูกค้า",
                    size: "sm",
                    color: "#999999",
                    flex: 0,
                    margin: "md",
                    contents: [],
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                margin: "lg",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "ชื่อลูกค้า:",
                        size: "sm",
                        color: "#AAAAAA",
                        flex: 1,
                        contents: [],
                      },
                      {
                        type: "text",
                        text: "ธนกฤต ศรีสุข",
                        size: "sm",
                        color: "#666666",
                        flex: 3,
                        wrap: true,
                        contents: [],
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "Email:",
                        size: "sm",
                        color: "#AAAAAA",
                        flex: 1,
                        contents: [],
                      },
                      {
                        type: "text",
                        text: "62050167@kmitl.ac.th",
                        size: "sm",
                        color: "#666666",
                        flex: 3,
                        wrap: true,
                        contents: [],
                      },
                    ],
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "รายการสินค้า",
                    weight: "bold",
                    contents: [],
                  },
                  {
                    type: "text",
                    text: "- Steam Wallet 1950 THB",
                    contents: [],
                  },
                  {
                    type: "text",
                    text: "- Steam Wallet 650 THB",
                    contents: [],
                  },
                ],
              },
              {
                type: "text",
                text: ".",
                contents: [],
              },
              {
                type: "text",
                text: "❓ รอการชำระเงิน",
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
                type: "button",
                action: {
                  type: "message",
                  label: "ยืนยันคำสั่งซื้อ",
                  text: "ยืนยันคำสั่งซื้อ",
                },
                color: "#C4E4FFFF",
                height: "sm",
                style: "link",
              },
              {
                type: "spacer",
                size: "sm",
              },
            ],
          },
        },
      ],
    },
  },
];
