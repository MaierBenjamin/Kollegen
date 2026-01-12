CREATE TABLE Users(
  userId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(254) UNIQUE,
  `password` VARCHAR(256)
);

CREATE TABLE Organizations(
  organizationId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  `description` TEXT,
  joinUUID CHAR(36)
);

CREATE TABLE OrganizationUsers(
  organizationUserId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  userRole enum('user','admin','owner'),
  fk_UserId INT UNSIGNED,
  fk_OrganizationId INT UNSIGNED,
  UNIQUE (fk_UserId, fk_OrganizationId),
  FOREIGN KEY (fk_UserId) REFERENCES Users(userId) ON DELETE CASCADE,
  FOREIGN KEY (fk_OrganizationId) REFERENCES Organizations(organizationId) ON DELETE CASCADE
);

CREATE TABLE Groups(
  groupId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  fk_OrganizationId INT UNSIGNED,
  UNIQUE (fk_OrganizationId, `name`),
  FOREIGN KEY (fk_OrganizationId) REFERENCES Organizations(organizationId) ON DELETE CASCADE
);

CREATE TABLE GroupUsers(
  groupUserId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_UserId INT UNSIGNED,
  fk_GroupId INT UNSIGNED,
  UNIQUE (fk_UserId, fk_GroupId),
  FOREIGN KEY (fk_UserId) REFERENCES Users(userId) ON DELETE CASCADE,
  FOREIGN KEY (fk_GroupId) REFERENCES Groups(groupId) ON DELETE CASCADE
);

CREATE TABLE GroupChannels(
  groupChannelId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  fk_GroupId INT UNSIGNED,
  UNIQUE (fk_GroupId, `name`),
  FOREIGN KEY (fk_GroupId) REFERENCES Groups(groupId) ON DELETE CASCADE
);

CREATE TABLE ChannelMessages(
  channelMessageId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  fk_UserId INT UNSIGNED NULL,
  fk_GroupChannelId INT UNSIGNED,
  FOREIGN KEY (fk_UserId) REFERENCES Users(userId) ON DELETE SET NULL,
  FOREIGN KEY (fk_GroupChannelId) REFERENCES GroupChannels(groupChannelId) ON DELETE CASCADE
);

CREATE TABLE DirectMessages(
  directMessageId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  fk_OrganizationId INT UNSIGNED,
  fk_SendingUserId INT UNSIGNED NULL,
  fk_ReceivingUserId INT UNSIGNED NULL,
  FOREIGN KEY (fk_OrganizationId) REFERENCES Organizations(organizationId) ON DELETE CASCADE,
  FOREIGN KEY (fk_SendingUserId) REFERENCES Users(userId) ON DELETE SET NULL,
  FOREIGN KEY (fk_ReceivingUserId) REFERENCES Users(userId) ON DELETE SET NULL
);