import { WebsitePage } from './app.po';

describe('Personal Website', function() {
  let page: WebsitePage;

  beforeEach(() => {
    page = new WebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
