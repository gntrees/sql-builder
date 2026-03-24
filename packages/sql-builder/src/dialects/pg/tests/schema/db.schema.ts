import { ColumnSchema, DBSchema, TableSchema } from "../../../../../pg";

class GntreesUi extends DBSchema {
  public account: Account;
  public drizzleDrizzleMigrations: DrizzleDrizzleMigrations;
  public projects: Projects;
  public projectsDetail: ProjectsDetail;
  public session: Session;
  public todo: Todo;
  public user: User;
  public verification: Verification;
  constructor(dbSchemaName: string) {
    super(dbSchemaName);
    this.account = new Account(this);
    this.drizzleDrizzleMigrations = new DrizzleDrizzleMigrations(this);
    this.projects = new Projects(this);
    this.projectsDetail = new ProjectsDetail(this);
    this.session = new Session(this);
    this.todo = new Todo(this);
    this.user = new User(this);
    this.verification = new Verification(this);
  }
}

class Account extends TableSchema {
  public accessToken: ColumnSchema;
  public accessTokenExpiresAt: ColumnSchema;
  public accountId: ColumnSchema;
  public createdAt: ColumnSchema;
  public id: ColumnSchema;
  public idToken: ColumnSchema;
  public password: ColumnSchema;
  public providerId: ColumnSchema;
  public refreshToken: ColumnSchema;
  public refreshTokenExpiresAt: ColumnSchema;
  public scope: ColumnSchema;
  public updatedAt: ColumnSchema;
  public userId: ColumnSchema;
  constructor(dbSchema: DBSchema) {
    super(dbSchema, "account");
    this.accessToken = new ColumnSchema(this.dbSchema, this, "access_token");
    this.accessTokenExpiresAt = new ColumnSchema(this.dbSchema, this, "access_token_expires_at");
    this.accountId = new ColumnSchema(this.dbSchema, this, "account_id");
    this.createdAt = new ColumnSchema(this.dbSchema, this, "created_at");
    this.id = new ColumnSchema(this.dbSchema, this, "id");
    this.idToken = new ColumnSchema(this.dbSchema, this, "id_token");
    this.password = new ColumnSchema(this.dbSchema, this, "password");
    this.providerId = new ColumnSchema(this.dbSchema, this, "provider_id");
    this.refreshToken = new ColumnSchema(this.dbSchema, this, "refresh_token");
    this.refreshTokenExpiresAt = new ColumnSchema(this.dbSchema, this, "refresh_token_expires_at");
    this.scope = new ColumnSchema(this.dbSchema, this, "scope");
    this.updatedAt = new ColumnSchema(this.dbSchema, this, "updated_at");
    this.userId = new ColumnSchema(this.dbSchema, this, "user_id");
  }
}

class DrizzleDrizzleMigrations extends TableSchema {
  public createdAt: ColumnSchema;
  public hash: ColumnSchema;
  public id: ColumnSchema;
  constructor(dbSchema: DBSchema) {
    super(dbSchema, "drizzle.__drizzle_migrations");
    this.createdAt = new ColumnSchema(this.dbSchema, this, "created_at");
    this.hash = new ColumnSchema(this.dbSchema, this, "hash");
    this.id = new ColumnSchema(this.dbSchema, this, "id");
  }
}

class Projects extends TableSchema {
  public createdAt: ColumnSchema;
  public deletedAt: ColumnSchema;
  public description: ColumnSchema;
  public id: ColumnSchema;
  public name: ColumnSchema;
  public previewImage: ColumnSchema;
  public privacyStatus: ColumnSchema;
  public storageRepository: ColumnSchema;
  public updatedAt: ColumnSchema;
  public userId: ColumnSchema;
  constructor(dbSchema: DBSchema) {
    super(dbSchema, "projects");
    this.createdAt = new ColumnSchema(this.dbSchema, this, "created_at");
    this.deletedAt = new ColumnSchema(this.dbSchema, this, "deleted_at");
    this.description = new ColumnSchema(this.dbSchema, this, "description");
    this.id = new ColumnSchema(this.dbSchema, this, "id");
    this.name = new ColumnSchema(this.dbSchema, this, "name");
    this.previewImage = new ColumnSchema(this.dbSchema, this, "preview_image");
    this.privacyStatus = new ColumnSchema(this.dbSchema, this, "privacy_status");
    this.storageRepository = new ColumnSchema(this.dbSchema, this, "storage_repository");
    this.updatedAt = new ColumnSchema(this.dbSchema, this, "updated_at");
    this.userId = new ColumnSchema(this.dbSchema, this, "user_id");
  }
}

