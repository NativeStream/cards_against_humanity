const env = process.env.NODE_ENV || "development";
const appName = process.env.APP_NAME || "app";

const defaultServer = {
  port: process.env.PORT || 3000,
  hostname: process.env.HOSTNAME || "localhost",
  jwt_secret: process.env.JWT_SECRET || "my_secret",
  jwt_timeout_duration: process.env.JWT_TIMEOUT_DURATION || "30 days"
};

const defaultRedis = {
  port: 6379,
  host: "redis"
};

const config = {
  development: {
    server: {
      ...defaultServer
    },
    database: {
      url: `mongodb://mongo/${appName}-development`
    },
    redis: {
      ...defaultRedis
    }
  },

  test: {
    server: {
      port: process.env.PORT || 3100,
      ...defaultServer
    },
    database: {
      url: `mongodb://mongo/${appName}-test`
    },
    redis: {
      ...defaultRedis
    }
  },

  production: {
    server: {
      port: process.env.PORT || 3200,
      ...defaultServer
    },
    database: {
      url: `mongodb://mongo/${appName}-production`
    },
    redis: {
      ...defaultRedis
    }
  }
};

config[env].isDev = env === "development";
config[env].isTest = env === "test";
config[env].isProd = env === "production";

module.exports = config[env];
