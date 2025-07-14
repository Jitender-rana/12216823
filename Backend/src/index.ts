import express from 'express'
import { PrismaClient } from '@prisma/client';
import { logStack,levelStack,pkgStack } from './utils/types';
import { logger} from './middleware/logger';


import cors from "cors";
const prisma = new PrismaClient();

const app = express()

app.use(express.json())
app.use(cors());
app.use(async (req, res, next) => {
  await logger(logStack.backend, levelStack.info, pkgStack.route, `Incoming ${req.method} ${req.path}`);
  next();
});

app.post('/shortlinks', async (req, res) => {
  const { url, validity, shortcode } = req.body
  const result = await prisma.shortUrl.create({
    data: {
      url,
      shortcode,
      validity: validity ?? 30,
    },
  })
  res.json({
    shortlink: `${req.protocol}://${req.get('host')}/${result.shortcode}`,
    expiry: new Date(result.createdAt.getTime() + result.validity * 60000),
  })
})

app.get('/:shortcode', async (req, res) => {
  const entry = await prisma.shortUrl.findUnique({
    where: { shortcode: req.params.shortcode },
  })
  if (!entry) return res.status(404).send('Not found')
  const expiry = new Date(entry.createdAt.getTime() + entry.validity * 60000)
  if (new Date() > expiry) return res.status(410).send('Link expired')
  res.redirect(entry.url)
})

app.listen(3000, () => 
    console.log('listening on port 3000')
)
