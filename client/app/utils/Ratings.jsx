import React from 'react'
import Rating from '@mui/material/Rating'

const Ratings = ({ rating,isReading,setRating, starSize }) => {
  return (
    <Rating
      name={`${isReading ? "half-rating-read" : "half-rating"}`}
      value={rating}
      precision={0.5}
      size="10px"
      readOnly={isReading}
      onChange={(event, newValue) => {
        if (!isReading && setRating) {
          setRating(newValue); 
        }
      }}
      sx={{
        fontSize: starSize || "30px",
        '& .MuiRating-iconEmpty': {
          color: 'white', 
        },
        '& .MuiRating-iconFilled': {
          color: 'gold', 
        },
         ...(isReading && {
          pointerEvents: "none", // 🚀 disables hover effect
        })
      }}
    />
  )
}

export default Ratings
