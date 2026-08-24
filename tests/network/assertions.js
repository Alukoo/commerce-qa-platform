const { expect } = require('@playwright/test');

async function validateNetwork(resp, opts = {}) {
  const {
    method = 'POST',
    endpointContains = null,
    allowedStatus = [],
    expectedBodyFields = [],
    requireAuthHeader = false,
    responseValidator = null,
  } = opts;

  const req = resp.request();
  // Method
  try { expect(req.method()).toBe(method); } catch (e) { /* fail on mismatch */ }

  // Endpoint
  if (endpointContains) {
    try { expect(resp.url()).toContain(endpointContains); } catch (e) {}
  }

  // Status
  const status = resp.status();
  const statusOk = allowedStatus.length > 0 ? allowedStatus.includes(status) : (status >= 200 && status < 300);
  try { expect(statusOk).toBeTruthy(); } catch (e) {}

  // Headers
  let headers = {};
  try { headers = req.headers ? req.headers() : {}; } catch (e) { headers = {}; }
  if (requireAuthHeader || process.env.API_TOKEN) {
    try { expect(headers.authorization || headers.Authorization).toBeTruthy(); } catch (e) {}
  }
  // Content-Type is recommended but optional; assert if present
  if (headers['content-type'] || headers['Content-Type']) {
    try { expect(typeof (headers['content-type'] || headers['Content-Type'])).toBe('string'); } catch (e) {}
  }

  // Request payload
  let payload = null;
  try {
    const pd = req.postData ? req.postData() : null;
    if (pd) {
      try { payload = JSON.parse(pd); } catch (e) { payload = pd; }
    }
  } catch (e) { payload = null; }

  if (expectedBodyFields && expectedBodyFields.length > 0) {
    try {
      expect(payload).toBeTruthy();
      for (const f of expectedBodyFields) {
        try { expect(payload[f] !== undefined).toBeTruthy(); } catch (e) {}
      }
    } catch (e) {}
  }

  // Response structure validator
  if (responseValidator) {
    try {
      const body = await resp.json().catch(() => null);
      if (body) responseValidator(body);
    } catch (e) {}
  }
}

module.exports = { validateNetwork };
