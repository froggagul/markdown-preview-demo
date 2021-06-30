// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ url: 'https://source.unsplash.com/random/200x200?sig=1' })
}
