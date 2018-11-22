import { storiesOf } from '@storybook/angular';
import { CardComponent } from '../app/card/card.component';

storiesOf('Card', module)
  .add('normal', () => ({
    component: CardComponent,
    props: {}
  }));
