const assert = require('chai').assert;

const { color2RGB } = require("../src/utils/color")
describe('color test', function() {
  it('test rgb string to rgb object', () => {
    const color = color2RGB('rgb(20, 50, 255)');
    console.log('c', color)
    assert.equal(color.r, 20);
    assert.equal(color.g, 50);
    assert.equal(color.b, 255);
  })
})
  

