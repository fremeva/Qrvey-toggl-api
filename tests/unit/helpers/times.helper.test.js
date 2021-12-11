const {
  transformMillisecondsToFormatDate
} = require('../../../src/helpers/time.helper');

describe('Time Helper Unit Testing', () => {
  describe('Transform Millisecond helper function', () => {
    it('Should return 00:00:00 to 0 milliseconds', async () => {
      const result = await transformMillisecondsToFormatDate(0);
      expect(result).not.toBeNull();
      expect(result).toBe('00:00:00');
    });

    it('Should return "Invalid date" to empty string', async () => {
      const result = await transformMillisecondsToFormatDate('');
      expect(result).toBe('Invalid date');
    });

    it('Should return "Invalid date" to null', async () => {
      const result = await transformMillisecondsToFormatDate(null);
      expect(result).toBe('Invalid date');
    });
  });
});