class ProjectsDetail extends TableSchema {
  public data: ColumnSchema;
  public projectId: ColumnSchema;
  constructor(dbSchema: DBSchema) {
    super(dbSchema, "projects_detail");
    this.data = new ColumnSchema(this.dbSchema, this, "data");
    this.projectId = new ColumnSchema(this.dbSchema, this, "project_id");
  }
}

class Session extends TableSchema {
  public createdAt: ColumnSchema;
  public expiresAt: ColumnSchema;
  public id: ColumnSchema;
  public ipAddress: ColumnSchema;
  public token: ColumnSchema;
  public updatedAt: ColumnSchema;
  public userAgent: ColumnSchema;
  public userId: ColumnSchema;
  constructor(dbSchema: DBSchema) {
    super(dbSchema, "session");
    this.createdAt = new ColumnSchema(this.dbSchema, this, "created_at");
    this.expiresAt = new ColumnSchema(this.dbSchema, this, "expires_at");
    this.id = new ColumnSchema(this.dbSchema, this, "id");
    this.ipAddress = new ColumnSchema(this.dbSchema, this, "ip_address");
    this.token = new ColumnSchema(this.dbSchema, this, "token");
    this.updatedAt = new ColumnSchema(this.dbSchema, this, "updated_at");
    this.userAgent = new ColumnSchema(this.dbSchema, this, "user_agent");
    this.userId = new ColumnSchema(this.dbSchema, this, "user_id");
  }
}

class Todo extends TableSchema {
  public completed: ColumnSchema;
  public id: ColumnSchema;
  public text: ColumnSchema;
  constructor(dbSchema: DBSchema) {
    super(dbSchema, "todo");
    this.completed = new ColumnSchema(this.dbSchema, this, "completed");
    this.id = new ColumnSchema(this.dbSchema, this, "id");
    this.text = new ColumnSchema(this.dbSchema, this, "text");
  }
}

class User extends TableSchema {
  public createdAt: ColumnSchema;
  public email: ColumnSchema;
  public emailVerified: ColumnSchema;
  public id: ColumnSchema;
  public image: ColumnSchema;
  public name: ColumnSchema;
  public updatedAt: ColumnSchema;
  constructor(dbSchema: DBSchema) {
    super(dbSchema, "user");
    this.createdAt = new ColumnSchema(this.dbSchema, this, "created_at");
    this.email = new ColumnSchema(this.dbSchema, this, "email");
    this.emailVerified = new ColumnSchema(this.dbSchema, this, "email_verified");
    this.id = new ColumnSchema(this.dbSchema, this, "id");
    this.image = new ColumnSchema(this.dbSchema, this, "image");
    this.name = new ColumnSchema(this.dbSchema, this, "name");
    this.updatedAt = new ColumnSchema(this.dbSchema, this, "updated_at");
  }
}

class Verification extends TableSchema {
  public createdAt: ColumnSchema;
  public expiresAt: ColumnSchema;
  public id: ColumnSchema;
  public identifier: ColumnSchema;
  public updatedAt: ColumnSchema;
  public value: ColumnSchema;
  constructor(dbSchema: DBSchema) {
    super(dbSchema, "verification");
    this.createdAt = new ColumnSchema(this.dbSchema, this, "created_at");
    this.expiresAt = new ColumnSchema(this.dbSchema, this, "expires_at");
    this.id = new ColumnSchema(this.dbSchema, this, "id");
    this.identifier = new ColumnSchema(this.dbSchema, this, "identifier");
    this.updatedAt = new ColumnSchema(this.dbSchema, this, "updated_at");
    this.value = new ColumnSchema(this.dbSchema, this, "value");
  }
}

export const gntreesUi = new GntreesUi("gntrees_ui");
export const account = gntreesUi.account;
export const drizzleDrizzleMigrations = gntreesUi.drizzleDrizzleMigrations;
export const projects = gntreesUi.projects;
export const projectsDetail = gntreesUi.projectsDetail;
export const session = gntreesUi.session;
export const todo = gntreesUi.todo;
export const user = gntreesUi.user;
export const verification = gntreesUi.verification;
