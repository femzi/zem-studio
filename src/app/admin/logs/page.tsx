"use client";

import Header from "@/components/ui/header";
import { useEffect, useState } from "react";
// toast intentionally unused here; kept import removed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyIcon } from "@phosphor-icons/react";
import verifyPassword from "@/server/verify-password";
import listAdminLogs from "@/server/list-admin-logs";

// Collapsible JSON tree viewer (small, no external deps)
function JSONNode({ name, data, depth = 0 }: { name?: string; data: any; depth?: number }) {
    const [open, setOpen] = useState(depth < 1); // root open, children collapsed

    const isObject = data && typeof data === "object" && !Array.isArray(data);
    const isArray = Array.isArray(data);

    const toggle = () => setOpen((v) => !v);

    const renderValue = (val: any) => {
        if (val === null) return <span className="text-gray-500">null</span>;
        const t = typeof val;
        if (t === "string") return <span className="text-green-600">{`"${val}"`}</span>;
        if (t === "number") return <span className="text-blue-600">{String(val)}</span>;
        if (t === "boolean") return <span className="text-pink-600">{String(val)}</span>;
        return <span className="text-gray-600">{String(val)}</span>;
    };

    return (
        <div className="text-xs font-mono">
            <div className="flex items-start gap-2">
                {(isObject || isArray) ? (
                    <button onClick={toggle} className="text-sm text-gray-500 hover:text-gray-700">{open ? "▾" : "▸"}</button>
                ) : (
                    <span className="w-4" />
                )}
                <div className="flex-1">
                    <div>
                        {name !== undefined && <span className="text-amber-600">{name}</span>}
                        {name !== undefined && <span>: </span>}
                        {isObject && <span className="text-gray-500">{`{...}`}</span>}
                        {isArray && <span className="text-gray-500">{`[${data.length}]`}</span>}
                        {!isObject && !isArray && renderValue(data)}
                    </div>
                    {open && (isObject || isArray) && (
                        <div className="pl-4 mt-1">
                            {isArray
                                ? data.map((item: any, idx: number) => (
                                      <JSONNode key={idx} name={String(idx)} data={item} depth={depth + 1} />
                                  ))
                                : Object.keys(data).map((k) => (
                                      <JSONNode key={k} name={k} data={data[k]} depth={depth + 1} />
                                  ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function JSONTreeViewer({ content }: { content: string }) {
    // content is a pretty JSON string or raw string
    let parsed: any = null;
    try {
        parsed = JSON.parse(content);
    } catch {
        parsed = null;
    }

    if (parsed === null) {
        return <pre className="whitespace-pre-wrap text-xs">{content}</pre>;
    }

    return (
        <div>
            <JSONNode data={parsed} depth={0} />
        </div>
    );
}

export default function AdminLogsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(20);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (!isAuthenticated) return;
        setLoading(true);
        listAdminLogs({ page, limit })
            .then((res) => {
                setLogs(res.logs?.rows || []);
                setTotal(res.total || 0);
                setLimit(res.limit || 20);
            })
            .catch(() => setLogs([]))
            .finally(() => setLoading(false));
    }, [page, limit, isAuthenticated]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setAuthLoading(true);
        setError("");
        try {
            const result = await verifyPassword({ password });
            if (result.valid) {
                setIsAuthenticated(true);
            } else {
                setError("Invalid password");
                setPassword("");
            }
        } catch {
            setError("Failed to verify password");
            setPassword("");
        } finally {
            setAuthLoading(false);
        }
    }

    if (!isAuthenticated) {
        return (
            <div>
                <Header />
                <div className="px-4 sm:px-12 lg:px-24 py-8 min-h-[80vh] flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                                <LockKeyIcon size={32} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Admin Logs</h1>
                            <p className="text-gray-700 dark:text-gray-400">Enter admin password to view logs</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>
                            <Button type="submit" disabled={authLoading} className="w-full">
                                {authLoading ? "Checking..." : "Unlock Logs"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="px-4 sm:px-12 lg:px-24 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Admin Logs</h1>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
                        <div className="font-mono">Page {page} of {Math.max(1, Math.ceil(total / limit))}</div>
                        <Button onClick={() => setPage((p) => Math.min(Math.max(1, Math.ceil(total / limit)), p + 1))} disabled={page >= Math.ceil(total / limit)}>Next</Button>
                        <input
                            type="number"
                            min={1}
                            max={Math.max(1, Math.ceil(total / limit))}
                            value={String(page)}
                            onChange={(e) => setPage(Math.min(Math.max(1, Number(e.target.value || 1)), Math.max(1, Math.ceil(total / limit))))}
                            className="w-16 text-sm rounded-md border px-2 py-1"
                            aria-label="Go to page"
                        />
                        <Input
                            placeholder="Filter logs..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="ml-4 w-48"
                        />
                    </div>
                </div>

                <div className="border rounded-none overflow-x-auto">
                    <table className="w-full table-auto text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="text-left px-4 py-2">When</th>
                                <th className="text-left px-4 py-2">Action</th>
                                <th className="text-left px-4 py-2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={3} className="p-4 text-center">Loading...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan={3} className="p-4 text-center">No logs found</td></tr>
                            ) : (
                                logs
                                    .filter((r: any) => {
                                        if (!filter) return true;
                                        const q = filter.toLowerCase();
                                        return (
                                            String(r.action || "").toLowerCase().includes(q) ||
                                            String(r.details || "").toLowerCase().includes(q) ||
                                            String(r.createdAt || "").toLowerCase().includes(q)
                                        );
                                    })
                                    .map((r: any) => {
                                    // Try to parse details as JSON when possible and pretty-print
                                    let pretty = "";
                                    try {
                                        if (typeof r.details === "string") {
                                            // attempt to parse JSON string
                                            const parsed = JSON.parse(r.details);
                                            pretty = JSON.stringify(parsed, null, 2);
                                        } else if (r.details) {
                                            pretty = JSON.stringify(r.details, null, 2);
                                        } else {
                                            pretty = "";
                                        }
                                    } catch {
                                        // not JSON, just show raw string
                                        pretty = String(r.details);
                                    }

                                    return (
                                        <tr key={r.$id} className="border-t">
                                            <td className="px-4 py-3 align-top">{new Date(Number(r.createdAt || Date.now())).toLocaleString()}</td>
                                            <td className="px-4 py-3 align-top font-mono">{r.action}</td>
                                            <td className="px-4 py-3 align-top">
                                                <JSONTreeViewer content={pretty} />
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
