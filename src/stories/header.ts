import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import {HeaderComponent} from '../app/components/header/header.component';


storiesOf('Header', module)
  .add('default', () => ({
    component: HeaderComponent,
    props: {}
  }));

