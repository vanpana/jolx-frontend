import { configure } from '@storybook/angular';

function loadStories() {
  require('../src/stories/index.ts');
  require('../src/stories/header.ts');
}

configure(loadStories, module);
