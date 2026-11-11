import { processAuthorizeNetPayment } from '../../src/api/donateRoute.js';

/**
 * Netlify Serverless Function Handler for Authorize.Net Payments
 * Endpoint: POST /api/donate (routed via netlify.toml)
 */
export async function handler(event, context) {
  // CORS & Method Check
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const result = await processAuthorizeNetPayment(payload);

    return {
      statusCode: result.status || (result.success ? 200 : 400),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error('[Netlify Function Error]', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        message: 'Internal server error processing payment.',
      }),
    };
  }
}
