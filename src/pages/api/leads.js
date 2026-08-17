import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1. Save lead to Google Sheets
    const sheetsResponse = await fetch(
      process.env.GOOGLE_SHEETS_WEBHOOK_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      }
    );

    const sheetsResult = await sheetsResponse.text();

    if (!sheetsResponse.ok) {
      throw new Error(
        `Google Sheets failed: ${sheetsResponse.status} - ${sheetsResult}`
      );
    }

    // 2. Send notification email AFTER successful Sheet submission
    await transporter.sendMail({
      from: `"Website Leads" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_NOTIFICATION_EMAIL,
      subject: `🔥 New Website Audit Lead — ${name}`,

      text: `
New website audit lead!

Name: ${name}
Email: ${email}
Phone: ${phone}

The lead has also been saved to Google Sheets.
      `,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          background: #f5f5f3;
        ">
          <div style="
            background: #000;
            color: #fff;
            padding: 25px;
            border-radius: 16px;
          ">
            <p style="
              margin: 0 0 10px;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 2px;
              opacity: .6;
            ">
              New Lead
            </p>

            <h1 style="
              margin: 0;
              font-size: 28px;
            ">
              🔥 You got a new lead.
            </h1>
          </div>

          <div style="
            background: #fff;
            margin-top: 15px;
            padding: 25px;
            border-radius: 16px;
          ">
            <p><strong>Name</strong></p>
            <p>${name}</p>

            <p><strong>Email</strong></p>
            <p>${email}</p>

            <p><strong>Phone</strong></p>
            <p>${phone}</p>

            <hr style="
              border: none;
              border-top: 1px solid #eee;
              margin: 25px 0;
            ">

            <p style="
              color: #777;
              font-size: 13px;
            ">
              This lead has also been saved to your Google Sheets CRM.
            </p>
          </div>
        </div>
      `,
    });

    // 3. Everything succeeded
    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error("Lead submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting your lead.",
    });
  }
}