import React from 'react';

export default function Pizza({ ingredients }) {
  return (
    <>
      <h3>Pizza</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </>
  );
}