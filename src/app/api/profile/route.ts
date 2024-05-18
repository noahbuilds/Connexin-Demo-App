export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (token !== "123") {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }
  const profileData = {
    name: "Edet Noah",
    email: "edetnoah@gmail.com",
  };
  return new Response(JSON.stringify(profileData), { status: 200 });
}
