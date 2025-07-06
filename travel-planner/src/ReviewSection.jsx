import React, { useState, useEffect } from 'react';
import { db } from './service/firebaseConfig';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

const ReviewSection = () => {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from Firestore
  const fetchReviews = async () => {
    const snapshot = await getDocs(collection(db, 'reviews'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit review to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !comment) return;

    await addDoc(collection(db, 'reviews'), {
      username,
      comment,
      createdAt: serverTimestamp(),
    });

    setUsername('');
    setComment('');
    fetchReviews();
  };

  return (
    <div style={{ padding: '20px' }}>
      
      <h2 className="font-bold text-[40px] text-[#653030] text-center mb-6 mt-30">What others said..</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.slice(0, 6).map((rev) => (
        <div
        key={rev.id}
        className=" h-40 border border-gray-300 rounded-xl p-4 shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg bg-white">
        <strong className="font-bold text-[40px] text-[#9a3b3b]">{rev.username}</strong>
        <p className="text-gray text-[23px] text-[#161316]">{rev.comment}</p>
        </div>
        ))};
      </div>

      <h2 className="font-bold text-[40px] text-[#653030] text-center mb-6 mt-15">Add Your Review</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-3xl mx-auto flex flex-col gap-6 border border-gray-300 box-shadow-lg-gray-200"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#f56551]"
        />
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="border border-gray-300 rounded-lg p-3 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#f56551]"
        ></textarea>
        <button
          type="submit"
          className="bg-[#f56551] text-white text-xl font-semibold py-3 rounded-lg hover:bg-[#e25442] transition duration-300"
        >
          Submit
        </button>
      </form>

    </div>
  );
};

export default ReviewSection;
