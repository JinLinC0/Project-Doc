## `JWT`认证

我们一般使用`JWT`对身份进行认证，核心是基于`token`，用户向客户端发送`token`，客户端携带这个`token`来进行身份验证

### 守卫定义

守卫是根据选择的策略对身份进行验证，保护路由访问，一般使用系统提供的`AuthGuard`守卫，我们也可以自定义守卫，根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理，这通常称为授权。

### `jwt`融入注册和登录

- 创建一个`user`数据表，来存放用户的信息，用户表结构信息如下：

  ```ts
  model User {
    id        Int   @id @default(autoincrement()) @db.UnsignedInt
    name      String
    password  String
    email     String
  }
  ```

- 创建一个用户注册的模块：`nest g mo auth --no-spec`

  ```ts
  import { Module } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthController } from './auth.controller';
  import { JwtModule } from '@nestjs/jwt';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  
  @Module({
    imports: [
      // 注册jwt模块
      JwtModule.registerAsync({
        // 引入配置模块和服务
        imports: [ConfigModule],
        inject: [ConfigService],
        // 编写一个工厂函数，将服务实例引入，后续在工厂函数内部就可以使用configService来获取配置文件中的配置项
        useFactory: (config: ConfigService) => {
          return {
            secret: config.get('TOKEN_SECRET'), // 读取并设置token的密钥
            signOptions: { expiresIn: '100d' }  // 设置token过期时间:100天
          }
        }
      })
    ],
    providers: [AuthService],
    controllers: [AuthController]
  })
  export class AuthModule {}
  ```

- 创建一个服务：`nest g s auth --no-spec`，在服务中完成注册业务：

  ```ts
  import { Injectable } from '@nestjs/common';
  import RegisterDto from './dto/register.dto';
  import LoginDto from './dto/loginDto.dto';
  import { PrismaService } from './../prisma/prisma.service';
  import { hash, verify } from 'argon2';
  import { JwtService } from '@nestjs/jwt';
  import { User } from '@prisma/client';
  
  @Injectable()
  export class AuthService {
      // 依赖注入，拿取prisma服务
      constructor(
          private readonly prisma: PrismaService,
          private jwt: JwtService
      ) {}
      // 注册用户服务
      async register(dto: RegisterDto) {
          const user = await this.prisma.user.create({
              data: {
                  name: dto.name,
                  password: await hash(dto.password),  // 密码加密
                  email: dto.email
              }
          })
          // 将用户的资料传递给token
          return this.token(user)
      }
  
      // 生成token   User为prisma中定义的User类型
      async token({ name, id }: User) {
          // 使用jwt服务生成签名
          return {
              token: await this.jwt.signAsync({ 
                  // 将要存储的内容放入
                  name,
                  sub: id   // 后续就可以根据这个token值得到这个id，通过这个id查找到用户
              })
          }
      }
      
      // 登录用户服务
      async login(dto: LoginDto) {
          // 去数据库中查找用户的name是否存在
          const user = await this.prisma.user.findFirst({
              where: {
                  name: dto.name,
              }
          })
          // 密码验证
          // 对加密的密码进行解密   verify(加密的密码，提交过来的密码)
          if (!user) {
              throw new BadRequestException('用户名不存在');
          }
          if (!(await verify(user.password, dto.password))) {
              throw new BadRequestException('密码输入错误');
          }
          return this.token(user);
      }
  }
  ```

  > - `findUnique`是查找数据库中的字段是唯一索引的
  > - `findFirst`是查找数据库中的字段不是唯一索引的

- 创建一个控制器：`nest g co auth --no-spec`

  ```ts
  import { Body, Controller, Post } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import RegisterDto from './dto/register.dto';
  import LoginDto from './dto/loginDto.dto';
  
  @Controller('auth')
  export class AuthController {
      // 将服务的依赖注入
      constructor(private readonly auth: AuthService) {}
  
      // 注册路由
      @Post('register')
      // 接收注册提交的表单数据
      register(@Body() dto: RegisterDto) {
          return this.auth.register(dto);
      }
      
      // 登录路由
      @Post('login')
      // 接收登录提交的表单数据
      login(@Body() dto: LoginDto) {
          return this.auth.login(dto);
      }
  }
  ```

- 在`auth`文件夹中创建一个`dto`文件夹，新建一个注册的`register.dto.ts`文件，为后续提供类型提示：

  ```ts
  import { IsNotEmpty } from 'class-validator';
  
  export default class RegisterDto {
      @IsNotEmpty({ message: '用户名不能为空' })
      name: string;
      @IsNotEmpty({ message: '密码不能为空' })
      password: string;
      @IsNotEmpty({ message: '确认密码不能为空' })
      password_confirmed: string;
      @IsNotEmpty({ message: '邮箱不能为空' })
      email: string;
  }
  ```

  创建一个登录的`login.dto.ts`文件：

  ```ts
  import { IsNotEmpty } from 'class-validator';
  
  export default class LoginDto {
      @IsNotEmpty({ message: '用户名不能为空' })
      name: string;
      @IsNotEmpty({ message: '密码不能为空' })
      password: string;
  }
  ```

