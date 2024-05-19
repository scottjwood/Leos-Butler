-- Create the artists table if it doesn't exist
CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_details VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data if not already present
INSERT INTO artists (name, contact_details) VALUES 
('Michelangelo', 'michelangelo@example.com'),
('Auguste Rodin', 'rodin@example.com'),
('Donatello', 'donatello@example.com'),
('Gian Lorenzo Bernini', 'bernini@example.com')
ON CONFLICT DO NOTHING;  -- Prevent inserting duplicates
