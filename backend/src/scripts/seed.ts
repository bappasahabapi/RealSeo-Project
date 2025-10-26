import "dotenv/config";
import bcrypt from "bcrypt";
import { pool } from "../database/pool.js";

export default async function run() {


  //todo:  implement this seed data part using chat gpt
  // tables
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    cell VARCHAR(32) NULL,
    company VARCHAR(255) NULL,
    price VARCHAR(50) NULL,
    comments VARCHAR(1000) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

  // admin upsert
  const email = "admin@realseo.test";
  const hash = await bcrypt.hash("123456", 10);
  const [u]: any = await pool.query("SELECT id FROM users WHERE email=?", [
    email,
  ]);
  if (u.length) {
    await pool.query("UPDATE users SET password=? WHERE email=?", [
      hash,
      email,
    ]);
    console.log("✔ Admin password reset");
  } else {
    await pool.query("INSERT INTO users (name,email,password) VALUES (?,?,?)", [
      "Admin",
      email,
      hash,
    ]);
    console.log("✔ Admin created");
  }

  // seed 20 clients (do nothing if table already has rows)
  const [c]: any = await pool.query("SELECT COUNT(*) AS n FROM clients");
  if (c[0].n === 0) {
    const data = [
      [
        "Tommi",
        "Bennett",
        "tommi.bennett@example.com",
        "13th St, New York, NY",
        "1994-10-10",
        "+1802244567",
        "Acme Inc.",
        "Pro",
        "Demo client row",
      ],
      [
        "Ava",
        "Williams",
        "ava.williams@example.com",
        "245 King Rd, Chicago, IL",
        "1992-03-14",
        "+13125551100",
        "BlueFin",
        "Standard",
        "Long-time customer",
      ],
      [
        "Liam",
        "Johnson",
        "liam.j@example.com",
        "78 W Market St, Louisville, KY",
        "1989-08-22",
        "+15025552234",
        "Northstar",
        "Basic",
        "Prefers calls in PM",
      ],
      [
        "Emma",
        "Brown",
        "emma.brown@example.com",
        "901 Pine Ave, Seattle, WA",
        "1995-01-30",
        "+12065557788",
        "Cloudish",
        "Pro",
        "Requested March review",
      ],
      [
        "Noah",
        "Jones",
        "noah.jones@example.com",
        "44 Sunset Blvd, Los Angeles, CA",
        "1991-06-11",
        "+12135559090",
        "Sunrise Co.",
        "Standard",
        "Interested in upsell",
      ],
      [
        "Olivia",
        "Garcia",
        "olivia.g@example.com",
        "66 Queen St, Honolulu, HI",
        "1993-09-05",
        "+18085556677",
        "Islanders",
        "Basic",
        "Email only",
      ],
      [
        "Elijah",
        "Miller",
        "elijah.m@example.com",
        "501 Maple Dr, Denver, CO",
        "1990-12-19",
        "+17205551200",
        "PeakWare",
        "Pro",
        "Quarterly billing",
      ],
      [
        "Sophia",
        "Davis",
        "sophia.d@example.com",
        "19 Main St, Boston, MA",
        "1996-02-07",
        "+16175556543",
        "Harbor Labs",
        "Standard",
        "Has open ticket",
      ],
      [
        "James",
        "Rodriguez",
        "james.r@example.com",
        "882 2nd St, San Jose, CA",
        "1988-05-27",
        "+14085557654",
        "SierraSoft",
        "Basic",
        "On legacy plan",
      ],
      [
        "Isabella",
        "Martinez",
        "isabella.m@example.com",
        "3 River Rd, Portland, OR",
        "1997-11-03",
        "+15035554321",
        "GreenLoop",
        "Pro",
        "Happy with current plan",
      ],
      [
        "Benjamin",
        "Hernandez",
        "ben.h@example.com",
        "702 Broad St, Newark, NJ",
        "1992-07-17",
        "+19735558833",
        "MetroWorks",
        "Standard",
        "Requested CSV export",
      ],
      [
        "Mia",
        "Lopez",
        "mia.lopez@example.com",
        "12 Ocean Ave, Miami, FL",
        "1994-04-02",
        "+13055552233",
        "SunBay",
        "Basic",
        "Prefers WhatsApp",
      ],
      [
        "Lucas",
        "Gonzalez",
        "lucas.g@example.com",
        "77 Grand Ave, Phoenix, AZ",
        "1991-09-21",
        "+16025559012",
        "Desert Tech",
        "Pro",
        "Signed NDA",
      ],
      [
        "Amelia",
        "Wilson",
        "amelia.w@example.com",
        "500 Lake Dr, Minneapolis, MN",
        "1993-01-12",
        "+16125558877",
        "TwinCity",
        "Standard",
        "Annual review in June",
      ],
      [
        "Henry",
        "Anderson",
        "henry.a@example.com",
        "29 Elm St, Burlington, VT",
        "1987-10-24",
        "+18025553009",
        "Maple Core",
        "Basic",
        "Low usage volume",
      ],
      [
        "Evelyn",
        "Thomas",
        "evelyn.t@example.com",
        "640 7th Ave, New York, NY",
        "1990-03-04",
        "+19175556008",
        "UrbanSeed",
        "Pro",
        "Priority support",
      ],
      [
        "Alexander",
        "Taylor",
        "alex.t@example.com",
        "21 Oak St, Austin, TX",
        "1989-12-28",
        "+17375554811",
        "Longhorns",
        "Standard",
        "Prefers net-30",
      ],
      [
        "Charlotte",
        "Moore",
        "charlotte.m@example.com",
        "900 Lake Shore Dr, Chicago, IL",
        "1996-06-09",
        "+13125559922",
        "Lakeview",
        "Basic",
        "Will upgrade Q4",
      ],
      [
        "Daniel",
        "Jackson",
        "daniel.j@example.com",
        "100 4th Ave, San Diego, CA",
        "1992-08-18",
        "+16195555566",
        "WaveTech",
        "Pro",
        "Considering add-ons",
      ],
      [
        "Harper",
        "Martin",
        "harper.m@example.com",
        "71 Hill Rd, Boise, ID",
        "1995-05-15",
        "+12085551010",
        "Gem State",
        "Standard",
        "Great referral source",
      ],
    ];
    await pool.query(
      "INSERT INTO clients (first_name,last_name,email,address,dob,cell,company,price,comments) VALUES ?",
      [data]
    );
    console.log("✔ Inserted 20 clients");
  } else {
    console.log(`ℹ Clients already present: ${c[0].n}`);
  }

  await pool.end();
}
