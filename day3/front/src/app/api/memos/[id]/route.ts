import { NextResponse } from "next/server";

const LARAVEL_API =
    process.env.LARAVEL_API || "http://localhost:8003/api/memos";

type Params = {
    params: {
        id: string;
    };
};

export async function PUT(req: Request, { params }: Params) {
    try {
        const body = await req.json();

        const res = await fetch(`${LARAVEL_API}/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const text = await res.text();
            return NextResponse.json(
                { error: text },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    }   catch (err) {
        return NextResponse.json(
            { error: "Failed to update memo" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const res = await fetch(`${LARAVEL_API}/${params.id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const text = await res.text();
            return NextResponse.json(
                { error: text },
                { status: res.status }
            );
        }

        return NextResponse.json({ ok: true });
    }   catch (err) {
        return NextResponse.json(
            { error: "Failed to delete memo" },
            { status: 500 }
        );
    }
}
