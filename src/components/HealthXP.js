// this component will show the players health and current experience

import React from 'react';

export default function(props) {
  const currentHealth = props.currentHealth;
  const maxHealth = props.maxHealth;
  const currentXP = props.currentXP;
  const nextXP = props.nextXP;
  const level = props.level;

  return (
    <div className="stat-box health-xp-box">
      <div className="health-bar">Health: {currentHealth} / {maxHealth}</div>
      <div className="level-indicator">Level: {level}</div>
      <div className="xp-bar">XP: {currentXP} / {nextXP}</div>
    </div>
  );
}
