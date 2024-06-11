import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import { Module } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Course } from '../course/entities/course.entity';
import { Subject } from '../subject/entities/subject.entity';
import { Class } from '../class/entities/class.entity';
import { Council } from '../council/entities/council.entity';
import { Student } from '../student/entities/student.entity';
import { userRoles } from '../user/protocols/user.protocols';
import { TeacherNote } from '../council/entities/teacherNote.entity';
import { Teacher } from '../teacher/entities/teacher';

const authenticate = async (email: string, password: string) => {
  // const user = await User.findOne({
  //   where: {
  //     email,
  //   },
  // });

  // if (!user) {
  //   return null;
  // }

  // const senhaCorreta = bcrypt.compareSync(password, user.password);

  // if (senhaCorreta && user.role === userRoles.MANAGER) {
  //   return Promise.resolve(user);
  // }

  // return null;

  if (email == 'tiago@castro.com' && password === '123456789') {
    return Promise.resolve({
      title: 'Administrador',
      email: email,
    });
  }
  return Promise.resolve(null);
};

@Module({
  imports: [
    import('@adminjs/nestjs').then(async ({ AdminModule }) => {
      return await import('adminjs').then(
        async ({ AdminJS, ComponentLoader }) => {
          return import('@adminjs/import-export').then(
            async (importExportFeature) => {
              const AdminJSTypeORM = await import('@adminjs/typeorm');
              const redisClient = new Redis({
                host: 'localhost',
                port: 6379,
              });
              AdminJS.registerAdapter({
                Database: AdminJSTypeORM.Database,
                Resource: AdminJSTypeORM.Resource,
              });

              const componentLoader = new ComponentLoader();
              return AdminModule.createAdminAsync({
                useFactory: async () => {
                  return {
                    adminJsOptions: {
                      rootPath: '/admin',
                      resources: [
                        {
                          resource: User,
                          options: {
                            navigation: {
                              name: null,
                              icon: 'User',
                            },
                            actions: {
                              new: {
                                before: async (request: {
                                  payload: { password: string | Buffer };
                                }) => {
                                  request.payload.password = await bcrypt.hash(
                                    request.payload.password,
                                    10,
                                  );
                                  return request;
                                },
                              },
                              edit: {
                                before: async (request: {
                                  payload: { password: string | Buffer };
                                }) => {
                                  console.log(
                                    'aaaaaa',
                                    request.payload.password,
                                  );
                                  if (request.payload.password) {
                                    request.payload.password =
                                      await bcrypt.hash(
                                        request.payload.password,
                                        10,
                                      );
                                  }

                                  return request;
                                },
                              },
                            },
                          },
                        },
                        {
                          resource: Course,
                          options: {
                            navigation: {
                              name: 'Escola',
                              icon: 'Book',
                            },
                          },
                        },
                        {
                          resource: Subject,
                          options: {
                            navigation: {
                              name: 'Escola',
                              icon: 'Book',
                            },
                          },
                        },
                        {
                          resource: Class,
                          options: {
                            navigation: {
                              name: 'Escola',
                              icon: 'Book',
                            },
                          },
                        },
                        {
                          resource: Council,
                        },
                        {
                          resource: Student,
                          features: [
                            importExportFeature.default({ componentLoader }),
                          ],
                          options: {
                            navigation: {
                              name: 'Escola',
                              icon: 'Book',
                            },
                          },
                        },
                        {
                          resource: Teacher,
                          options: {
                            navigation: {
                              name: 'Escola',
                              icon: 'Book',
                            },
                          },
                        },
                        {
                          resource: TeacherNote,
                        },
                      ],
                      componentLoader,
                      locale: {
                        language: 'pt-BR',
                        availableLanguages: ['pt-BR', 'en'],
                        translations: {
                          'pt-BR': {
                            labels: {
                              Course: 'Cursos',
                              Subject: 'Disciplinas',
                              Class: 'Turmas',
                              Council: 'Conselho',
                              Student: 'Estudantes',
                              Teacher: 'Professores',
                              User: 'Usuários',
                            },
                            properties: {
                              createdAt: 'Criado em',
                              updatedAt: 'Atualizado em',
                              name: 'Nome',
                              id: 'ID',
                              courseId: 'Curso',
                              subjectId: 'Disciplina',
                              teacherId: 'Professor',
                              classId: 'Turma',
                              registration: 'Registro',
                              contract: 'Contrato',
                              role: 'Cargo',
                            },
                          },
                        },
                      },
                      branding: {
                        companyName: 'Painel Administrativo',
                        logo: false,
                        softwareBrothers: false,
                        favicon: null,
                        withMadeWithLove: false,
                      },
                    },
                    auth: {
                      authenticate,
                      cookieName: 'adminjs',
                      cookiePassword: 'secret',
                    },
                    sessionOptions: {
                      store: new RedisStore({ client: redisClient }),
                      resave: false,
                      saveUninitialized: false,
                      secret: 'secret',
                      cookie: {
                        httpOnly: false,
                        maxAge: 5000 * 60 * 60, // 60 minutos // 1 hora
                      },
                    },
                  };
                },
              });
            },
          );
        },
      );
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DashboardModule {}
