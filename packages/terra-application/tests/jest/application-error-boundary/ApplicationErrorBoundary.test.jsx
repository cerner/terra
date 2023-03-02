import React from 'react';
import { shallowWithIntl, mountWithIntl } from '@cerner/terra-enzyme-intl';
import ApplicationErrorBoundary from '../../../src/application-error-boundary/ApplicationErrorBoundary';
import Logger from '../../../src/utils/logger';

describe('ApplicationErrorBoundary', () => {
  describe('Snapshots', () => {
    it('should render with minimal props', () => {
      const wrapper = shallowWithIntl((
        <ApplicationErrorBoundary />
      )).dive();

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with children', () => {
      const wrapper = shallowWithIntl((
        <ApplicationErrorBoundary>
          <div>Test child</div>
        </ApplicationErrorBoundary>
      )).dive();

      expect(wrapper).toMatchSnapshot();
    });

    it('should render error view when an error is detected', () => {
      const spy = jest.spyOn(Logger, 'error').mockImplementation(() => {});
      const ErrorComponent = () => <div />;

      const wrapper = mountWithIntl((
        <ApplicationErrorBoundary>
          <ErrorComponent />
        </ApplicationErrorBoundary>
      ));
      expect(wrapper).toMatchSnapshot();

      /**
       * After simulating the error, the error view should be rendered.
       */
      wrapper.find(ErrorComponent).simulateError(new Error('test error'));
      expect(wrapper).toMatchSnapshot();

      /**
       * After rendering the component again, the error view should no longer be rendered.
       */
      wrapper.setProps({});
      expect(wrapper).toMatchSnapshot();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
});
