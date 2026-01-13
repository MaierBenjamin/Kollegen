CREATE TABLE users(
  userId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(254) UNIQUE,
  `password` VARCHAR(256)
);

CREATE TABLE organizations(
  organizationId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) UNIQUE,
  `description` TEXT
);

CREATE TABLE organization_users(
  organizationUserId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  userRole enum('user','admin','owner'),
  fk_UserId INT UNSIGNED,
  fk_OrganizationId INT UNSIGNED,
  UNIQUE (fk_UserId, fk_OrganizationId),
  FOREIGN KEY (fk_UserId) REFERENCES users(userId) ON DELETE CASCADE,
  FOREIGN KEY (fk_OrganizationId) REFERENCES organizations(organizationId) ON DELETE CASCADE
);

CREATE TABLE groups(
  groupId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  fk_OrganizationId INT UNSIGNED,
  UNIQUE (fk_OrganizationId, `name`),
  FOREIGN KEY (fk_OrganizationId) REFERENCES organizations(organizationId) ON DELETE CASCADE
);

CREATE TABLE group_users(
  groupUserId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_UserId INT UNSIGNED,
  fk_GroupId INT UNSIGNED,
  UNIQUE (fk_UserId, fk_GroupId),
  FOREIGN KEY (fk_UserId) REFERENCES users(userId) ON DELETE CASCADE,
  FOREIGN KEY (fk_GroupId) REFERENCES groups(groupId) ON DELETE CASCADE
);

CREATE TABLE group_channels(
  groupChannelId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  fk_GroupId INT UNSIGNED,
  UNIQUE (fk_GroupId, `name`),
  FOREIGN KEY (fk_GroupId) REFERENCES groups(groupId) ON DELETE CASCADE
);

CREATE TABLE channel_messages(
  channelMessageId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  fk_UserId INT UNSIGNED NULL,
  fk_GroupChannelId INT UNSIGNED,
  FOREIGN KEY (fk_UserId) REFERENCES users(userId) ON DELETE SET NULL,
  FOREIGN KEY (fk_GroupChannelId) REFERENCES group_channels(groupChannelId) ON DELETE CASCADE
);

CREATE TABLE direct_messages(
  directMessageId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  fk_SendingUserId INT UNSIGNED NULL,
  fk_ReceivingUserId INT UNSIGNED NULL,
  FOREIGN KEY (fk_SendingUserId) REFERENCES users(userId) ON DELETE SET NULL,
  FOREIGN KEY (fk_ReceivingUserId) REFERENCES users(userId) ON DELETE SET NULL
);