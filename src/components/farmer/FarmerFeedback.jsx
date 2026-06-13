import React, { useEffect, useState } from "react";
import api from "../../api/api";

const FarmerFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // =========================
    // FETCH FEEDBACKS
    // =========================
    const fetchFeedbacks = async () => {
        try {
            const res = await api.get("farmers/feedback/");
            setFeedbacks(res.data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    // =========================
    // SUBMIT / UPDATE FEEDBACK
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
        };

        try {
            if (editingId) {
                await api.put(`farmers/feedback/${editingId}/`,data);
            } else {
                await api.post( "farmers/feedback/", data);
            }

            // Reset form
            setTitle("");
            setDescription("");
            setEditingId(null);
            setShowForm(false);

            fetchFeedbacks();

        } catch (error) {
            console.log(error);
        }
    };

    // =========================
    // EDIT FEEDBACK
    // =========================
    const handleEdit = (feedback) => {
        setTitle(feedback.title);
        setDescription(feedback.description);

        setEditingId(feedback.id);
        setShowForm(true);
    };

    // =========================
    // DELETE FEEDBACK
    // =========================
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this feedback?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`farmers/feedback/${id}/`);
            fetchFeedbacks();

        } catch (error) {
            console.log(error);
        }
    };

    // =========================
    // CANCEL EDIT
    // =========================
    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <p className="p-6 text-gray-500">
                Loading feedback...
            </p>
        );
    }

    return (
        <div className="p-4 md:p-6 space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Feedback
                    </h1>

                    <p className="text-gray-500">
                        View and submit feedback.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                    {showForm ? "Close Form" : "Add Feedback"}
                </button>
            </div>

            {/* FORM */}
            {showForm && (
                <div className="bg-blue-50 rounded-xl p-5">

                    <h2 className="font-semibold mb-4">
                        {editingId
                            ? "Edit Feedback"
                            : "New Feedback"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Feedback title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                            className="w-full border border-green-500 rounded-lg p-3"
                        />

                        <textarea
                            rows="4"
                            placeholder="Write your feedback..."
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                            className="w-full border border-green-500 rounded-lg p-3"
                        />

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                            >
                                {editingId
                                    ? "Update Feedback"
                                    : "Submit Feedback"}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                </div>
            )}

            {/* FEEDBACK LIST */}
            <div className="space-y-3">

                {feedbacks.length === 0 ? (
                    <div className="bg-white rounded-xl p-5 text-center text-gray-500">
                        No feedback submitted.
                    </div>
                ) : (
                    feedbacks.map((feedback) => (
                        <div
                            key={feedback.id}
                            className="bg-green-50 rounded-xl p-4 hover:bg-green-100 hover:shadow-sm transition"
                        >
                            {/* TITLE + STATUS */}
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-gray-800">
                                    {feedback.title}
                                </h3>

                                <span
                                    className={`text-xs px-3 py-1 rounded-full font-medium
                  ${feedback.status === "RESOLVED"
                                            ? "bg-green-100 text-green-700"
                                            : feedback.status === "REJECTED"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {feedback.status}
                                </span>
                            </div>

                            {/* DESCRIPTION */}
                            <p className="text-gray-600 mb-3">
                                {feedback.description}
                            </p>

                            {/* ACTIONS */}
                            <div className="flex gap-2 mb-3">
                                <button
                                    onClick={() =>
                                        handleEdit(feedback)
                                    }
                                    className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm"
                                >
                                    <i className="bi bi-pencil-square me-1"></i>
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(feedback.id)
                                    }
                                    className="px-3 py-1 rounded-lg bg-red-100 text-red-700 text-sm"
                                >
                                    <i className="bi bi-trash me-1"></i>
                                    Delete
                                </button>
                            </div>

                            {/* FOOTER */}
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>
                                    <i className="bi bi-calendar3 me-1"></i>
                                    {new Date(
                                        feedback.created_at
                                    ).toLocaleDateString()}
                                </span>

                                <span>
                                    Feedback #{feedback.id}
                                </span>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
};

export default FarmerFeedback;