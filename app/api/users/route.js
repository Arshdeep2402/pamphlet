import { query } from "@/lib/db";

export async function GET(request) {
    try {
        const users = await query({
            query: "SELECT * FROM users",
            values: [],
        });

        let data = JSON.stringify(users);
        return new Response(data, {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching users", error: error.message }), {
            status: 500,
        });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone } = body;

        if (!name || !email) {
            throw new Error("Missing required fields");
        }

        const result = await query({
            query: "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
            values: [name, email, phone || null], // Use null if phone is not provided
        });

        return new Response(JSON.stringify({
            message: "success",
            status: 200,
            user: { id: result.insertId, name, email, phone },
        }), { headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error creating user", error: error.message }), {
            status: 500,
        });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, name, email, phone } = body;

        if (!id || !name || !email) {
            throw new Error("Missing required fields");
        }

        const result = await query({
            query: "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
            values: [name, email, phone || null, id], // Use null if phone is not provided
        });

        return new Response(JSON.stringify({
            message: result.affectedRows > 0 ? "success" : "error",
            status: 200,
            user: { id, name, email, phone },
        }), { headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error updating user", error: error.message }), {
            status: 500,
        });
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            throw new Error("Missing required fields");
        }

        const result = await query({
            query: "DELETE FROM users WHERE id = ?",
            values: [id],
        });

        return new Response(JSON.stringify({
            message: result.affectedRows > 0 ? "success" : "error",
            status: 200,
            user: { id },
        }), { headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error deleting user", error: error.message }), {
            status: 500,
        });
    }
}
