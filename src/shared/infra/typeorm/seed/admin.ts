import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import connect from "../index";

async function create() {
  const connection = await connect();

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
    VALUES(
      '${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXXX'
    )`
  );

  await connection.close();
}

create().then(() => console.log("User admin created"));
