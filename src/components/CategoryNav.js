import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'

const CategoryNav = ({ categories, selectedCategory }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <Link
          key={index}
          className={
            category === selectedCategory ? 'category selected' : 'category'
          }
          to={category}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}

export default CategoryNav