- 创建`prisma`模块，用来提供与数据库进行交互：`nest g mo prisma --no-spec`

  ```ts
  import { Global, Module } from '@nestjs/common';
  import { PrismaService } from './prisma.service';
  
  // 将模块变成全局，并且将服务暴露出去
  @Global()
  @Module({
    providers: [PrismaService],
    exports: [PrismaService],
  })
  export class PrismaModule {}
  ```

- 为`prisma`模块创建服务：`nest g s prisma --no-spec`

  ```ts
  import { Injectable } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';
  
  @Injectable()
  export class PrismaService extends PrismaClient {
      constructor() {
          // 在开发环境中，后端命令行中会打印出我们的数据库相关的操作日志
          super(process.env.NODE_ENV === 'development' ? { log: ['query'] } : {})
      }
  }
  ```

  ![image-20250302202931445](..\assets\image-20250302202931445.png)

- 在`.env`配置文件中配置数据库连接和`Token`密钥：

  ```python
  # 当前的环境
  NODE_ENV="development"
  # 数据库连接
  DATABASE_URL="mysql://root:552259@localhost:3306/nest-blog"
  # Token密钥，保护我们的网站密钥，使密钥是唯一的
  TOKEN_SECRET="JinLinC"
  ```

- 在根模块中进行配置项加载服务的配置：

  ```ts
  import { Module } from '@nestjs/common';
  import { ConfigModule } from '@nestjs/config';
  import { PrismaModule } from './prisma/prisma.module';
  import { AuthModule } from './jwd/jwd.module';
  
  @Module({
    imports: [ConfigModule.forRoot( { isGlobal: true } ), PrismaModule, AuthModule],
    controllers: [AppController],
    providers: [],
  })
  export class AppModule {}
  ```


用户发送注册信息后，就会得到对应的`token`，我们可以将这个`token`在后置操作中进行变量的提前，将`token`的内容提取到环境变量中：

![image-20250302204333949](..\assets\image-20250302204333949.png)

我们可以在环境变量中看到这个`token`值：

![image-20250302204409986](..\assets\image-20250302204409986.png)

我们可以在接口软件中进行配置，希望后续在请求的时候都可以携带这个`token`，进行以下的配置即可：

![image-20250308110938147](..\assets\image-20250308110938147.png)

> 选择的`Token`是环境变量中的这个`token`

用户在登录的时候，如果输入的用户名在数据库中存在，并且密码正确，发送数据后，就会得到对应的`token`：

![image-20250308130430856](..\assets\image-20250308130430856.png)

***

### `Token`验证用户身份

用户登录时获取的`token`，其目的是用于通过`token`来进行身份验证，在用户模块的控制器中配置验证路由：

```ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/loginDto.dto';

@Controller('auth')
export class AuthController {
    // 将服务的依赖注入
    constructor(private readonly auth: AuthService) {}

    // 注册路由
    @Post('register')
    // 接收注册提交的表单数据
    register(@Body() dto: RegisterDto) {
        return this.auth.register(dto);
    }
    
    // 登录路由
    @Post('login')
    // 接收登录提交的表单数据
    login(@Body() dto: LoginDto) {
        return this.auth.login(dto);
    }
    
    // 获取所有用户
    @Get('all')
    all() {
        return this.jwd.findAll();
    }
}
```

在用户模块服务`auth.service.ts`中，增加获取所有用户的方法：

```ts
import { Injectable } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/loginDto.dto';
import { PrismaService } from './../prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    // 依赖注入，拿取prisma服务
    constructor(
        private readonly prisma: PrismaService,
        private jwt: JwtService
    ) {}
    // 注册用户服务
    async register(dto: RegisterDto) {
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                password: await hash(dto.password),  // 密码加密
                email: dto.email
            }
        })
        // 将用户的资料传递给token
        return this.token(user)
    }

    // 生成token   User为prisma中定义的User类型
    async token({ name, id }: User) {
        // 使用jwt服务生成签名
        return {
            token: await this.jwt.signAsync({ 
                // 将要存储的内容放入
                name,
                sub: id   // 后续就可以根据这个token值得到这个id，通过这个id查找到用户
            })
        }
    }
    
    // 登录用户服务
    async login(dto: LoginDto) {
        // 去数据库中查找用户的name是否存在
        const user = await this.prisma.user.findFirst({
            where: {
                name: dto.name,
            }
        })
        // 密码验证
        // 对加密的密码进行解密   verify(加密的密码，提交过来的密码)
        if (!user) {
            throw new BadRequestException('用户名不存在');
        }
        if (!(await verify(user.password, dto.password))) {
            throw new BadRequestException('密码输入错误');
        }
        return this.token(user);
    }
    
    // 查询所有用户
    async findAll() {
        return this.prisma.user.findMany();
    }
}
```

