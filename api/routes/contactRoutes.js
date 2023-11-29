const transporter = require("../config/transporter");

const router = require("express").Router();

router.post("/", (req, res) => {
  // Extract data from the request body
  const { name, email, message } = req.body;

  // Set up email options
  const mailOptions = {
    from: email,
    to: process.env.MY_EMAIL,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ success: true, message: "Message sent successfully" });
    }
  });
});

module.exports = router;
