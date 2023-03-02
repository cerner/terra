Terra.describeViewports('raw route', ['tiny', 'huge'], () => {
  it('checks accessibility on the raw route', () => {
    browser.url('/extended/raw/secondary-nav-test/cerner-terra-application-docs/themed');
    Terra.validates.element('raw route', { selector: '#root' });
  });

  it('checks that the # route redirects ', () => {
    browser.url('/extended/#/raw/secondary-nav-test/cerner-terra-application-docs/themed');
    Terra.validates.element('hash route', { selector: '#root' });
  });

  it('does not prevent navigation', () => {
    browser.url('/raw/tests/cerner-terra-application-docs/terra-dev-site/navigation-prompt');
    $('[id="PendingStateButton"]').click();
    Terra.validates.element('navigation-prompt', { selector: '#root' });
    browser.url('/raw/tests/cerner-terra-application-docs/terra-dev-site/relative-link');
    Terra.validates.element('redirected', { selector: '#root' });
  });
});
