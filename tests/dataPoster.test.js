const performAction = require('../src/client/js/dataPoster');

jest.mock('../src/server/mockAPI');

import * as allData from '../src/server/mockAPI';

// The assertion for a promise must be returned.
it('works with fetch', () => {
  expect(allData.city).toContain("Amsterdam");
  expect(allData.weather.temp).toContain("21");
});