'use strict'

const d4 = () => {
  d4.roll = () => {
    console.log(Math.floor(Math.random() * 4) + 1);
    return d4;
  }

  return d4
}
