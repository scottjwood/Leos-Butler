CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_details TEXT
);

CREATE TABLE sculptures (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER REFERENCES artists(id),
  name VARCHAR(100),
  description TEXT,
  photos TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE molds (
  id SERIAL PRIMARY KEY,
  sculpture_id INTEGER REFERENCES sculptures(id),
  tracking_number VARCHAR(100) NOT NULL,
  piece_count INTEGER,
  photos TEXT[],
  storage_location VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE castings (
  id SERIAL PRIMARY KEY,
  mold_id INTEGER REFERENCES molds(id),
  casting_date TIMESTAMP,
  photos TEXT[],
  material_used VARCHAR(100),
  casting_time INTEGER,
  cost DECIMAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
