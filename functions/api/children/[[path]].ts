export async function onRequestGet(context) {
  try {
    const { request, env, params } = context;
    const path = (params.path || []).map(dir => decodeURIComponent(dir) + "/").join("");
    const driveid = new URL(request.url).hostname.replace(/\..*/, "");

    const objList = await env[driveid].list({ prefix: path, delimiter: "/" });
    const objKeys = objList.objects.map((obj) => {
      const { key, size, uploaded, customMetadata } = obj;
      return { key, size, uploaded, customMetadata };
    });

    let folders = objList.delimitedPrefixes;
    if (!path) folders = folders.filter(folder => folder !== "_$flaredrive$/")

    return new Response(
      JSON.stringify({ value: objKeys, folders }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(e.toString(), { status: 500 });
  }
}