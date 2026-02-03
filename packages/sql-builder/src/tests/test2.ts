import { format, quoteIdent } from 'node-pg-format';
// buat koneksi dengan library database pg
import { Client } from 'pg';

// konfigurasi koneksi url database dari environment variable
const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mydatabase';

const client = new Client({
    connectionString,
});

// test koneksi dan jalankan query sederhana
const testConnection = async () => {
    try {
        await client.connect();
        console.log('Connected to the database successfully.');

        

        const res = await client.query('SELECT NOW()');
        console.log('Current Time from DB:', res.rows[0]);

        // list all tables in public schema
        // const tablesRes = await client.query(`
        //     SELECT table_name 
        //     FROM information_schema.tables 
        //     WHERE $1 = $2
        // `,['table_schema','public']);
        const tablesRes = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE $1 = table_schema
        `,['public']);
        console.log('Tables in public schema:', tablesRes.rows.map(row => row.table_name));

        // select user dengan id 2
        // dengan tagged template literal
        // const rawQuery = r`SELECT * FROM projects WHERE projects.id = ${'11b58da1-f1cb-47e4-9c8c-166641e5b1af'} LIMIT ${10}`;
        // console.log('Raw Query:', rawQuery);

        // const userRes = await client.query(rawQuery);
        // console.log('User with ID 2:', userRes.rows);


        // const myArray = [1, 2, 3];
        // const myObject = { a: 1, b: 2 };
        // const myNestedArray = [['a', 1], ['b', 2]];

        // let sql = format('SELECT * FROM t WHERE c1 IN (%L) AND c2 = %L', myArray, myObject);
        // console.log(sql); // SELECT * FROM t WHERE c1 IN (1,2,3) AND c2 = '{"a":1,"b":2}'

        // sql = format('INSERT INTO t (name, age) VALUES %L', myNestedArray);
        // console.log(sql); // INSERT INTO t (name, age) VALUES ('a', 1), ('b', 2)

    } catch (err) {
        // console.error('Database connection error:', err);
        console.error(err);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

testConnection();
// console.log(format('%L', "select * FROM users WHERE name = Reilly")); // 'select * FROM users WHERE name = ''O\'Reilly'''

// /**
//  * Mengembalikan true jika identifier adalah string sederhana (alphanumeric/underscore),
//  * dan false jika identifier mengandung karakter khusus yang memaksa pg-format 
//  * menambahkan tanda kutip ganda (").
//  */
// function isSimpleIdentifier(input:string): boolean {
//     try {
//         const formatted = format("%I",input);
//         console.log(`Formatted identifier for "${input}": ${formatted}`);
        
//         // Jika hasil format tidak mengandung tanda kutip ganda, berarti identifier sederhana
//         return !formatted.includes('"');
//     } catch (e) {
//         // Mengembalikan false jika input bukan string atau tidak valid
//         return false;
//     }
// }

// // Pengujian:
// console.log(isSimpleIdentifier('username'));      // true
// console.log(isSimpleIdentifier('user_id'));       // true
// console.log(isSimpleIdentifier('user table'));    // false (karena spasi)
// console.log(isSimpleIdentifier('Table'));         // false (karena case-sensitive/reserved)