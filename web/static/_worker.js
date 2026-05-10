const PASSWORD_MD5 = "cf0b87ac6972edabd8540dd350af53da";
const AUTH_COOKIE = "kb_auth";
const AUTH_MAX_AGE = 60 * 60 * 24 * 30;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/__auth" && request.method === "POST") {
      return handleAuth(request, url);
    }

    if (url.pathname === "/__logout") {
      return redirect("/", {
        "Set-Cookie": `${AUTH_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
      });
    }

    if (isAuthorized(request)) {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(loginPage(url.searchParams.has("error")), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
};

async function handleAuth(request, url) {
  const form = await request.formData();
  const password = String(form.get("password") || "");

  if (md5(password) !== PASSWORD_MD5) {
    return redirect("/?error=1");
  }

  return redirect("/", {
    "Set-Cookie": `${AUTH_COOKIE}=${PASSWORD_MD5}; Path=/; Max-Age=${AUTH_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`
  });
}

function isAuthorized(request) {
  const cookie = request.headers.get("Cookie") || "";
  return parseCookies(cookie)[AUTH_COOKIE] === PASSWORD_MD5;
}

function parseCookies(cookieHeader) {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const separator = cookie.indexOf("=");
        if (separator === -1) return [cookie, ""];
        return [cookie.slice(0, separator), cookie.slice(separator + 1)];
      })
  );
}

function redirect(location, headers = {}) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      ...headers
    }
  });
}

function loginPage(hasError) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Knowledge Base Preview</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background: #f4f4f5;
        color: #18181b;
      }
      main {
        width: min(100% - 2rem, 24rem);
        display: grid;
        gap: 1rem;
      }
      h1 {
        margin: 0;
        font-size: 1.35rem;
        line-height: 1.2;
      }
      form {
        display: grid;
        gap: 0.8rem;
        padding: 1.25rem;
        border: 1px solid #d4d4d8;
        border-radius: 0.5rem;
        background: #ffffff;
      }
      label {
        display: grid;
        gap: 0.4rem;
        font-size: 0.9rem;
        font-weight: 650;
      }
      input,
      button {
        min-height: 2.75rem;
        border-radius: 0.4rem;
        font: inherit;
      }
      input {
        border: 1px solid #d4d4d8;
        padding: 0 0.75rem;
      }
      button {
        border: 0;
        background: #18181b;
        color: #ffffff;
        font-weight: 700;
        cursor: pointer;
      }
      .error {
        margin: 0;
        color: #b91c1c;
        font-size: 0.9rem;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background: #18181b;
          color: #fafafa;
        }
        form {
          border-color: #3f3f46;
          background: #27272a;
        }
        input {
          border-color: #52525b;
          background: #18181b;
          color: #fafafa;
        }
        button {
          background: #fafafa;
          color: #18181b;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Knowledge Base Preview</h1>
      <form method="post" action="/__auth">
        <label>
          Password
          <input name="password" type="password" autocomplete="current-password" autofocus required />
        </label>
        ${hasError ? '<p class="error">Incorrect password.</p>' : ""}
        <button type="submit">Unlock</button>
      </form>
    </main>
  </body>
</html>`;
}

function md5(input) {
  function rotateLeft(value, amount) {
    return (value << amount) | (value >>> (32 - amount));
  }

  function addUnsigned(x, y) {
    const x4 = x & 0x40000000;
    const y4 = y & 0x40000000;
    const x8 = x & 0x80000000;
    const y8 = y & 0x80000000;
    const result = (x & 0x3fffffff) + (y & 0x3fffffff);
    if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8;
    if (x4 | y4) {
      if (result & 0x40000000) return result ^ 0xc0000000 ^ x8 ^ y8;
      return result ^ 0x40000000 ^ x8 ^ y8;
    }
    return result ^ x8 ^ y8;
  }

  function f(x, y, z) {
    return (x & y) | (~x & z);
  }
  function g(x, y, z) {
    return (x & z) | (y & ~z);
  }
  function h(x, y, z) {
    return x ^ y ^ z;
  }
  function i(x, y, z) {
    return y ^ (x | ~z);
  }

  function transform(fn, a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, fn(b, c, d)), addUnsigned(x, ac)), s), b);
  }

  function utf8Encode(value) {
    return unescape(encodeURIComponent(value));
  }

  function toWordArray(value) {
    const length = value.length;
    const wordCount = (((length + 8) - ((length + 8) % 64)) / 64 + 1) * 16;
    const words = Array(wordCount - 1).fill(0);
    let bytePosition = 0;
    for (let i = 0; i < length; i += 1) {
      const wordIndex = (i - (i % 4)) / 4;
      bytePosition = (i % 4) * 8;
      words[wordIndex] |= value.charCodeAt(i) << bytePosition;
    }
    const wordIndex = (length - (length % 4)) / 4;
    bytePosition = (length % 4) * 8;
    words[wordIndex] |= 0x80 << bytePosition;
    words[wordCount - 2] = length << 3;
    words[wordCount - 1] = length >>> 29;
    return words;
  }

  function wordToHex(value) {
    let output = "";
    for (let i = 0; i <= 3; i += 1) {
      output += (`0${((value >>> (i * 8)) & 255).toString(16)}`).slice(-2);
    }
    return output;
  }

  const words = toWordArray(utf8Encode(input));
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let k = 0; k < words.length; k += 16) {
    const aa = a;
    const bb = b;
    const cc = c;
    const dd = d;

    a = transform(f, a, b, c, d, words[k + 0], 7, 0xd76aa478);
    d = transform(f, d, a, b, c, words[k + 1], 12, 0xe8c7b756);
    c = transform(f, c, d, a, b, words[k + 2], 17, 0x242070db);
    b = transform(f, b, c, d, a, words[k + 3], 22, 0xc1bdceee);
    a = transform(f, a, b, c, d, words[k + 4], 7, 0xf57c0faf);
    d = transform(f, d, a, b, c, words[k + 5], 12, 0x4787c62a);
    c = transform(f, c, d, a, b, words[k + 6], 17, 0xa8304613);
    b = transform(f, b, c, d, a, words[k + 7], 22, 0xfd469501);
    a = transform(f, a, b, c, d, words[k + 8], 7, 0x698098d8);
    d = transform(f, d, a, b, c, words[k + 9], 12, 0x8b44f7af);
    c = transform(f, c, d, a, b, words[k + 10], 17, 0xffff5bb1);
    b = transform(f, b, c, d, a, words[k + 11], 22, 0x895cd7be);
    a = transform(f, a, b, c, d, words[k + 12], 7, 0x6b901122);
    d = transform(f, d, a, b, c, words[k + 13], 12, 0xfd987193);
    c = transform(f, c, d, a, b, words[k + 14], 17, 0xa679438e);
    b = transform(f, b, c, d, a, words[k + 15], 22, 0x49b40821);

    a = transform(g, a, b, c, d, words[k + 1], 5, 0xf61e2562);
    d = transform(g, d, a, b, c, words[k + 6], 9, 0xc040b340);
    c = transform(g, c, d, a, b, words[k + 11], 14, 0x265e5a51);
    b = transform(g, b, c, d, a, words[k + 0], 20, 0xe9b6c7aa);
    a = transform(g, a, b, c, d, words[k + 5], 5, 0xd62f105d);
    d = transform(g, d, a, b, c, words[k + 10], 9, 0x02441453);
    c = transform(g, c, d, a, b, words[k + 15], 14, 0xd8a1e681);
    b = transform(g, b, c, d, a, words[k + 4], 20, 0xe7d3fbc8);
    a = transform(g, a, b, c, d, words[k + 9], 5, 0x21e1cde6);
    d = transform(g, d, a, b, c, words[k + 14], 9, 0xc33707d6);
    c = transform(g, c, d, a, b, words[k + 3], 14, 0xf4d50d87);
    b = transform(g, b, c, d, a, words[k + 8], 20, 0x455a14ed);
    a = transform(g, a, b, c, d, words[k + 13], 5, 0xa9e3e905);
    d = transform(g, d, a, b, c, words[k + 2], 9, 0xfcefa3f8);
    c = transform(g, c, d, a, b, words[k + 7], 14, 0x676f02d9);
    b = transform(g, b, c, d, a, words[k + 12], 20, 0x8d2a4c8a);

    a = transform(h, a, b, c, d, words[k + 5], 4, 0xfffa3942);
    d = transform(h, d, a, b, c, words[k + 8], 11, 0x8771f681);
    c = transform(h, c, d, a, b, words[k + 11], 16, 0x6d9d6122);
    b = transform(h, b, c, d, a, words[k + 14], 23, 0xfde5380c);
    a = transform(h, a, b, c, d, words[k + 1], 4, 0xa4beea44);
    d = transform(h, d, a, b, c, words[k + 4], 11, 0x4bdecfa9);
    c = transform(h, c, d, a, b, words[k + 7], 16, 0xf6bb4b60);
    b = transform(h, b, c, d, a, words[k + 10], 23, 0xbebfbc70);
    a = transform(h, a, b, c, d, words[k + 13], 4, 0x289b7ec6);
    d = transform(h, d, a, b, c, words[k + 0], 11, 0xeaa127fa);
    c = transform(h, c, d, a, b, words[k + 3], 16, 0xd4ef3085);
    b = transform(h, b, c, d, a, words[k + 6], 23, 0x04881d05);
    a = transform(h, a, b, c, d, words[k + 9], 4, 0xd9d4d039);
    d = transform(h, d, a, b, c, words[k + 12], 11, 0xe6db99e5);
    c = transform(h, c, d, a, b, words[k + 15], 16, 0x1fa27cf8);
    b = transform(h, b, c, d, a, words[k + 2], 23, 0xc4ac5665);

    a = transform(i, a, b, c, d, words[k + 0], 6, 0xf4292244);
    d = transform(i, d, a, b, c, words[k + 7], 10, 0x432aff97);
    c = transform(i, c, d, a, b, words[k + 14], 15, 0xab9423a7);
    b = transform(i, b, c, d, a, words[k + 5], 21, 0xfc93a039);
    a = transform(i, a, b, c, d, words[k + 12], 6, 0x655b59c3);
    d = transform(i, d, a, b, c, words[k + 3], 10, 0x8f0ccc92);
    c = transform(i, c, d, a, b, words[k + 10], 15, 0xffeff47d);
    b = transform(i, b, c, d, a, words[k + 1], 21, 0x85845dd1);
    a = transform(i, a, b, c, d, words[k + 8], 6, 0x6fa87e4f);
    d = transform(i, d, a, b, c, words[k + 15], 10, 0xfe2ce6e0);
    c = transform(i, c, d, a, b, words[k + 6], 15, 0xa3014314);
    b = transform(i, b, c, d, a, words[k + 13], 21, 0x4e0811a1);
    a = transform(i, a, b, c, d, words[k + 4], 6, 0xf7537e82);
    d = transform(i, d, a, b, c, words[k + 11], 10, 0xbd3af235);
    c = transform(i, c, d, a, b, words[k + 2], 15, 0x2ad7d2bb);
    b = transform(i, b, c, d, a, words[k + 9], 21, 0xeb86d391);

    a = addUnsigned(a, aa);
    b = addUnsigned(b, bb);
    c = addUnsigned(c, cc);
    d = addUnsigned(d, dd);
  }

  return `${wordToHex(a)}${wordToHex(b)}${wordToHex(c)}${wordToHex(d)}`.toLowerCase();
}
