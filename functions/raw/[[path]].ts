import { notFound, parseBucketPath } from "@/utils/bucket";

export async function onRequestGet(context) {
  const [bucket, path] = parseBucketPath(context);
  if (!bucket) return notFound();
  let u2 = context.request.url.split("/raw/")[1]
  let u2Length = u2.length % 4
  const url = "https://i" + u2Length + ".wp.com/" + context.env["PUBURL"] + "/" + u2
  // const url = context.env["PUBURL"] + "/" + context.request.url.split("/raw/")[1]
  var response = await fetch(new Request(url, {
    body: context.request.body,
    headers: context.request.headers,
    method: context.request.method,
    redirect: "follow",
  }))

  const headers = new Headers(response.headers);
  if (path.startsWith("_$flaredrive$/thumbnails/")) {
    headers.set("Cache-Control", "max-age=31536000");
  }

  return new Response(response.body, {
    headers: headers,
    status: response.status,
    statusText: response.statusText
  });
}
