CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE shopping_list_items (
  id SERIAL PRIMARY KEY,
  shopping_list_id INTEGER REFERENCES shopping_lists(id),
  name TEXT NOT NULL,
  collected BOOLEAN DEFAULT FALSE
);

-- INSERT INTO shopping_lists (name) VALUES ('Eka Lista');

-- INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ( 1 , 'makkara');
-- INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES ( 1 , 'keppana', TRUE);
