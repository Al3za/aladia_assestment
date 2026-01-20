import { ConfigModule } from '@nestjs/config';

export const AppConfigModule = ConfigModule.forRoot({
  isGlobal: true,
});

// disponibile ovunque;
// NON serve importare ConfigModule ogni volta

//   ConfigModule, // ConfigModule does:
// 1) load .env variables during the bootstrap(significato di bootstrap sotto),
// NOTE: It does NOT make process.env safe at import-time,
// only at runtime through ConfigService, thets why we define it below in registerAsync and useFactory
// 2) populate process.env.
// 3) Allows ConfigService function. Il caricamento avviene una sola volta, all’avvio dell’app Nest(nest stert Auth/gateway).

//it works along with JwtConfigModule in core.module imports [AppConfigModule, JwtConfigModule])
// JwtConfigModule connot work without this file because of what listed above

// -------- //

// a che serve ConfigModule?
// "✅ ConfigModule serve a rendere disponibile ConfigService durante il bootstrap"

// significato bootstrap:
// TUTTA la fase di avvio dell’app, da quando Node esegue main.ts
// fino a quando l’app è pronta a ricevere richieste

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
