import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { upperDirectiveTransformer } from './directive/upper-case.directive';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DateTimeScalar } from './dateTime.scalar';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      resolvers: { JSON: GraphQLJSON },
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [DateTimeScalar],
})
export class GraphqlModule {}
