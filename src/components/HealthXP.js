// this component will show the players health and current experience

import React from 'react';

export default function(props) {
  const currentHealth = props.currentHealth;
  const maxHealth = props.maxHealth;
  const currentXP = props.currentXP;
  const nextXP = props.nextXP;

  return (
    <div className="health-xp-box">
      <div className="health-bar">
        current health: {currentHealth}
        max health: {maxHealth}
      </div>
      <div className="xp-bar">
        XP: {currentXP}
        next level: {nextXP}
      </div>
    </div>
  );
}
