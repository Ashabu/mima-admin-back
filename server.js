const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose')


const server = express();

server.use(cors({ origin: true, credentials: true }));

const affiliateRoutes = require('./routes/affiliateRoutes');

const faqRouts = require('./routes/faqRouts');
const bennefitRouts = require('./routes/benefitsRouts');
const commissionRouts = require('./routes/commissionRouts');
const testimonialRoutes = require('./routes/testimonialRoutes');
const partnerRoutes = require('./routes/partnerRouts');
const userRouters = require('./routes/userRoutes');
const marketingToolRoutes = require('./routes/marketinToolsRoutes');
const skypeLinkRoutes = require('./routes/skypeLinkRoutes');
const amountRangeroutes = require('./routes/amountRangeRoutes');
const imageRoutes = require('./routes/imageRoutes');







server.use(bodyParser.json({ limit: '50mb' }));

server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

server.use(affiliateRoutes)

server.use(faqRouts);

server.use(bennefitRouts);

server.use(commissionRouts);

server.use(testimonialRoutes);

server.use(partnerRoutes);

server.use(userRouters);



server.use(marketingToolRoutes);

server.use(skypeLinkRoutes);

server.use(amountRangeroutes);

server.use(imageRoutes);





const uri = process.env.DB_CONNECTION_URI
const PORT = process.env.PORT || 8080;

mongoose
  .connect(uri)
  .then(result => {
    server.listen(PORT, () => {
      console.log( `Server Listening On Port ${PORT}...`);
    });
  })
  .catch(error => {
    console.log(error);
  });
