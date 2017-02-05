import { AcquaPlayWebPage } from './app.po';

describe('acqua-play-web App', function() {
  let page: AcquaPlayWebPage;

  beforeEach(() => {
    page = new AcquaPlayWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