这样就可以获取所有用户的信息数据：

![image-20250308131418703](..\assets\image-20250308131418703.png)

上述的情况，如果接口中没有`token`了，还是可以获取到所有用户的数据，这个是不合理的，我们应该设置为只有携带`token`信息的登录用户才能获取自身用户的信息，首先要编写验证的策略，在`auth`文件夹中创建`jwt.strategy.ts`文件，进行策略的编写：

```ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from "passport-jwt";
import { PrismaService } from "./../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService, private prisma: PrismaService) {
        super({
            // 解析用户提交的Bearer Token header数据，如果token有效，会自动调用validate方法，如果token是无效的，会自动抛出异常，可以通过前端来跳转到具体的登录界面
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 告知加密使用的是哪个密钥，.env文件中的密钥配置
            secretOrKey: configService.get('TOKEN_SECRET'),
            ignoreExpiration: false,
        } as StrategyOptionsWithoutRequest); // 明确类型
    }

    // 验证通过后（token有效）结果用户资料
    async validate({ sub: id }) {
        // 查询user表，得到这个token对应的用户，放到全局的Request.user中
        return this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }
}
```

> `token`是在数据的头信息`Header`中会携带过来的数据

我们需要对上述的策略进行注册，在`auth.module.ts`中注册到提供者中：

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // 注册jwt模块
    AuthModule.registerAsync({
      // 引入配置模块和服务
      imports: [ConfigModule],
      inject: [ConfigService],
      // 编写一个工厂函数，将服务实例引入，后续在工厂函数内部就可以使用configService来获取配置文件中的配置项
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'), // 读取并设置token的密钥
          signOptions: { expiresIn: '100d' }  // 设置token过期时间:100天
        }
      }
    })
  ],
  providers: [AuthService, JwtStrategy],  // JwtStrategy策略进行注册 
  controllers: [AuthController]
})
export class AuthModule {}
```

在控制器中我们就可以使用这个全局对象`Request.user`，在`auth.comtroller.ts`中进行验证：

```ts
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/loginDto.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    // 将服务的依赖注入
    constructor(private readonly auth: AuthService) {}

    // 注册路由
    @Post('register')
    // 接收注册提交的表单数据
    register(@Body() dto: RegisterDto) {
        return this.auth.register(dto);
    }
    
    // 登录路由
    @Post('login')
    // 接收登录提交的表单数据
    login(@Body() dto: LoginDto) {
        return this.auth.login(dto);
    }
    
    // 获取所有用户
    @Get('all')
    // 使用方法装饰器
    @UseGuards(AuthGuard('jwt'))
    all(@Req() req: Request) {
        // 得到当前操作的用户req.user
        return req.user;
    }
}
```

这样当我们浏览器的本地存储携带了`token`，通过`auth/all`获取用户数据，就可以得到对应`token`的用户信息：

![image-20250308193214824](..\assets\image-20250308193214824.png)

> 在发送请求之前，我们需要对`Headers`进行上述的配置，配置传入头部信息的时候将`token`进行传入，这样才可以正常的通过对应的`token`去请求到具体的数据

如果清除接口中的`token`（将`localhost`中的本地存储的`token`删除，或者修改`token`的值，使这个`token`的值无效），重新发送数据，就会抛出异常：

![image-20250308190117970](..\assets\image-20250308190117970.png)

通过这个异常，可以通过前端来跳转登录界面，让用户重新进行登录，得到新的本地`token`

***

### 简化装饰器

装饰器就可以理解为是一个普通函数，只不过这个特殊的函数有的时候改变了我们的方法执行逻辑

在`auth`文件夹中定义一个装饰器文件夹`decorator`，在其内部定义一个装饰器：`auth.decorator.ts`：

```ts
import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard('jwt')))
}
```

> 定义的是一个聚合装饰器，就是可以定义一个函数，函数里面可以进行装饰器的调用

将`all(@Req() req: Request)`部分也定义成一个装饰器，创建一个装饰器文件`user.decorator.ts`：

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 定义一个参数装饰器
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

单独定义完后，我们后续可以进行引入使用，在`auth.controller.ts`文件中：

```ts
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/loginDto.dto';
import { Request } from 'express';
import { Auth } from './decorator/jwd.decorator';
import { User as UserEntity } from '@prisma/client';  // 数据表类型，起了个别名

@Controller('auth')
export class AuthController {
    // 将服务的依赖注入
    constructor(private readonly auth: AuthService) {}

    // 注册路由
    @Post('register')
    // 接收注册提交的表单数据
    register(@Body() dto: RegisterDto) {
        return this.auth.register(dto);
    }
    
    // 登录路由
    @Post('login')
    // 接收登录提交的表单数据
    login(@Body() dto: LoginDto) {
        return this.auth.login(dto);
    }
    
        // 获取所有用户
    @Get('all')
    @Auth()
    // 调用User()装饰器
    all(@User() user: UserEntity) {
        // 得到当前操作的用户req.user
        return user
    }
}
```

