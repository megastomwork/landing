import * as migration_20251116_110531 from './20251116_110531';
import * as migration_20251116_124902 from './20251116_124902';
import * as migration_20251125_111952_update_blog_row_button from './20251125_111952_update_blog_row_button';

export const migrations = [
  {
    up: migration_20251116_110531.up,
    down: migration_20251116_110531.down,
    name: '20251116_110531',
  },
  {
    up: migration_20251116_124902.up,
    down: migration_20251116_124902.down,
    name: '20251116_124902',
  },
  {
    up: migration_20251125_111952_update_blog_row_button.up,
    down: migration_20251125_111952_update_blog_row_button.down,
    name: '20251125_111952_update_blog_row_button'
  },
];
