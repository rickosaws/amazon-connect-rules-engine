// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var rewire = require('rewire');
const expect = require('chai').expect;
var inferenceUtils = require('../lambda/utils/InferenceUtils');

/**
 * InferenceUtils tests
 */
describe('InferenceUtilsTests', function()
{
  this.beforeAll(function()
  {
  });

  this.afterAll(function()
  {
  });

  // Tests update state with a bunch of scenarios
  it('InferenceUtils.updateState()', async function()
  {
    var state = {};
    var stateToSave = new Set();

    // Simple use case
    inferenceUtils.updateState(state, stateToSave, 'simple', 'value');
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple).to.equal('value');

    // New nested key
    state = {};
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested1', 'nested1');
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.nested1).to.equal('nested1');

    // New nested under existing top level
    inferenceUtils.updateState(state, stateToSave, 'simple.nested2', 'nested2');
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.nested2).to.equal('nested2');

    // Update existing nested key
    inferenceUtils.updateState(state, stateToSave, 'simple.nested2', 'nested2a');
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.nested2).to.equal('nested2a');

    // Attempt to add a sub key to an existing string
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested1.deeper', 'deeper');
    expect(stateToSave.has('simple')).to.equal(false);
    expect(state.simple.nested1.deeper).to.equal(undefined);

    // Set an array
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested3', ['foo']);
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.nested3[0]).to.equal('foo');
    expect(state.simple.nested3.length).to.equal(1);

    // Update a sub key of an array
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested3.blerg', 'smeh');
    expect(stateToSave.has('simple')).to.equal(false);
    expect(state.simple.nested3.berg).to.equal(undefined);

    // Update an index of an exising array
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested3.0', 'bletch');
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.nested3[0]).to.equal('bletch');

    // Insert an array element
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested3.1', { fneh: -5 });
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.nested3[1].fneh).to.equal(-5);

    // Insert an array element with gaps
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested3.5', { smep: 'hey' });
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.nested3[2]).to.equal(undefined);
    expect(state.simple.nested3[3]).to.equal(undefined);
    expect(state.simple.nested3[4]).to.equal(undefined);
    expect(state.simple.nested3[5].smep).to.equal('hey');

    // Attempt to manipulate length
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested3.length', 10);
    expect(stateToSave.has('simple')).to.equal(false);
    expect(state.simple.nested3.length).to.equal(6);

    // Negative index
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.nested3.-1', 'stuff');
    expect(stateToSave.has('simple')).to.equal(false);

    // Create a new array
    state = {};
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.myarray.1', 'stuff');
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.myarray[0]).to.equal(undefined);
    expect(state.simple.myarray[1]).to.equal('stuff');

    // Update the array
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.myarray.0', 'first');
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.myarray[0]).to.equal('first');
    expect(state.simple.myarray[1]).to.equal('stuff');

    // Create a new key with a new nested array
    state = {};
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.myarray.0.fneh.1.blerg.foo', 'whoah');
    expect(stateToSave.has('simple')).to.equal(true);
    expect(state.simple.myarray[0].fneh[0]).to.equal(undefined);
    expect(state.simple.myarray[0].fneh[1].blerg.foo).to.equal('whoah');

    // Update a complex sub key with undefined expecting no changes
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, 'simple.myarray.0.test.0.junk', '');
    expect(stateToSave.has('simple')).to.equal(false);
    expect(state.simple.myarray[0].test).to.equal(undefined);

    // Setting invalid empty keys
    state = {};
    stateToSave.clear();
    inferenceUtils.updateState(state, stateToSave, '', 'foo');
    expect(stateToSave.size).to.equal(0);
    expect(JSON.stringify(state)).to.equal('{}');

    inferenceUtils.updateState(state, stateToSave, null, 'foo');
    expect(stateToSave.size).to.equal(0);
    expect(JSON.stringify(state)).to.equal('{}');

    inferenceUtils.updateState(state, stateToSave, undefined, 'foo');
    expect(stateToSave.size).to.equal(0);
    expect(JSON.stringify(state)).to.equal('{}');

    inferenceUtils.updateState(state, stateToSave, 'null', 'foo');
    expect(stateToSave.size).to.equal(0);
    expect(JSON.stringify(state)).to.equal('{}');

    inferenceUtils.updateState(state, stateToSave, 'undefined', 'foo');
    expect(stateToSave.size).to.equal(0);
    expect(JSON.stringify(state)).to.equal('{}');
  });

});
