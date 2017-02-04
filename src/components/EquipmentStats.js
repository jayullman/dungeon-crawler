// this component will show the players equipment and stats

import React from 'react';

export default function(props) {
  const currentWeapon = props.currentWeapon;
  const currentArmor = props.currentArmor;
  const defense = props.defense;
  const hasKey = props.hasKey;
  const strengthValue = props.strength;

  return (
    <div className="equipment-box">
      <div className="weapon-box">
        Current Weapon: {currentWeapon}
        Attack Value: {strengthValue}
      </div>
      <div className="armor-box">
        Current Armor: {currentArmor}
        Defense Value: {defense}
      </div>
      <div className="key-box">
        Has Key: {hasKey ? 'Yes' : 'No'}
      </div>

    </div>
  );
}
