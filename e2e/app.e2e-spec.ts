import { Ng2KwFunnelPage } from './app.po';

describe('ng2-kw-funnel App', function() {
  let page: Ng2KwFunnelPage;

  beforeEach(() => {
    page = new Ng2KwFunnelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
