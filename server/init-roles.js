import { roles } from '../imports/security'
import forEach from 'lodash/forEach'
import { Roles } from 'meteor/alanning:roles'

// Convention :
// UPPERCASE = role
// CAMELCASE = permission and namespacing

// Create roles in DB
forEach(roles, (role) => Roles.createRole(role, {unlessExists: true}))

Roles.addRolesToParent(roles.project$MANAGER, roles.ADMIN)
Roles.addRolesToParent(roles.project$MEMBER, roles.project$MANAGER)

// Define MANAGER
Roles.addRolesToParent([
  roles.project$acceptMember,
  roles.project$editUserRole,
  roles.project$publishExp,
  roles.project$editTaskType,
  roles.project$editAnnotationType,
  roles.project$createExp,
  roles.project$deleteExp,
  roles.project$updateExp,
  roles.project$update,
  roles.project$syncVideo,
  roles.project$editTaskSegment,
  roles.project$addAndRemoveTaskSegment
], roles.project$MANAGER)

// Define MEMBER
Roles.addRolesToParent([
  roles.project$editAnnotation,
  roles.project$addAndRemoveAnnotation
] , roles.project$MEMBER)
