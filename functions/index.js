const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const cors = require("cors")({ origin: true });

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

exports.httpEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const toName = req.body.toName;
    const toEmail = req.body.toEmail;
    const linkUrl = req.body.url;

    const msg = {
      to: toEmail,

      from: "contact@filipstepien.com",
      subject: "Make Up A Gift",
      //   html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

      // custom templates
      templateId: "d3bb3469-5439-4ff9-a71e-30dc5af5e3f3",
      substitutionWrappers: ["{{", "}}"],
      substitutions: {
        name: toName,
        url: linkUrl
        // and other custom properties here
      }
    };

    return sgMail
      .send(msg)

      .then(() => res.status(200).send("email sent!"))
      .catch(err => res.status(400).send(err));
  });
});
