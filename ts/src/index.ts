import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
