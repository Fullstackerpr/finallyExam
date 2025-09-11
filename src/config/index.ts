import { config } from 'dotenv';
config();

export default {
  PORT: Number(process.env.PORT),
  DB_URL: String(process.env.DB_URL),

  SUPERADMIN_US: String(process.env.SUPERADMIN_USERNAME),
  SUPERADMIN_P: String(process.env.SUPERADMIN_PASSWORD),
  SUPERADMIN_FN: String(process.env.SUPERADMIN_FULL_NAME),
  SUPERADMIN_PN: String(process.env.SUPERADMIN_PHONE_NUMBER),
  HOST_URL: String(process.env.HOST_URL),

  ACCESS_TOKEN_KEY: String(process.env.ACCESS_TOKEN_KEY),
  ACCESS_TOKEN_TIME: String(process.env.ACCESS_TOKEN_TIME),
  REFRESH_TOKEN_KEY: String(process.env.REFRESH_TOKEN_KEY),
  REFRESH_TOKEN_TIME: String(process.env.REFRESH_TOKEN_TIME),
};
