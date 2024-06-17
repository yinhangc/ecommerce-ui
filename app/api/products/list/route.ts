const BASE_URL = "http://localhost:8888/v1/api/products/list";

export async function POST(req: Request) {
  console.log("POST req", req);
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return Response.json(data);
  //   return data;
}
