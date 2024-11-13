
export const applicationPermissions = {
  authentication: {},
  authorization: {
    //just added
    menuPermission: 'menu-authorization',
    readPermission: 'read-authorization',
    role: {
      //just added
      menuPermission: 'menu-role',
      readPermission: 'read-role',
      updatePermission: 'update-role',
      deletePermission: 'delete-role',
      createPermission: 'create-role',
      rolePermission: {
        //just added
        menuPermission: 'menu-role-permission',
        readPermission: 'read-role-permission',
        updatePermission: 'update-role-permission',
        deletePermission: 'delete-role-permission',
        createPermission: 'create-role-permission',
      },
    },
    projectModule: {
      //just added
      menuPermission: 'menu-project-module',
      readPermission: 'read-project-module',
      updatePermission: 'update-project-module',
      deletePermission: 'delete-project-module',
      createPermission: 'create-project-module',
    },
    permission: {
      //just added
      menuPermission: 'menu-permission',
      readPermission: 'read-permission',
      updatePermission: 'update-permission',
      deletePermission: 'delete-permission',
      createPermission: 'create-permission',
    },
  }
};
