import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  node_env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt_secret: process.env.JWT_SECRET,
}));
