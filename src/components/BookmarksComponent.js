import React from 'react';

const BookmarksComponent = ({ selectedCity, bookmarkedCityes, toggleBookmark }) => {
   const isBookmarked = bookmarkedCityes.includes(selectedCity);
    
   return (
    <>
      <div style={{ padding: "0 8px" }}>
         <img
            src={`/bookmark-icons/${isBookmarked ? "full" : "emp"}-star.png`}
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
            onClick={() => toggleBookmark(selectedCity)}
            alt="bookmark icon"
         />
      </div>
    </>
   );
};

export default BookmarksComponent;
