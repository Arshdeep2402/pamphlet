
import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }

    const result = await query({ query: 'INSERT INTO subscribers (email) VALUES (?)', values: [email] });

    if (result.affectedRows > 0) {
      return new Response(JSON.stringify({ message: 'Subscription successful!' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Subscription failed.' }), { status: 500 });
    }
  } catch (error) {
    console.error('Error during subscription:', error);
    if (error.message.includes('ER_DUP_ENTRY')) {
      return new Response(JSON.stringify({ message: 'Email is already subscribed.' }), { status: 400 });
    }
    return new Response(JSON.stringify({ message: `Something went wrong: ${error.message}` }), { status: 500 });
  }
}
