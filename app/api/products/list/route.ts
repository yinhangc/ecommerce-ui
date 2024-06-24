console.log('process.env.SERVER_URL', process.env.SERVER_URL);
const BASE_URL = `${process.env.SERVER_URL}/v1/api/products/list`;

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const data = await res.json();
  return Response.json(data);
}
