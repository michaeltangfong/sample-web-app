const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
        host: '127.0.0.1',
        port: '5008',
        user: 'docker',
        password: 'secret',
        database: 'sample_db',
    },
    pool: { min: 0, max: 7 },
    acquireConnectionTimeout: 10000,
    migrations: {
        tableName: 'migrations'
    }
});

// Give the knex instance to objection.
Model.knex(knex);

// Person model.
class Person extends Model {
    static get tableName() {
        return 'persons';
    }

    static get relationMappings() {
        return {
            children: {
                relation: Model.HasManyRelation,
                modelClass: Person,
                join: {
                    from: 'persons.id',
                    to: 'persons.parentId'
                }
            }
        };
    }
}

async function createSchema() {
    if (await knex.schema.hasTable('persons')) {
        return;
    }

    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('persons', table => {
        table.increments('id').primary();
        table.integer('parentId').references('persons.id');
        table.string('firstName');
    });
}

async function main() {
    // Create some people.
    const sylvester = await Person.query().insertGraph({
        firstName: 'Sylvester',

        children: [
            {
                firstName: 'Sage'
            },
            {
                firstName: 'Sophia'
            }
        ]
    });

    console.log('created:', sylvester);

    // Fetch all people named Sylvester and sort them by id.
    // Load `children` relation eagerly.
    const sylvesters = await Person.query()
        .where('firstName', 'Sylvester')
        .withGraphFetched('children')
        .orderBy('id');

    console.log('sylvesters:', sylvesters);
}

createSchema()
    .then(() => main())
    .then(() => knex.destroy())
    .catch(err => {
        console.error(err);
        return knex.destroy();
    });