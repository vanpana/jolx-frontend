import { configure } from '@storybook/angular';

function loadStories() {
  require('../src/stories/card.ts');
  require('../src/stories/card-list.ts');
}

configure(loadStories, module);
