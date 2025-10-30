import "dotenv/config";
import app from "./app";
import { config } from "./config/env";
import { pool } from "./database/pool";
import bcrypt from "bcrypt";
import { UserRepo } from "./modules/auth/user.repo";
import { ClientRepo } from "./modules/clients/client.repo";

async function ensureSchema() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`);
  await pool.query(`
  CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT,
    dob DATE,
    cell VARCHAR(20),
    company VARCHAR(255),
    price VARCHAR(255),
    comments TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_clients_name ON clients (first_name, last_name);
`);
}

async function ensureAdminAlways() {
  const adminEmail = "admin@realseo.test";
  const hash = await bcrypt.hash("123456", 10);
  const existing = await UserRepo.findByEmail(adminEmail);
  if (!existing) {
    await UserRepo.create({ name: "Admin", email: adminEmail, password: hash });
    console.log("Seeded default admin: admin@realseo.test / 123456");
  } else {
    //!fiexed force known password so demos never fail
    await UserRepo.updatePasswordByEmail(adminEmail, hash);
    console.log("Ensured default admin password reset to 123456");
  }
}

async function ensureClientsSeed() {
  const clients = await ClientRepo.count();
  if (clients === 0) {
    const rows = [
      [
        "Tommi",
        "Bennett",
        "tommi.bennett@example.com",
        "13th St, New York, NY",
        "1994-10-10",
        "+1 (802) 244-4567",
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
        "+1 (312) 555-1100",
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
        "+1 (502) 555-2234",
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
        "+1 (206) 555-7788",
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
        "+1 (213) 555-9090",
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
        "+1 (808) 555-6677",
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
        "+1 (720) 555-1200",
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
        "+1 (617) 555-6543",
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
        "+1 (408) 555-7654",
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
        "+1 (503) 555-4321",
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
        "+1 (973) 555-8833",
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
        "+1 (305) 555-2233",
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
        "+1 (602) 555-9012",
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
        "+1 (612) 555-8877",
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
        "+1 (802) 555-3009",
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
        "+1 (917) 555-6008",
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
        "+1 (737) 555-4811",
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
        "+1 (312) 555-9922",
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
        "+1 (619) 555-5566",
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
        "+1 (208) 555-1010",
        "Gem State",
        "Standard",
        "Great referral source",
      ],
    ].map((r) => ({
      first_name: r[0] as string,
      last_name: r[1] as string,
      email: r[2] as string,
      address: r[3] as string,
      dob: r[4] as string,
      cell: r[5] as string,
      company: r[6] as string,
      price: r[7] as string,
      comments: r[8] as string,
    }));
    await ClientRepo.bulkInsert(rows as any);
    console.log("Seeded 20 clients");
  }
}

async function start() {
  await ensureSchema();
  await ensureAdminAlways();
  await ensureClientsSeed();
   const { rows } = await pool.query("SELECT 1 + 1 AS n");
  console.log("DB check:", (rows as any)[0].n);
  app.listen(parseInt(config.PORT, 10), () => {
    console.log(`🚀 Server ready at http://localhost:${config.PORT}`);
    console.log(`Login with: admin@realseo.test / 123456`);
  });
}

start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
