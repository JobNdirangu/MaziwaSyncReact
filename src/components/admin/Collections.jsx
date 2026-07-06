import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const Collections = () => {

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    // ── Summary stats derived from the data ──
    const [summary, setSummary] = useState({
        total_liters: 0,
        total_amount: 0,
        total_records: 0,
    });

    // ── Fetch all collections ──────────────────────────────
    const fetchCollections = async () => {
        try {
            const { data } = await api.get("cooperative/collections/");

            // API returns paginated response — results array holds the records
            const results = data.results;
            setCollections(results);

            // ── Calculate summary totals from the results array ──
            const total_liters = results.reduce((sum, c) => sum + parseFloat(c.liters), 0);
            const total_amount = results.reduce((sum, c) => sum + parseFloat(c.total_amount), 0);
            setSummary({
                total_liters: total_liters.toFixed(2),
                total_amount: total_amount.toFixed(2),
                total_records: data.count,
            });

        } catch (err) {
            toast.error("Failed to load collections.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <div className="p-4 max-w-6xl mx-auto">

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Milk Collections</h2>
            </div>

            {/* ════════════════════════════════
                SUMMARY CARDS
                3 quick stats at the top
            ════════════════════════════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                <div className="card text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Records</p>
                    <p className="text-3xl font-bold text-teal-600">{summary.total_records}</p>
                </div>

                <div className="card text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Liters</p>
                    <p className="text-3xl font-bold text-green-600">{summary.total_liters} L</p>
                </div>

                <div className="card text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-green-600">KES {summary.total_amount}</p>
                </div>

            </div>

            {/* ════════════════════════════════
                COLLECTIONS TABLE
            ════════════════════════════════ */}

            {/* Loading state */}
            {loading && <p className="text-gray-500">Loading collections...</p>}

            {/* Empty state */}
            {!loading && collections.length === 0 && (
                <p className="text-gray-500">No collections found.</p>
            )}

            {/* Table */}
            {!loading && collections.length > 0 && (
                <div className="card overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Porter</th>
                                <th className="py-3 px-4">Session</th>
                                <th className="py-3 px-4">Liters</th>
                                <th className="py-3 px-4">Price / L</th>
                                <th className="py-3 px-4">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.map((c) => (
                                <tr key={c.id} className="border-b hover:bg-gray-50 transition">

                                    <td className="py-3 px-4 text-gray-400">{c.id}</td>
                                    <td className="py-3 px-4">{c.collection_date}</td>
                                    <td className="py-3 px-4 font-medium">{c.porter_name}</td>

                                    {/* Session badge — green for morning, blue for evening */}
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            c.session === "MORNING"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}>
                                            {c.session}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4">{c.liters} L</td>
                                    <td className="py-3 px-4">KES {c.price_per_liter}</td>

                                    {/* Total amount highlighted */}
                                    <td className="py-3 px-4 font-semibold text-green-700">
                                        KES {c.total_amount}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                        {/* ── Table footer with totals ── */}
                        <tfoot className="border-t bg-gray-50">
                            <tr>
                                <td colSpan={4} className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Totals
                                </td>
                                <td className="py-3 px-4 font-bold">{summary.total_liters} L</td>
                                <td className="py-3 px-4"></td>
                                <td className="py-3 px-4 font-bold text-green-700">
                                    KES {summary.total_amount}
                                </td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            )}

        </div>
    );
};

export default Collections;