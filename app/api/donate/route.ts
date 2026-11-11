import { NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '@/lib/env';

const PaymentPayloadSchema = z.object({
  amount: z.number().positive('Amount must be positive').max(10000, 'Donation amount exceeds limit'),
  opaqueData: z.object({
    dataDescriptor: z.string().min(1),
    dataValue: z.string().min(1),
  }),
  donor: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional().default(''),
  }),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parseResult = PaymentPayloadSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid donation details provided.' },
        { status: 400 }
      );
    }

    const { amount, opaqueData, donor } = parseResult.data;

    const isSandbox = process.env.AUTHORIZENET_ENV === 'sandbox';
    const endpoint = isSandbox
      ? 'https://apitest.authorize.net/xml/v1/request.api'
      : 'https://api.authorize.net/xml/v1/request.api';

    const apiLoginId = process.env.AUTHORIZENET_API_LOGIN_ID || env.NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID;
    const transactionKey = process.env.AUTHORIZENET_TRANSACTION_KEY;

    const transactionPayload = {
      createTransactionRequest: {
        merchantAuthentication: {
          name: apiLoginId,
          transactionKey: transactionKey,
        },
        transactionRequest: {
          transactionType: 'authCaptureTransaction',
          amount: amount,
          payment: {
            opaqueData: {
              dataDescriptor: opaqueData.dataDescriptor,
              dataValue: opaqueData.dataValue,
            },
          },
          order: {
            description: 'US-India Legacy 250 Donation',
          },
          customer: {
            id: donor.email.slice(0, 20),
            email: donor.email,
          },
          billTo: {
            firstName: donor.firstName,
            lastName: donor.lastName,
            phoneNumber: donor.phone || '',
          },
        },
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionPayload),
    });

    const data = await response.json();
    const result = data?.createTransactionRequestResponse || data;

    if (
      result?.messages?.resultCode === 'Ok' &&
      result?.transactionResponse?.responseCode === '1'
    ) {
      const transId = result.transactionResponse.transId;

      // Dispatch email notifications to internal team (info@indiauslegacy250.com & sanjeev@banyantreehub.com) and donor
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: '07f19a7d-ea21-48f7-8a77-c52bf1c2296e',
            subject: `[Internal Donation Notification] $${amount} USD from ${donor.firstName} ${donor.lastName} (Trans ID: ${transId})`,
            from_name: 'Legacy 250 — Mass India Partnership',
            replyto: donor.email,
            recipients: 'info@indiauslegacy250.com, sanjeev@banyantreehub.com',
            'Internal Team Notification': 'MassIndia Partnership & Legacy 250',
            'Internal Email 1': 'info@indiauslegacy250.com',
            'Internal Email 2': 'sanjeev@banyantreehub.com',
            'Donor Full Name': `${donor.firstName} ${donor.lastName}`,
            'Donor Email Address': donor.email,
            'Donor Phone Number': donor.phone || 'N/A',
            'Donation Amount ($ USD)': `$${amount} USD`,
            'Transaction Ref ID': transId,
            'Payment Status': 'SUCCESS (Authorized & Captured via Authorize.Net)',
            'Organization': 'Mass India Partnership (U.S.-registered 501(c)(6) Nonprofit Business League)',
            'Tax & Expense Notice': 'MassIndia Partnership is a 501(c)(6) non-profit trade organization. Contributions are not deductible as charitable contributions for federal income tax purposes. However, they may be tax-deductible as ordinary and necessary business expenses.',
          }),
        });
      } catch (emailErr) {
        console.error('[Internal Donation Notification Email Error]', emailErr);
      }

      return NextResponse.json({
        success: true,
        transactionId: transId,
      });
    }

    const failureReason =
      result?.transactionResponse?.errors?.[0]?.errorText ||
      result?.messages?.message?.[0]?.text ||
      'Transaction failed or declined.';

    return NextResponse.json(
      { success: false, message: failureReason },
      { status: 400 }
    );
  } catch (err: unknown) {
    console.error('Authorize.Net payment error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal payment processing error.' },
      { status: 500 }
    );
  }
}
