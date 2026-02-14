import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListingById } from "../api/listing.jsx";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(id);
        setListing(data.currListing);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading listing...</p>;
  }

  if (!listing) {
    return <p className="p-6 text-red-500">Listing not found</p>;
  }

  const {
    title,
    address,
    images,
    rent,
    type,
    maxGuests,
    perks = [],
    reviews = [],
    owner,
  } = listing;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Images - Masonry style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(images?.length ? images : [FALLBACK_IMAGE]).map((img, idx) => (
          <div
            key={idx}
            className={`overflow-hidden rounded-2xl ${idx === 0 && images?.length > 1 ? 'md:row-span-2 h-[32rem]' : 'h-80'
              }`}
          >
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Header with subtle border */}
      <div className="border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-light tracking-tight mb-2">{title}</h1>
        <div className="flex items-center gap-2 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">{address}</p>
        </div>
      </div>

      {/* Host & Quick Info - Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Host */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-lg font-light text-gray-600">
              {owner?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">Hosted by {owner?.name || "Unknown"}</p>
            <p className="text-sm text-gray-400">{owner?.email}</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-6 md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-light">₹{rent}</span>
            <span className="text-sm text-gray-400">/ night</span>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm capitalize">{type}</span>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-sm">{maxGuests} guests</span>
          </div>
        </div>
      </div>

      {/* Perks - With icons */}
      {perks.length > 0 && (
        <div className="pt-2">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {perks.map((perk, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reviews - With better card design */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-400">Reviews</h2>
          {reviews.length > 0 && (
            <span className="text-sm text-gray-500">{reviews.length} reviews</span>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="group bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-800">
                      {review.user?.name || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-gray-700' : 'text-gray-300'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
