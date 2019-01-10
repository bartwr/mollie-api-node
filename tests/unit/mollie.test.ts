import mollie from '../../src/mollie';

describe('mollie', () => {
  it('should fail when no api key is provided', () => {
    // @ts-ignore
    const noApiKey = () => mollie();

    expect(noApiKey).toThrowError(TypeError);
  });
});
