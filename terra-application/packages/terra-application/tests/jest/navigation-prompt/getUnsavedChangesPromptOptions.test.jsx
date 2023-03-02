import { mockIntl } from '@cerner/terra-enzyme-intl';

import getUnsavedChangesPromptOptions from '../../../src/navigation-prompt/getUnsavedChangesPromptOptions';

describe('getUnsavedChangesPromptOptions', () => {
  it('generates a function that provides appropriate messaging for a single prompt', () => {
    const generatedFunction = getUnsavedChangesPromptOptions(mockIntl);

    expect(generatedFunction).toBeDefined();

    const functionOutput = generatedFunction([{ description: 'Test Prompt' }]);

    expect(functionOutput).toMatchSnapshot();
  });

  it('generates a function that provides appropriate messaging for multiple prompts', () => {
    const generatedFunction = getUnsavedChangesPromptOptions(mockIntl);

    expect(generatedFunction).toBeDefined();

    const functionOutput = generatedFunction([{ description: 'Test Prompt' }, { description: 'Another Test Prompt' }]);

    expect(functionOutput).toMatchSnapshot();
  });
});
