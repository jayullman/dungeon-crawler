// this component will show the players equipment and stats

import React from 'react';

export default function(props) {
  const weapons = props.weapons;
  const armor = props.armor;
  const defense = props.defense;
  const hasKey = props.hasKey;
  const strengthValue = props.strength;

  // create list of weapons and armor to display
  const weaponsList = weapons.map((weapon) => {
    return <span key={weapon} className="equipment-text value-text">{weapon}</span>
  });

  const armorList = armor.map((armor) => {
    return <span key={armor} className="equipment-text value-text">{armor}</span>
  });

  return (
    <div className="stat-box equipment-stats-box">
      <div className="weapon-box">
        Weapons:
        <div className="equipment-list-container">
          {weaponsList}
        </div>
        Attack Value:
          <span className="value-text">&nbsp;{strengthValue}</span>
      </div>
      <div className="armor-box">
        Armor:
        <div className="equipment-list-container">
          {armorList}
        </div>
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
