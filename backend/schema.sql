-- Create the artists table
CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_details VARCHAR(255),  -- Ensure this column exists if needed
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER REFERENCES artists(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    mold_tracking_number VARCHAR(255),
    casting_cost DECIMAL(10, 2),
    casting_time VARCHAR(50),
    material_usage VARCHAR(255),
    storage_location VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
