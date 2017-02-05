// this component will show the players equipment and stats

import React from 'react';

export default function(props) {
  const currentWeapon = props.currentWeapon;
  const currentArmor = props.currentArmor;
  const defense = props.defense;
  const hasKey = props.hasKey;
  const strengthValue = props.strength;

  return (
    <div className="stat-box equipment-stats-box">
      <div className="weapon-box">
        Current Weapon:<br/>
        <span className="value-text">{currentWeapon}</span> <br/>
        Attack Value:
          <span className="value-text">&nbsp;{strengthValue}</span>
      </div>
      <div className="armor-box">
        Current Armor: <br/>
        <span className="value-text">{currentArmor} </span><br/>
        Defense Value:
        <span className="value-text">&nbsp;{defense}</span>
      </div>
      <div className="key-box-container">
        Boss Room Key
        <div

          className={hasKey ? "key-box has-key-true" : "key-box"}
        >


        </div>
      </div>
    </div>
  );
}
