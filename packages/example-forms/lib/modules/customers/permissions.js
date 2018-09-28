/*

Declare permissions for the customers collection.

*/

import Users from 'meteor/vulcan:users';

Users.groups.guests.can([
  'customer.create',
  'customer.edit.all',
  'customer.remove.all',
])
