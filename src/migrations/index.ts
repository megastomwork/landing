import * as migration_20251116_110531 from './20251116_110531';
import * as migration_20251116_124902 from './20251116_124902';
import * as migration_20251125_111952_update_blog_row_button from './20251125_111952_update_blog_row_button';
import * as migration_20251225_140603_remove_usefull_address_field from './20251225_140603_remove_usefull_address_field';
import * as migration_20260104_102741_update_address_fields from './20260104_102741_update_address_fields';

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
    name: '20251125_111952_update_blog_row_button',
  },
  {
    up: migration_20251225_140603_remove_usefull_address_field.up,
    down: migration_20251225_140603_remove_usefull_address_field.down,
    name: '20251225_140603_remove_usefull_address_field',
  },
  {
    up: migration_20260104_102741_update_address_fields.up,
    down: migration_20260104_102741_update_address_fields.down,
    name: '20260104_102741_update_address_fields'
  },
];
