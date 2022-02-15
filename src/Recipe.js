import React from 'react'

export default function Recipe(props) {
  return (
    <div>
        <h3>{props.title}</h3>
        <img src={props.image} />
        <p>Cooking time: {props.minutes} minutes</p>
        <a href={props.instructions}>Link to recipe: {props.title} by {props.source}</a>
        


        <a href="#" onClick={props.close}>Back to recipes</a>
    </div>
  )
}
