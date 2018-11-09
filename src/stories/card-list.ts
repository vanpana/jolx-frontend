import { storiesOf } from '@storybook/angular';
import { CardListComponent } from '../app/card-list/card-list.component';

storiesOf('CardList', module)
  .add('normal', () => ({
    component: CardListComponent,
    props: {}
  }));
