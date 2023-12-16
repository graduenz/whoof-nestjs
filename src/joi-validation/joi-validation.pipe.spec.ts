import { JoiValidationPipe } from './joi-validation.pipe';

describe('JoiValidationPipe', () => {
  it('should be defined', () => {
    expect(new JoiValidationPipe(undefined)).toBeDefined();
  });
});
