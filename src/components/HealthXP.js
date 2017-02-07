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
      <div className="health-bar"><span className="bold">Health:</span> {currentHealth} / {maxHealth}</div>
      <div className="level-indicator"><span className="bold">Level:</span> {level}</div>
      <div className="xp-bar"><span className="bold">XP:</span> {currentXP} / {nextXP}</div>
    </div>
  );
}
