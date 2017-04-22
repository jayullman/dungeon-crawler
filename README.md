# freeCodeCamp Dungeon Crawler

## Project completed for freeCodeCamp's React and Data Viz certification.

Live site: https://libeja.github.io/dungeon-crawler/

### User Story Requirements:
1. I have health, a level, and a weapon. I can pick up a better weapon. I can pick up health items.
2. All the items and enemies on the map are arranged at random.
3. I can move throughout a map, discovering items.
4. I can move anywhere within the map's boundaries, but I can't move through an enemy until I've beaten it.
5. Much of the map is hidden. When I take a step, all spaces that are within a certain number of spaces from me are revealed.
6. When I beat an enemy, the enemy goes away and I get XP, which eventually increases my level.
7. When I fight an enemy, we take turns damaging each other until one of us loses. I do damage based off of my level and my weapon. The enemy does damage based off of its level. Damage is somewhat random within a range.
8. When I find and beat the boss, I win.
9. The game should be challenging, but theoretically winnable.

## Dungeon Map Creation

When the game first loads, the dungeon is created using a recursive algorithm that produces a random dungeon on a 2d array. First the boss room is placed on the map, into which there is only one door. Every room after that, a random number between 1-3 is selected which will be how many rooms branch off of that particular room. Then directions are chosen at random. If a room can be placed in the next space, the process repeats for the next room. Once a room cannot be placed, the function recurses back to the previous room and another direction is selected. Once no more rooms can be placed, the map is complete. A check is also done, counting how many tiles are on the map to ensure that the map is large enough. If not, a new map is generated.

Once the map is generated, all of the room spaces are collected and pushed onto an array which are then chosen at random for item and monster placement. The boss room was created using seperate tile types so that only the boss tile can be placed there.

The hero is represented by a sprite image, which changes orientation based on the direction of the player's last move.

## App Architecture
I used React.js for the view layer and to keep track of application state.

### The State Object
Tracked hero stats, monsters array, boss stats, and certain view options used to conditionally render dialogue boxes (instructions and game over screens).


### Takeaways:
Gaining a deeper understanding of recursion

I utilized a recursive method in order to build out the random dungeon rooms. Each room branches off of the last, when a room cannot be build, it recurses back to the last room to build off in another direction
