import { landingPage } from './landing.page';

/* global fixture:false, test:false */

const credentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
    .page('http://localhost:3400');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});
