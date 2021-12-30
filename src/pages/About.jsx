import React from "react";
import classes from './AboutHome.module.css'
import img from '../assets/image/mem.jpg'

export const About = () => (
   <div className={classes.aboutWrapper}>
      <div className={classes.aboutInfo}>
         <h1>Best ToDo App</h1>
         <p>Hello, you are using the best ToDo App. <br />I wish you pleasant use!</p>
         <span>Version <strong>1.01.01</strong></span>
      </div>
      <img src={img} alt="cat" />
   </div>
)

