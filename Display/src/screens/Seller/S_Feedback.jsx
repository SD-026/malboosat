import React, { useEffect, useState } from 'react';
import axios from 'axios';

const S_Feedback = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await axios.get('http://localhost:8888/feedback');
                setFeedback(res.data.data);
            } catch (err) {
                console.error('Error fetching feedback:', err);
            }
        };

        fetchFeedback();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">User Feedback</h2>
                {feedback.length === 0 ? (
                    <p className="text-center text-gray-500">No feedback available.</p>
                ) : (
                    feedback.map((item, index) => (
                        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.username}</h3>
                            <div className="space-y-2">
                                {item.FeedbackList.map((feed, idx) => (
                                    <div key={idx} className="p-3 bg-white rounded-lg shadow-inner">
                                        <p className="text-gray-700">{feed.message}</p>
                                        <span className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${feed.type === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {feed.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default S_Feedback;
