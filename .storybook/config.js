import { configure } from '@storybook/angular';

function loadStories() {
  require('../src/stories/index.ts');
  require('../src/stories/card.component.ts');
}

configure(loadStories, module);
