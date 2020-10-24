const assert = require('chai').assert;

const { color2RGB } = require("../src/utils/color")
describe('color test', function() {
  it('test rgb string to rgb object', () => {
    const color = color2RGB('rgb(20, 50, 255)');
    console.log('rgb', color)
    assert.equal(color.r, 20);
    assert.equal(color.g, 50);
    assert.equal(color.b, 255);
  })

  it('test rgba string to rgb object', () => {
    const color = color2RGB('rgba(20, 50, 255, 30)');
    console.log('rgba', color)
    assert.equal(color.r, 20);
    assert.equal(color.g, 50);
    assert.equal(color.b, 255);
    assert.equal(color.a, 30);
  })

  
  it('test hex 6 string to rgb object', () => {
    const color = color2RGB('#904b4b');
    console.log('rgba', color)
    assert.equal(color.r, 144);
    assert.equal(color.g, 75);
    assert.equal(color.b, 75);
    // assert.equal(color.a, 30);
  })
})
  

